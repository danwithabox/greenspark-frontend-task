import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { guardExhaustiveSwitchCase } from "~/utils";

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

export type GS_Client_Widget = {
    /** The id of the product widget, incremental integer. */
    id:            number,
    /** The type of impact. */
    type:          string,
    /** The amount of impact. */
    amount:        number,
    /**  The action which corresponds to an impact type. */
    action:        GS_DTO_Widget_Offsets,
    /** Describes if the widget (badge) is active. */
    active:        boolean,
    /** Describes if the widget is linked to the public profile. */
    linked:        boolean,
    /** Describes the current color of the widget. */
    selectedColor: GS_DTO_Widget_Colour,
};

export interface IStore_Main {
    widgets: GS_Client_Widget[],
}

export const useStore_Main = defineStore(storeId, () => {
    const initialState: IStore_Main = {
        widgets: [],
    };
    const state = ref(initialState);

    function _map__GS_DTO_Widget__GS_Client_Widget(data: GS_DTO_Widget): GS_Client_Widget {
        const { type: _type, ...rest } = data;
        const type: GS_Client_Widget["type"] = (() => {
            const pluralize = rest.amount !== 1;
            switch (_type) {
                case "trees": return pluralize ? "trees" : "tree";
                case "carbon": return pluralize ? "kgs of carbon" : "kg of carbon";
                case "plastic": return pluralize ? "plastic bottles" : "plastic bottle";
                default: guardExhaustiveSwitchCase(_type); return _type;
            }
        })();
        return { ...rest, type, };
    }

    async function api_action_fetchData(): Promise<void> {
        /** NOTE(FOR REVIEWERS): I assume this is just a placeholder for a well-integrated REST API, so I'm not going to parameterize it. */
        const url = `https://b795b019-1f84-41f4-93a3-a702d686c75a.mock.pstmn.io/product-widgets`;

        const data = await (await fetch(url, { method: "GET", })).json();

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

    function action_setOnlyActiveWidget(id: GS_Client_Widget["id"], active: boolean) {
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

/**
 * With this, we can map a colour literal to SCSS class names in a safe manner,
 * to keep the colour source of truth inside SCSS variables, instead of hard-coding copies of those colour variables in code.
 * 
 * E.g.:
 * 
 * `<template>`:
 * ```vue
 * <div :class="{ [computed_colourClass]: true, }"></div>
 * ```
 * `<script setup lang="ts">`:
 * ```ts
 * const computed_colourClass = computed(() => gsWidgetColourMapping[modelValue.value.selectedColor]);
 * ```
 * `<style scoped lang="scss">`:
 * ```scss
 * .gs-colour--beige { background-color: $gs-widget-beige; }
 * .gs-colour--black { background-color: $gs-widget-black; }
 * .gs-colour--blue  { background-color: $gs-widget-blue; }
 * .gs-colour--green { background-color: $gs-widget-green; }
 * .gs-colour--white { background-color: $gs-widget-white; }
 * ```
 */
export const gsWidgetColourMapping: Record<GS_DTO_Widget_Colour, `gs-colour--${GS_DTO_Widget_Colour}`> = {
    beige: `gs-colour--beige`,
    black: `gs-colour--black`,
    blue:  `gs-colour--blue`,
    green: `gs-colour--green`,
    white: `gs-colour--white`,
};

/** NOTE(FOR REVIEWERS): Placed this here for posterity, for when the fetch URL stops working. */
function DATA_EXAMPLE(): GS_DTO_Widget[] {
    return [{
        "id":            1,
        "type":          "carbon",
        "amount":        2,
        "action":        "offsets",
        "active":        false,
        "linked":        false,
        "selectedColor": "green",
    },
    {
        "id":            2,
        "type":          "trees",
        "amount":        15,
        "action":        "plants",
        "active":        true,
        "linked":        false,
        "selectedColor": "black",
    },
    {
        "id":            3,
        "type":          "plastic",
        "amount":        300,
        "action":        "collects",
        "active":        true,
        "linked":        true,
        "selectedColor": "beige",
    }];
}

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore_Main, import.meta.hot));
}
