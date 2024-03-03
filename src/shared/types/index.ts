import {
  DefaultError,
  QueryKey,
  UseQueryOptions as RQUseQueryOptions,
} from "@tanstack/react-query";

export type ClassName = {
  className?: string;
};

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  RQUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;
