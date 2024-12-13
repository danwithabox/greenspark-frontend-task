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
export type GSColourSelect_modelValue = GSWidget_Data["selectedColour"] | null;
</script>

<script setup lang="ts">
import { tupleExhaustiveOf } from "@danwithabox/typeful-tuples";
import { GSColourSelectItem, type GSWidget_Data } from "~/components";

/** NOTE(FOR REVIEWERS): Fun type safety feature courtesy of my own NPM package: comment out a colour, or add an extra colour to the DTO schema, and see TypeScript warn you of your mistake! */
const _allPossibleColours = tupleExhaustiveOf<GSWidget_Data["selectedColour"]>()([
    "blue",
    "green",
    "beige",
    "white",
    "black",
]);

const modelValue = defineModel<GSColourSelect_modelValue>({ default: null, });

function colourSelection(colour: GSWidget_Data["selectedColour"], selected: boolean) {
    if (!selected) {
        if (colour === modelValue.value) modelValue.value = null;
    } else {
        modelValue.value = colour;
    }
}
</script>

<style scoped lang="scss">

</style>
