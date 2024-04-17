import {
  DefaultError,
  QueryKey,
  UseQueryOptions as RqUseQueryOptions,
  UseSuspenseQueryOptions as RqUseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type ClassName = {
  className?: string;
};

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  RqUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryFn" | "queryKey"
>;

export type UseSuspenseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  RqUseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryFn" | "queryKey"
>;
