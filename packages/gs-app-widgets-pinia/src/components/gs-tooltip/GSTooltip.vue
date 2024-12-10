<template>
    <div class="gs-tooltip">
        {{
        /**
         * NOTE: if we don't set Tooltip's :disabled prop with a delay, it breaks rendering sometimes
         * with "Cannot read properties of undefined (reading 'parentNode')",
         * usually when the tooltip is conditionally rendered via v-if or v-for, or when :disabled is updated
         */ void 0
        }}
        <Tooltip no-auto-focus theme="greenspark-tooltip" class="gs-tooltip-inner"
            :delay="computed_delay"
            :distance="props.distance"
            :placement="props.placement"

            :disabled="_isDisabled"
        >
            <template #default>
                {{ /** NOTE: this wrapper div is necessary in some cases to have the popper show up, for some reason*/ void 0 }}
                <div class="gs-tooltip-slot-default">
                    <slot name="default"></slot>
                </div>
            </template>
            <template #popper>
                <slot name="popper"></slot>
            </template>
        </Tooltip>
    </div>
</template>

<script lang="ts">
import FloatingVue from "floating-vue";
import defu from "defu";

/**
 * Theme and defaults have to be set in module scope (`<script>` tag), instead of in setup scope (`<script setup>` tag).
 * 
 * See: https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
 * 
 * - Avoids setting the theme every time an instance is created
 * - Avoids the [`<script setup>` cannot reference locally declared variables](https://stackoverflow.com/questions/69951687/vue-3-defineprops-are-referencing-locally-declared-variables) error
 */

const TOOLTIP_THEME_DEFAULTS = {
    delay:     0,
    distance:  10,
    placement: ((): GSTooltip_Placement => "right")(),
};

FloatingVue.options.themes["greenspark-tooltip"] = defu({
    triggers:       ["hover"],
    autoHide:       true,
    handleResize:   true,
    disposeTimeout: 10,

    instantMove: false,
}, TOOLTIP_THEME_DEFAULTS);

/** Values supported by floating-vue, added manually, because the package lacks these typings */
export type GSTooltip_Placement = |(
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
);
</script>

<script setup lang="ts">
import { Tooltip } from "floating-vue";
import { ref, computed, watch } from "vue";

const props = withDefaults(defineProps<{
    delay?:     number | { show?: number, hide?: number, },
    disabled?:  boolean,
    distance?:  number,
    placement?: GSTooltip_Placement,
}>(), {
    disabled: false,
});

const computed_delay = computed<{ show: number, hide: number, }>(() => {
    const show = typeof props.delay === "number" ? props.delay : props.delay?.show ?? TOOLTIP_THEME_DEFAULTS.delay;
    const hide = typeof props.delay === "number" ? props.delay : props.delay?.hide ?? TOOLTIP_THEME_DEFAULTS.delay;
    return { show, hide, };
});

const _isDisabled = ref(false);
watch([() => props.disabled], ([disabled]) => {
    const _disabled = disabled;
    /**
     * NOTE: if we don't wait for a tick, floating-vue's Tooltip component can *sometimes* cause a "ResizeObserver loop limit exceeded" error
     * 
     * Possibly related to this issue: https://github.com/Akryum/floating-vue/issues/862
     */
    setTimeout(() => { _isDisabled.value = _disabled; }, 0);
}, { immediate: true, });

</script>

<style scoped lang="scss">
.gs-tooltip {
    display: block;
    .gs-tooltip-inner {
        height: 100%;
        width: 100%;
    }
}
.gs-tooltip-slot-default {
    display: contents;
}
</style>

<style scoped lang="scss">

</style>

<style lang="scss">
.v-popper--theme-greenspark-tooltip {
    .v-popper__inner {
        background: #fff;
        color: #000;
        padding: 16px 24px;
        border-radius: 4px;
        filter:
            drop-shadow(0px 42px 76px rgba(0, 0, 0, 0.05))
            drop-shadow(0px 27.22px 44.51px rgba(0, 0, 0, 0.038))
            drop-shadow(0px 16.18px 24.21px rgba(0, 0, 0, 0.0304))
            drop-shadow(0px 8.4px 12.35px rgba(0, 0, 0, 0.025))
            drop-shadow(0px 3.42px 6.19px rgba(0, 0, 0, 0.0196))
            drop-shadow(0px 0.78px 2.99px rgba(0, 0, 0, 0.012))
        ;

        width: 248px;
        text-align: center;

        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        letter-spacing: normal;
        line-height: 1.42857143;
        text-shadow: none;
        text-transform: none;
        white-space: normal;
        word-break: normal;
        word-spacing: normal;
        word-wrap: normal;
    }
    .v-popper__arrow-outer {
        display: none;
    }
}

</style>
