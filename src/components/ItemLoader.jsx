import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={868}
    height={80}
    viewBox="0 0 868 80"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="15" y="19" rx="0" ry="0" width="25" height="25" />
    <rect x="49" y="28" rx="3" ry="3" width="123" height="8" />
    <rect x="180" y="23" rx="3" ry="3" width="2" height="18" />
    <rect x="189" y="28" rx="3" ry="3" width="123" height="8" />

    <rect x="15" y="55" rx="3" ry="3" width="77" height="3" />

    <rect x="705" y="5" rx="3" ry="3" width="68" height="52" />
    <rect x="783" y="5" rx="3" ry="3" width="68" height="52" />
    <rect x="15" y="68" rx="3" ry="3" width="853" height="1" />
  </ContentLoader>
);

const BoardMessagesLoader = () => {
  return (
    <React.Fragment>
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </React.Fragment>
  );
};

export { MyLoader, BoardMessagesLoader };
