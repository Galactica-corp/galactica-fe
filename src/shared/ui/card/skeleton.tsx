import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const Skeleton = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      height={238}
      style={{ width: "100%" }}
      viewBox="0 0 380 238"
      width={380}
      {...props}
    >
      <rect height="238" rx="10" ry="10" width="380" x="0" y="0" />
    </ContentLoader>
  );
};
