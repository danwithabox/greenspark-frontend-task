import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type { GSWidget_Data } from "@greenspark-task/lib-ui";

const storeId = "main";

//#region Schemas for validation and parsing
export const GS_DTO_Widget_ImpactType = Type.Union([
    Type.Literal("carbon"),
    Type.Literal("plastic"),
    Type.Literal("trees"),
]);
export type GS_DTO_Widget_ImpactType = Static<typeof GS_DTO_Widget_ImpactType>;

export const GS_DTO_Widget_Offsets = Type.Union([
    Type.Literal("collects"),
    Type.Literal("plants"),
    Type.Literal("offsets"),
]);
export type GS_DTO_Widget_Offsets = Static<typeof GS_DTO_Widget_Offsets>;

export const GS_DTO_Widget_Colour = Type.Union([
    Type.Literal("white"),
    Type.Literal("black"),
    Type.Literal("blue"),
    Type.Literal("green"),
    Type.Literal("beige"),
]);
export type GS_DTO_Widget_Colour = Static<typeof GS_DTO_Widget_Colour>;

export const GS_DTO_Widget = Type.Object({
    id:            Type.Number(),
    type:          GS_DTO_Widget_ImpactType,
    amount:        Type.Number(),
    action:        GS_DTO_Widget_Offsets,
    active:        Type.Boolean(),
    linked:        Type.Boolean(),
    selectedColor: GS_DTO_Widget_Colour,
});
export type GS_DTO_Widget = Static<typeof GS_DTO_Widget>;
//#endregion

export const DATA_URL = `https://b795b019-1f84-41f4-93a3-a702d686c75a.mock.pstmn.io/product-widgets`;

export interface IStore_Main {
    widgets: GSWidget_Data[],
}

export const useStore_Main = defineStore(storeId, () => {
    const initialState: IStore_Main = {
        widgets: [],
    };
    const state = ref(initialState);

    function _map__GS_DTO_Widget__GS_Client_Widget(data: GS_DTO_Widget): GSWidget_Data {
        const { type: _type, selectedColor: selectedColour, ...rest } = data;
        const impactType: GSWidget_Data["impactType"] = (() => {
            const pluralize = rest.amount !== 1;
            switch (_type) {
                case "trees": return pluralize ? "trees" : "tree";
                case "carbon": return pluralize ? "kgs of carbon" : "kg of carbon";
                case "plastic": return pluralize ? "plastic bottles" : "plastic bottle";
                default: return _type satisfies never;
            }
        })();
        return { ...rest, impactType, selectedColour, };
    }

    async function api_action_fetchData(): Promise<void> {
        const data = await (await fetch(DATA_URL, { method: "GET", })).json();

        const expectedSchema = Type.Array(GS_DTO_Widget);
        if (!Value.Check(expectedSchema, data)) {
            const errors = [...Value.Errors(expectedSchema, data)];
            for (const error of errors) console.error(error);
            throw new Error(`[store: ${storeId}] Malformed data received from server`);
        }

        state.value.widgets = data.map(entry => _map__GS_DTO_Widget__GS_Client_Widget(entry));

        //#region Rectifies fetched data to only have one active widget
        const firstActiveWidget = state.value.widgets.find(_ => _.active);
        if (firstActiveWidget) action_setOnlyActiveWidget(firstActiveWidget.id, true);
        //#endregion
    }

    function action_setOnlyActiveWidget(id: GSWidget_Data["id"], active: boolean) {
        for (const widget of state.value.widgets) {
            if (widget.id === id) widget.active = active;
            else if (active) widget.active = false;
        }
    }

    return {
        state,

        api_action_fetchData,
        action_setOnlyActiveWidget,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore_Main, import.meta.hot));
}
