<template>
    <div class="gs-tooltip">
        <Menu no-auto-focus auto-handle-resize
            theme="greenspark-tooltip"
            placement="bottom"
            :triggers="['hover', 'touch']"
            :delay="200"
            :dispose-timeout="10"
            :instant-move="false"
        >
            <template #default>
                <div class="contents">
                    <slot name="default"></slot>
                </div>
            </template>
            <template #popper>
                <slot name="popper"></slot>
            </template>
        </Menu>
    </div>
</template>

<script lang="ts">
import FloatingVue from "floating-vue";

/**
 * NOTE(FOR REVIEWERS): `<script>` runs once, when the component module is parsed, <script setup> runs for every instance.
 * Therefore, it's better to define the theme here, where it gets set only once.
 */
FloatingVue.options.themes["greenspark-tooltip"] = {
    $extend:   "menu",
    $resetCss: true,
};
</script>

<script setup lang="ts">
import { Menu } from "floating-vue";

</script>

<style scoped lang="scss">

</style>

<style lang="scss">
.v-popper--theme-greenspark-tooltip {
    .v-popper__inner {
        background: $gs-tooltip-bg;
        padding: 24px 16px;
        border-radius: 4px;

        width: 248px;
        text-align: center;

        @include shadow-lg;
    }
    .v-popper__arrow-outer {
        display: none;
    }
}

</style>
