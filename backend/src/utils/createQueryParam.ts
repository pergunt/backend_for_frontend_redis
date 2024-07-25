import qs from "node:querystring";
import { flatten, unflatten } from "flat";

const cleanup = (params: any) => {
  return Object.keys(params).reduce((acc, currentKey) => {
    const value = params[currentKey];
    const isEmptyValue =
      value === "" ||
      value == null ||
      (Array.isArray(value) && value.length === 0);

    return { ...acc, ...(isEmptyValue ? {} : { [currentKey]: value }) };
  }, {});
};

const createQueryParam = ({
  char,
  ...rest
}: { char: "&" | "?" } & Record<string, any>) => {
  const cleanParams = unflatten(cleanup(flatten(rest))) as Record<
    string,
    string
  >;

  if (Object.keys(cleanParams).length) {
    const query = qs.encode(rest);

    return `${char}${query}`;
  }

  return "";
};

export default createQueryParam;
