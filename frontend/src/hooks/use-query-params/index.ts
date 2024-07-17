import * as React from "react";
import { flatten, unflatten } from "flat";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import * as Types from "./types";
import { UpdateQueryParams } from "./types";

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

const useQueryParams: Types.UseQueryParams = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = React.useMemo(() => {
    const currentQuery = search.startsWith("?") ? search.slice(1) : search;
    const parsed: any = qs.parse(currentQuery);

    if (parsed?.pagination?.page != null) {
      parsed.pagination.page = +parsed.pagination.page;
    }

    return parsed;
  }, [search]);

  const setParams = React.useCallback<UpdateQueryParams>(
    (newParams, props) => {
      const cleanParams = unflatten(cleanup(flatten(newParams))) as Record<
        string,
        string
      >;

      const newQuery = qs.stringify(cleanParams, props?.qsProps);
      const url = `${window.location.pathname}${
        newQuery ? `?${newQuery}` : ""
      }`;

      navigate(url, { replace: !!props?.replace });
    },
    [navigate]
  );

  return [params, setParams];
};

export default useQueryParams;
