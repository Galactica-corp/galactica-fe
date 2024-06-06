import {
  DefaultError,
  QueryKey,
  UseQueryOptions as RqUseQueryOptions,
  UseSuspenseQueryOptions as RqUseSuspenseQueryOptions,
  UndefinedInitialDataOptions,
  UseMutationOptions,
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

export type QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryFn" | "queryKey"
>;

export type MutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;
