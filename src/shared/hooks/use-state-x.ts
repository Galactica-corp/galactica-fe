import { useReducer } from "react";

import shallowEqual from "shallowequal";

const reducer = <State>(state: State, partialState: Partial<State>) => {
  const newState = { ...state, ...partialState };
  if (shallowEqual(state, newState)) return state;

  return newState;
};

/**
 * Syntactic sugar for useReducer
 *
 * It make sense to use when you have a huge state ( > 4-5 fields)
 *
 * @example
 *
 *    type State = { field1: string; field2: string };
 *
 *    const Component = () => {
 *      const [{ field1, field2 }, setState] = useStateX<State>({ field1: "f1", field2: "f2" });
 *
 *      return <Button onClick={() => setState({ field1: 'val' })}>...</Button>
 *    }
 *
 */
export const useStateX = <State>(initialState: State) => {
  return useReducer<typeof reducer<State>>(reducer, initialState);
};
