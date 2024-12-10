<template>
    <div class="gs-widget">
        <div class=""></div>
        <span>This is the Cabin font from the Greenspark Figma</span>
        <pre>
            {{ modelValue }}
        </pre>
        <span>Link to Public Profile<input type="checkbox" v-model="modelValue.linked"></span>
        <div>
            <GreensparkLogoSvg></GreensparkLogoSvg>
        </div>
        <GSTooltip theme="greenspark-tooltip">
            <Icon icon="material-symbols:info-outline"></Icon>
            <template #popper>
                <div>
                    This widget links directly to your public profile so that you can easily share your impact with your customers.
                    Turn it off here if you do not want the badge to link to it.
                </div>
                <div>
                    View Public Profile
                </div>
            </template>
        </GSTooltip>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import GreensparkLogoSvg from "~/components/icons/GreensparkLogo.svg.vue";
import GSTooltip from "~/components/gs-tooltip/GSTooltip.vue";
import type { GS_DTO_Widget } from "~/stores/main.store";
import { computed } from "vue";
import { assertExhaustiveSwitchCase } from "~/utils";

const modelValue = defineModel<GS_DTO_Widget>({ required: true, });
const computed_isSelectedColorLight = computed((): boolean => {
    const { selectedColor, } = modelValue.value;
    switch (selectedColor) {
        case "black":
        case "blue":
        case "green": return false;
        case "beige":
        case "white": return true;
        default: {
            assertExhaustiveSwitchCase(selectedColor);
            return false;
        }
    }
});

</script>

<style scoped lang="scss">
.gs-widget {
    min-width: 221px; // TODO: remove, and set automatically, according to Figma
    height: 167px;
}
</style>
