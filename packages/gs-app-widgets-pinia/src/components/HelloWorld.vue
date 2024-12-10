<template>
    <div>
        <span>{{ msg }}</span>
        <br>
        <span>This is the Cabin font from the Greenspark Figma</span>
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
import GreensparkLogoSvg from "./icons/GreensparkLogo.svg.vue";
import GSTooltip from "./gs-tooltip/GSTooltip.vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
    msg: string,
}>();
</script>

<style scoped lang="scss">

</style>
