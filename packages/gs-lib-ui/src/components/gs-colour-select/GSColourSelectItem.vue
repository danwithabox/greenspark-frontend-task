<template>
    <div ref="templateRef_tabindex" class="gs-colour-select-block"
        :class="{
            'gs-colour-select-block--selected': modelValue_selected,
            [computed_colourClass]:             true,
        }"
        :tabindex="0"
        @click="_toggle()"
        @mouseup="() => templateRef_tabindex?.blur()"
        @keydown.space.prevent="_toggle()"
    ></div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { gsWidgetColourMapping, type GSWidget_Data } from "../gs-widget/GSWidget.vue";

const props = withDefaults(defineProps<{
    colour:        GSWidget_Data["selectedColour"],
    deSelectable?: boolean,
}>(), {
    deSelectable: false,
});
const modelValue_selected = defineModel<boolean>({ default: false, });

const templateRef_tabindex = ref<HTMLDivElement | null>(null);

function _toggle() {
    if (props.deSelectable) modelValue_selected.value = !modelValue_selected.value;
    else modelValue_selected.value = true;
}

const computed_colourClass = computed(() => gsWidgetColourMapping[props.colour]);
</script>

<style scoped lang="scss">
.gs-colour-select-block {
    cursor: pointer;

    --gs-colour-select-block-size: 16px;
    width: var(--gs-colour-select-block-size);
    min-width: var(--gs-colour-select-block-size);
    max-width: var(--gs-colour-select-block-size);
    height: var(--gs-colour-select-block-size);
    min-height: var(--gs-colour-select-block-size);
    max-height: var(--gs-colour-select-block-size);

    &.gs-colour-select-block--selected {
        border: 1px solid $gs-shade-B0;
    }
    &:hover, &:focus-visible, &:focus-within {
        outline: none;
        opacity: 0.8;
    }
}

.gs-colour--beige { background-color: $gs-widget-beige; }
.gs-colour--black { background-color: $gs-widget-black; }
.gs-colour--blue  { background-color: $gs-widget-blue; }
.gs-colour--green { background-color: $gs-widget-green; }
.gs-colour--white { background-color: $gs-widget-white; }
</style>
