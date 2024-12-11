<template>
    <div class="flex gap-16">
        <div>
            <h2>Components</h2>
            <div>
                <code>{{ `<GSCheckbox>` }}</code>
                <div>
                    <GSCheckbox v-model="state.checkbox"></GSCheckbox>
                </div>
                <code>{{ state.checkbox }}</code>
            </div>
            <hr>
            <div>
                <code>{{ `<GSColourSelect>` }}</code>
                <div>
                    <GSColourSelect v-model="state.colourSelect"></GSColourSelect>
                </div>
                <code>{{ state.colourSelect }}</code>
            </div>
            <hr>
            <div>
                <code>{{ `<GSToggle>` }}</code>
                <div>
                    <GSToggle v-model="state.toggle"></GSToggle>
                </div>
                <code>{{ state.toggle }}</code>
            </div>
            <hr>
            <div>
                <code>{{ `<GSTooltip>` }}</code>
                <div>
                    <GSTooltip>
                        <LogoGreensparkSvg></LogoGreensparkSvg>
                        <template #popper>What a lovely logo!</template>
                    </GSTooltip>
                </div>
            </div>
            <hr>
            <div>
                <code>{{ `<GSWidget>` }}</code>
                <div>
                    <GSWidget :widget="state.widget" @changed-active="(id, active) => state.widget.active = active"></GSWidget>
                </div>
                <pre>{{ state.widget }}</pre>
            </div>
        </div>
        <div>
            <h2>Icons</h2>
            <div>
                <div>
                    <IconCheckSvg></IconCheckSvg>
                </div>
                <div>
                    <IconInfoSvg></IconInfoSvg>
                </div>
                <div>
                    <LogoGreensparkSvg></LogoGreensparkSvg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GSCheckbox, GSColourSelect, GSToggle, GSTooltip, GSWidget, IconCheckSvg, IconInfoSvg, LogoGreensparkSvg, type GSWidget_Data } from "~/components";

const state = ref<{
    checkbox:     false,
    colourSelect: GSWidget_Data["selectedColour"],
    toggle:       false,
    widget:       GSWidget_Data,
}>({
    checkbox:     false,
    colourSelect: "green",
    toggle:       false,
    widget:       {
        id:             0,
        impactType:     "kgs of carbon",
        amount:         2,
        action:         "offsets",
        active:         true,
        linked:         true,
        selectedColour: "green",
    },
});

</script>

<style scoped lang="scss">
hr {
    width: 100%;
    height: 2px;
    background-color: $gs-shade-B0;
    margin: 20px 0;
    border: none;
}
</style>
