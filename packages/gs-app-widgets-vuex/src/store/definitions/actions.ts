import type { ActionTree, ActionContext } from "vuex";
import type { State } from "./state.js";
import type { Mutations } from "./mutations.js";
import { ActionTypes } from "./action-types.js";
import { MutationTypes } from "./mutation-types.js";
import type { GSWidget_Data } from "@greenspark-task/lib-ui";
import { _map__GS_DTO_Widget__GS_Client_Widget, GS_DTO_Widget } from "../shared.js";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>,
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
    [ActionTypes.FETCH_DATA](
        { commit, }: AugmentedActionContext,
    ): Promise<GSWidget_Data[]>,
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.FETCH_DATA]({ commit, }) {
        async function api_action_fetchData(): Promise<GSWidget_Data[]> {
            /** NOTE(FOR REVIEWERS): I assume this is just a placeholder for a well-integrated REST API, so I'm not going to parameterize it. */
            const url = `https://b795b019-1f84-41f4-93a3-a702d686c75a.mock.pstmn.io/product-widgets`;

            const data = await (await fetch(url, { method: "GET", })).json();

            const expectedSchema = Type.Array(GS_DTO_Widget);
            if (!Value.Check(expectedSchema, data)) {
                const errors = [...Value.Errors(expectedSchema, data)];
                for (const error of errors) console.error(error);
                throw new Error(`[store] Malformed data received from server`);
            }

            return data.map(entry => _map__GS_DTO_Widget__GS_Client_Widget(entry));
        }

        const data = await api_action_fetchData();
        commit(MutationTypes.SET_WIDGETS, data);
        return data;
    },
};

