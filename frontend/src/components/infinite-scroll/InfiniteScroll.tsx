import { FC } from "react";
import PreLoader from "../pre-loader";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";

interface InfiniteScrollProps extends Omit<Props, "loader" | "style"> {
  loading: boolean;
}

const style = { overflow: "hidden" };

const InfiniteScrollComponent: FC<InfiniteScrollProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <InfiniteScroll style={style} loader={loading && <PreLoader />} {...props}>
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
