import { kontentImageLoader, srcIsKontentAsset } from "../utils";
import NextImage from "next/image";
import { useTheme } from "@mui/material";


const Image = (props) => {
  const { asset, width, height } = props;
  const loader = srcIsKontentAsset(asset.url)
    ? kontentImageLoader
    : undefined;
  const theme = useTheme();

  const componentWidth = width || asset.width || theme.breakpoints.values.md;
  const componentHeight = height || (componentWidth / asset.width) * asset.height;

  return <NextImage
    {...props}
    src={asset.url}
    width={componentWidth}
    height={componentHeight}
    loader={loader}
    layout="responsive"
  />;
};

export default Image;