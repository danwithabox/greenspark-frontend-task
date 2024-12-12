<template>
    <div ref="templateRef_tabindex" class="gs-toggle"
        :class="{
            'gs-toggle--toggled': modelValue,
        }"
        :tabindex="0"
        @click="_toggle()"
        @mouseup="() => templateRef_tabindex?.blur()"
        @keydown.space.prevent="_toggle()"
    >
        <span class="gs-toggle--box">
            <span class="gs-toggle--circle"></span>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const modelValue = defineModel<boolean>({ default: false, });

const templateRef_tabindex = ref<HTMLDivElement | null>(null);

function _toggle() {
    modelValue.value = !modelValue.value;
}

</script>

<style scoped lang="scss">

.gs-toggle {
    --gs-toggle-width: 40px;
    --gs-toggle-height: 20px;
    --gs-stroke-outline-width: 0.68px;

    position: relative;
    display: inline-flex;
    cursor: pointer;
    width: var(--gs-toggle-width);
    height: var(--gs-toggle-height);

    .gs-toggle--box {
        border-radius: 34.18px;
        width: 100%;

        background-color: $gs-shade-F9;
        box-shadow: inset 0px 1.02541px 6.83608px rgba(0, 0, 0, 0.15);
        outline: var(--gs-stroke-outline-width) solid $gs-stroke-green;

        .gs-toggle--circle,
        .gs-toggle--circle::before {
            border-radius: 50%;

            position: absolute;
            height: var(--gs-toggle-height);
            width: var(--gs-toggle-height);
            background-color: $gs-shade-F9;
            outline: var(--gs-stroke-outline-width) solid $gs-stroke-light;
        }
        .gs-toggle--circle {
            transform: translateX(0px);
            transition: transform 200ms;
            @include shadow-sm;
        }
    }

    &.gs-toggle--toggled {
        .gs-toggle--box {
            background-color: $gs-green;
            outline-color: $gs-shade-B0;

            .gs-toggle--circle,
            .gs-toggle--circle::before {
                outline-color: $gs-green;
            }

            .gs-toggle--circle {
                transform: translateX(calc(var(--gs-toggle-width) - var(--gs-toggle-height)));
            }
        }

    }

    &:hover, &:focus-visible, &:focus-within {
        outline: none;

        .gs-toggle--circle::before {
            content: '';
            opacity: 0.5;
            outline: calc(7.18px - var(--gs-stroke-outline-width)) solid $gs-stroke-green;
            outline-offset: var(--gs-stroke-outline-width);
            filter: none;
        }
    }
}
</style>
