import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const Skeleton = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      width={380}
      height={238}
      viewBox="0 0 380 238"
      style={{ width: "100%" }}
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="380" height="238" />
    </ContentLoader>
  );
};
