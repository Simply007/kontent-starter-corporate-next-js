import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import packageInfo from "../../package.json";
import get from "lodash.get";

const sourceTrackingHeaderName = "X-KC-SOURCE";

const client = createDeliveryClient({
  environmentId: process.env.KONTENT_PROJECT_ID,
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${packageInfo.name};${packageInfo.version}`,
    },
  ],
});

async function loadWebsiteConfig(preview = false) {
  const config = await client.item("homepage")
    .depthParameter(6)
    // This overfetching by ignoring `subpages` element
    // https://docs.kontent.ai/reference/delivery-api#tag/Projection
    .elementsParameter([
      "title", "base_font", "favicon", "palette", "label", "header_logo",
      "main_menu", "actions", "label", "slug", "content", "icon", "icon_position", "role",
      "options", "footer_sections", "image", "content", "fields", "name",
      "type", "value", "navigation_item", "url",
      "submit_label", "form_id", "form_action", "default_value", "configuration",
      "palette", "font", "copyright"
    ])
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(result => result.data);

  return config;
}

async function getSubPaths(data, pagesCodenames, parentSlug, preview = false) {
  const paths = [];

  for (const pageCodename of pagesCodenames) {
    const currentItem = data.linkedItems[pageCodename];
    const pageSlug = parentSlug.concat(currentItem.elements.slug.value);
    const currentItemContentWrapper = data.linkedItems[currentItem.elements.content.value[0]];

    paths.push({
      params: {
        slug: pageSlug,
        navigationItem: currentItem.system, // will be ignored by next in getContentPaths
        contentItem: currentItemContentWrapper.system // will be ignored by next in getContentPaths
      }
    });

    // Listing pages
    if (currentItemContentWrapper && currentItemContentWrapper.system.type === "listing_page") {
      const subItemsData = await client.items()
        .type(currentItemContentWrapper.elements.content_type.value)
        .elementsParameter(["slug"])
        .queryConfig({
          usePreviewMode: preview
        })
        .toPromise()
        .then(result => result.data);

      subItemsData.items.forEach(subItem => {
        const subItemSlug = pageSlug.concat(subItem.elements.slug.value);
        paths.push({
          params: {
            slug: subItemSlug,
            navigationItem: subItem.system, // will be ignored by next in getContentPaths
            // Listing items contains navigation and content item in one content model
            contentItem: subItem.system // will be ignored by next in getContentPaths
          }
        });
      });
    }

    const subPaths = await getSubPaths(data, currentItem.elements.subpages.value, pageSlug, preview);
    paths.push(...subPaths);
  }

  return paths;
}

export async function getSitemapMappings(preview = false) {
  const data = await client.item("homepage")
    .depthParameter(3) // depends on the sitemap level (+1 for content type to download)
    .elementsParameter(["subpages", "slug", "content", "content_type"])
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(result => result.data);

  const rootSlug = [];
  const pathsFromKontent = [
    {
      params: {
        slug: rootSlug,
        navigationItem: data.item.system, // will be ignored by next in getContentPaths
        contentItem: data.linkedItems[data.item.elements.content.value[0]].system // will be ignored by next in getContentPaths
      }
    }
  ];

  const subPaths = await getSubPaths(data, data.item.elements.subpages.value, rootSlug, preview);

  return pathsFromKontent.concat(...subPaths);
}


export async function getPageStaticPropsForPath(params, preview = false) {
  const config = await loadWebsiteConfig(preview); // TODO could be cached
  const mappings = await getSitemapMappings(preview); // TODO could be cached

  const slugValue = params && params.slug ? params.slug : [];

  const pathMapping = mappings.find(path => path.params.slug.join("#") === slugValue.join("#")); // condition works for array of basic values

  const navigationItemSystemInfo = pathMapping && pathMapping.params.navigationItem;
  const contentItemSystemInfo = pathMapping && pathMapping.params.contentItem;

  if (!navigationItemSystemInfo || !contentItemSystemInfo) {
    return undefined;
  }

  // TODO could be loaded right in getSitemapMappings
  const seoData = await client.item(navigationItemSystemInfo.codename)
    .elementsParameter(["seo__title", "label", "seo__description", "seo__keywords", "seo__canonical_url", "seo__options"])
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(response => response.data)
    .then(response => ({
      title: get(response, "item.elements.seo__title.value", null) || get(response, "item.elements.label.value", null),
      description: get(response, "item.elements.seo__description.value", null),
      keywords: get(response, "item.elements.seo__keywords.value", null),
      canonicalUrl: get(response, "item.elements.seo__canonical_url.value", null),
      noIndex: get(response, "item.elements.seo__options.value", []).some(item => item.codename == "no_index"),
    }));

  // Loading content data
  const pageResponse = await client.item(contentItemSystemInfo.codename)
    .depthParameter(5)
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(response => response.data);

  const result = {
    seo: seoData,
    mappings: mappings,
    data: {
      config: config,
      page: pageResponse,
    },
  };

  const isListingPage = pageResponse.item.system.type === "listing_page";
  const isLandingPage = pageResponse.item.system.type === "landing_page";

  if (isListingPage) {
    result.data.listingItems = {};

    const linkedItemsResponse = await client.items()
      .type(pageResponse.item.elements.content_type.value)
      .queryConfig({
        usePreviewMode: preview
      })
      .toPromise()
      .then(response => response.data);

    result.data.listingItems[pageResponse.item.system.codename] = linkedItemsResponse;
  }
  else if (isLandingPage) {
    const listingSections = pageResponse.item.elements.sections.value
      .map(sectionCodename => pageResponse.linkedItems[sectionCodename])
      .filter(section => section.system.type === "listing_section");

    if (listingSections.length > 0) {
      result.data.listingSections = {};
    }

    for (const listingSection of listingSections) {
      const linkedItemsResponse = await client.items()
        .type(listingSection.elements.content_type.value)
        .orderByDescending(listingSection.elements.order_by.value)
        .limitParameter(listingSection.elements.number_of_items.value)
        .queryConfig({
          usePreviewMode: preview
        })
        .toPromise()
        .then(response => response.data);

      result.data.listingSections[listingSection.system.codename] = linkedItemsResponse;
    }
  }

  return result;
}