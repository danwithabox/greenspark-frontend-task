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
                        <div class="text-lg font-bold">{{ widget.amount }}&nbsp;{{ widget.type }}</div>
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

<script setup lang="ts">
import { computed } from "vue";
import { GS_DTO_Widget_Colour, gsWidgetColourMapping, type GS_Client_Widget } from "~/stores/main.store";
import { LogoGreensparkSvg, GSTooltip, GSColourSelect, type GSColourSelect_modelValue, IconInfoSvg, GSToggle, GSCheckbox } from "~/components";

const props = withDefaults(defineProps<{
    widget: GS_Client_Widget,

    defaultColour?: GS_DTO_Widget_Colour,
}>(), {
    defaultColour: "white",
});

const emit = defineEmits<{
    "changedActive": [id: GS_Client_Widget["id"], active: boolean],
}>();

/** NOTE(FOR REVIEWERS): placeholder, since there is no link data in the server response. */
const computed_linkedUrl = computed(() => {
    // return modelValue.value.linkedUrl;
    return `https://www.getgreenspark.com/`;
});

const computed_selectedColour = computed<GSColourSelect_modelValue>({
    get: () => {
        return props.widget.selectedColor;
    },
    set: (selectedColour) => {
        /** NOTE(FOR REVIEWERS): I am handling `null` just in case, see the comment on {@link GSColourSelect_modelValue} for the reasoning. */
        props.widget.selectedColor = selectedColour ?? props.defaultColour;
    },
});

const computed_colourClass = computed(() => gsWidgetColourMapping[props.widget.selectedColor]);

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
