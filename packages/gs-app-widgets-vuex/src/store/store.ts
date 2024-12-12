import { createStore, Store as VuexStore, type CommitOptions, type DispatchOptions } from "vuex";
import { type State, state } from "./definitions/state.js";
import { type Getters, getters } from "./definitions/getters.js";
import { type Mutations, mutations } from "./definitions/mutations.js";
import { type Actions, actions } from "./definitions/actions.js";

export const store = createStore({
    state,
    getters,
    mutations,
    actions,
    strict: import.meta.env.DEV,
});

export function useStore() {
    return store as Store;
}

export type Store = Omit<
    VuexStore<State>,
    "getters" | "commit" | "dispatch"
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>,
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>,
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    },
};
