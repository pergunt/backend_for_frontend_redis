export type UpdateQueryParams = (
  newParams: Record<string, any>,
  props?: {
    replace?: boolean;
    qsProps?: {
      arrayFormat?: "index" | "comma"; // you can have more options
    };
  }
) => void;

export type UseQueryParams = () => [Record<string, string>, UpdateQueryParams];
