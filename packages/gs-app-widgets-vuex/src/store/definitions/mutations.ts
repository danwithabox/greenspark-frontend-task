import type { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types.js";
import type { State } from "./state.js";
import type { GSWidget_Data } from "@greenspark-task/lib-ui";

export type Mutations<S = State> = {
    [MutationTypes.SET_WIDGETS](state: S, payload: GSWidget_Data[]): void,
    [MutationTypes.SET_ONLY_ACTIVE_WIDGET](state: S, payload: { id: GSWidget_Data["id"], active: boolean, }): void,
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_WIDGETS](state, payload) {
        state.widgets = payload;
        const firstActiveWidget = payload.find(_ => _.active);
        if (firstActiveWidget) mutations[MutationTypes.SET_ONLY_ACTIVE_WIDGET](state, { id: firstActiveWidget.id, active: true, });
    },
    [MutationTypes.SET_ONLY_ACTIVE_WIDGET](state, payload) {
        const { id, active, } = payload;
        for (const widget of state.widgets) {
            if (widget.id === id) widget.active = active;
            else if (active) widget.active = false;
        }
    },
};
