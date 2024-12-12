import type { GetterTree } from "vuex";
import type { State } from "./state.js";

export type Getters = {
    exampleGetter_widgetsCount(state: State): number,
};

export const getters: GetterTree<State, State> & Getters = {
    exampleGetter_widgetsCount: (state) => {
        return state.widgets.length;
    },
};
