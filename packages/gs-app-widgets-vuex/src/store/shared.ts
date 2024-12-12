import type { GSWidget_Data } from "@greenspark-task/lib-ui";
import { Type, type Static } from "@sinclair/typebox";

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

export function _map__GS_DTO_Widget__GS_Client_Widget(data: GS_DTO_Widget): GSWidget_Data {
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
