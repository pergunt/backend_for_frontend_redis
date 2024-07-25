import { useState, useCallback } from "react";

interface UseAPIProps<Data, Arg> {
  request: (arg: Arg) => Promise<Data>;
  onSuccess?: (data: Data) => void;
}

const useAPI = <Data, Arg = void>({
  request,
  onSuccess,
}: UseAPIProps<Data, Arg>) => {
  const [state, setState] = useState<{
    loading: boolean;
    data: Data | null;
  }>({
    loading: false,
    data: null,
  });

  const fetchData = useCallback(async (arg: Arg) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const data = await request(arg);

      onSuccess?.(data);

      setState({
        loading: false,
        data,
      });
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
    // eslint-disable-next-line
  }, []);

  return {
    ...state,
    fetchData,
  };
};

export default useAPI;
