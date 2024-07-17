import { FC } from "react";
import { useParams } from "react-router-dom";

const Details: FC = () => {
  const params = useParams<"id">();

  return <div>{params.id}</div>;
};

export default Details;
