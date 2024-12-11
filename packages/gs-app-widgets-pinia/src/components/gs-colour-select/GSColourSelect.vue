<template>
    <div class="gs-colour-select flex gap-[4px]">
        <GSColourSelectItem v-for="colour in _allPossibleColours"
            :colour
            :model-value="modelValue === colour"
            @update:model-value="(selected) => colourSelection(colour, selected)"
        ></GSColourSelectItem>
    </div>
</template>

<script lang="ts">
/**
 * NOTE(FOR REVIEWERS):
 * The `null` case is not actually covered by the description, but in case it turns out that the server can return null, we already support that here.
 */
export type GSColourSelect_modelValue = GS_DTO_Widget_Colour | null;
</script>

<script setup lang="ts">
import { tupleExhaustiveOf } from "@danwithabox/typeful-tuples";
import type { GS_DTO_Widget_Colour } from "~/stores/main.store";
import { GSColourSelectItem } from "~/components";

/** NOTE(FOR REVIEWERS): Fun type safety stuff with my own NPM package: comment out a colour, or add an extra colour to the DTO schema, and see TypeScript warn you of your mistake! */
const _allPossibleColours = tupleExhaustiveOf<GS_DTO_Widget_Colour>()([
    "blue",
    "green",
    "beige",
    "white",
    "black",
]);

const modelValue = defineModel<GSColourSelect_modelValue>({ default: null, });

function colourSelection(colour: GS_DTO_Widget_Colour, selected: boolean) {
    if (!selected) {
        if (colour === modelValue.value) modelValue.value = null;
    } else {
        modelValue.value = colour;
    }
}
</script>

<style scoped lang="scss">

</style>
