<template>
    <div class="gs-widget">
        <div class="flex flex-col gap-[10px]">
            <div class="gs-widget--header"
                :class="{
                    [computed_colourClass]: true,
                }"
            >
                <div class="gs-widget--header-inner flex flex-row gap-[12px]">
                    <div class="gs-widget--logo">
                        <LogoGreensparkSvg></LogoGreensparkSvg>
                    </div>
                    <div class="gs-widget--header-text">
                        <div>This product {{ widget.action }}</div>
                        <div class="text-lg font-bold">{{ widget.amount }}&nbsp;{{ widget.impactType }}</div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <span>
                    <span>Link to Public Profile</span>
                    <span class="text-sm">&nbsp;</span>
                    <GSTooltip class="inline-block pb-[2px]">
                        <IconInfoSvg></IconInfoSvg>
                        <template #popper>
                            <div class="flex flex-col gap-[12px]">
                                <div>
                                    This widget links directly to your public profile so that you can easily share your impact with your customers.
                                    Turn it off here if you do not want the badge to link to it.
                                </div>
                                <div>
                                    <a rel="noreferrer noopener" target="_blank" :href="computed_linkedUrl">View Public Profile</a>
                                </div>
                            </div>
                        </template>
                    </GSTooltip>
                </span>
                <span class="mr-[2px]">
                    <GSCheckbox v-model="widget.linked"></GSCheckbox>
                </span>
            </div>
            <div class="flex justify-between">
                <span>Badge colour</span>
                <span>
                    <GSColourSelect v-model="computed_selectedColour"></GSColourSelect>
                </span>
            </div>
            <div class="flex justify-between">
                <span>Activate badge</span>
                <span class="mr-[2px]">
                    <GSToggle
                        :model-value="widget.active"
                        @update:model-value="(active) => emit('changedActive', widget.id, active)"
                    ></GSToggle>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export type GSWidget_Data = {
    /** The id of the product widget, incremental integer. */
    readonly id:         number,
    /** The type of impact. */
    readonly impactType: string,
    /** The amount of impact. */
    readonly amount:     number,
    /**  The action which corresponds to an impact type. */
    readonly action:     "collects" | "plants" | "offsets",
    /** Describes if the widget (badge) is active. */
    active:              boolean,
    /** Describes if the widget is linked to the public profile. */
    linked:              boolean,
    /** Describes the current color of the widget. */
    selectedColour:      "white" | "black" | "blue" | "green" | "beige",
};

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
 export const gsWidgetColourMapping: Record<GSWidget_Data["selectedColour"], `gs-colour--${GSWidget_Data["selectedColour"]}`> = {
    beige: `gs-colour--beige`,
    black: `gs-colour--black`,
    blue:  `gs-colour--blue`,
    green: `gs-colour--green`,
    white: `gs-colour--white`,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { LogoGreensparkSvg, GSTooltip, GSColourSelect, type GSColourSelect_modelValue, IconInfoSvg, GSToggle, GSCheckbox } from "~/components";

const props = withDefaults(defineProps<{
    widget: GSWidget_Data,

    defaultColour?: GSWidget_Data["selectedColour"],
}>(), {
    defaultColour: "white",
});

const emit = defineEmits<{
    "changedActive": [id: GSWidget_Data["id"], active: boolean],
}>();

/** NOTE(FOR REVIEWERS): placeholder, since there is no link data in the server response. */
const computed_linkedUrl = computed(() => {
    // return modelValue.value.linkedUrl;
    return `https://www.getgreenspark.com/`;
});

const computed_selectedColour = computed<GSColourSelect_modelValue>({
    get: () => {
        return props.widget.selectedColour;
    },
    set: (selectedColour) => {
        /** NOTE(FOR REVIEWERS): I am handling `null` just in case, see the comment on {@link GSColourSelect_modelValue} for the reasoning. */
        props.widget.selectedColour = selectedColour ?? props.defaultColour;
    },
});

const computed_colourClass = computed(() => gsWidgetColourMapping[props.widget.selectedColour]);

</script>

<style scoped lang="scss">
.gs-widget {
    height: 167px;

    color: $gs-green;

    .gs-widget--header {
        border-radius: 5.95px;

        .gs-widget--header-inner {
            padding-top: 10.3px;
            padding-left: 11.91px;

            width: 221.32px;
            height: 66px;

        }
        .gs-widget--header-text {
            display: flex;
            flex-direction: column;
            gap: 3.97px;
        }
        &.gs-colour--beige {
            background-color: $gs-widget-beige;
            color: $gs-widget-green;
        }
        &.gs-colour--black {
            background-color: $gs-widget-black;
            color: $gs-shade-F9;
        }
        &.gs-colour--blue  {
            background-color: $gs-widget-blue;
            color: $gs-shade-F9;
        }
        &.gs-colour--green {
            background-color: $gs-widget-green;
            color: $gs-shade-F9;
        }
        &.gs-colour--white {
            background-color: $gs-widget-white;
            color: $gs-widget-green;
        }

    }
}

</style>
