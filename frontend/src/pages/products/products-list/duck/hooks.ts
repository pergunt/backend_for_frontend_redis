import { useState } from "react";
import { Product } from "types";
import { ProductsAPI } from "apis";
import { useAPI } from "hooks";

export const useProducts = (api: Omit<ProductsAPI, "getOne">) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { loading: searching, fetchData: searchProducts } = useAPI<
    Product[],
    string
  >({
    onSuccess: setProducts,
    request: async (value) => {
      const { data } = await api.search(value);

      return data;
    },
  });
  const { loading: byCategoryLoading, fetchData: fetchByCategory } = useAPI<
    Product[],
    string
  >({
    onSuccess: setProducts,
    request: async (category) => {
      const { data } = await api.getByCategory(category);

      return data;
    },
  });

  const {
    loading: listLoading,
    data: listData,
    fetchData: fetchList,
  } = useAPI<
    {
      products: Product[];
      total: number;
    },
    number | void
  >({
    onSuccess: (result) => {
      setProducts(result.products);
    },
    request: async (limit) => {
      const { data } = await api.getList(limit);

      return data;
    },
  });

  return {
    loading: searching || byCategoryLoading || listLoading,
    hasMore: listData ? products.length < listData.total : false,
    products,
    searchProducts,
    fetchList,
    fetchByCategory,
  };
};
