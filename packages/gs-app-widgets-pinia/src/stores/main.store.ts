import { defineStore } from "pinia";
import { ref } from "vue";
import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const storeId = "main";

//#region Schemas for validation
export const GS_DTO_Widget_ImpactType = Type.Union([
    Type.Literal("carbon"),
    Type.Literal("plastic"), // NOTE: the DTO description differs from the actual server response here. Description says: "plastic bottles". Actual response has: "plastic".
    Type.Literal("trees"),
]);
export type GS_DTO_Widget_ImpactType = Static<typeof GS_DTO_Widget_ImpactType>;

export const GS_DTO_Widget_Offsets = Type.Union([
    Type.Literal("collects"),
    Type.Literal("plants"),
    Type.Literal("offsets"),
]);
export type GS_DTO_Widget_Offsets = Static<typeof GS_DTO_Widget_Offsets>;

export const GS_DTO_Widget_Color = Type.Union([
    Type.Literal("white"),
    Type.Literal("black"),
    Type.Literal("blue"),
    Type.Literal("green"),
    Type.Literal("beige"),
]);
export type GS_DTO_Widget_Color = Static<typeof GS_DTO_Widget_Color>;

export const GS_DTO_Widget = Type.Object({
    /** The id of the product widget, incremental integer. */
    id:            Type.Number(),
    /** The type of impact. */
    type:          GS_DTO_Widget_ImpactType,
    /** The amount of impact. */
    amount:        Type.Number(),
    /**  The action which corresponds to an impact type. */
    action:        GS_DTO_Widget_Offsets,
    /** Describes if the widget (badge) is active. */
    active:        Type.Boolean(),
    /** Describes if the widget is linked to the public profile. */
    linked:        Type.Boolean(),
    /** Describes the current color of the widget. */
    selectedColor: GS_DTO_Widget_Color,
});
export type GS_DTO_Widget = Static<typeof GS_DTO_Widget>;
//#endregion

export interface IStore_Main {
    widgets: GS_DTO_Widget[],
}

export const useStore_Main = defineStore(storeId, () => {
    const initialState: IStore_Main = {
        widgets: [],
    };
    const state = ref(initialState);

    /**
     * Gets the data from the external resource.
     * 
     * Since the resource is external and not well-integrated with the front end, I elected to validate the payload.
     * In fact, validation did catch an issue, check the comment for {@link GS_DTO_Widget_ImpactType} below.
     */
    async function action_fetchData(): Promise<void> {
        const url = `https://b795b019-1f84-41f4-93a3-a702d686c75a.mock.pstmn.io/product-widgets`;

        const data = await (await fetch(url, { method: "GET", })).json();

        const expectedSchema = Type.Array(GS_DTO_Widget);
        if (!Value.Check(expectedSchema, data)) {
            const errors = [...Value.Errors(expectedSchema, data)];
            console.group("Value.Errors");
            for (const error of errors) console.error(error);
            console.groupEnd();
            throw new Error(`[store: ${storeId}] Malformed data received from server`);
        }

        state.value.widgets = data;
    }

    return {
        state,

        action_fetchData,
    };
});
