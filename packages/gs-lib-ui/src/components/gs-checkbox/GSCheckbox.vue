<template>
    <div ref="templateRef_tabindex" class="gs-checkbox"
        :class="{
            'gs-checkbox--checked': modelValue,
        }"
        :tabindex="0"
        @click="_toggle()"
        @mouseup="() => templateRef_tabindex?.blur()"
        @keydown.space.prevent="_toggle()"
    >
        <span class="gs-checkbox--box">
            <IconCheckSvg class="gs-checkbox--checkmark"></IconCheckSvg>
            <div class="gs-checkbox--hover-circle"></div>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconCheckSvg } from "~/components";

const modelValue = defineModel<boolean>({ default: false, });

const templateRef_tabindex = ref<HTMLDivElement | null>(null);

function _toggle() {
    modelValue.value = !modelValue.value;
}

</script>

<style scoped lang="scss">
@use "sass:color";

.gs-checkbox {
    --gs-checkbox-size: 16px;
    --gs-checkbox-hover-size: 33px;
    --gs-stroke-border-width: 2px;

    position: relative;
    display: inline-flex;
    cursor: pointer;
    width: var(--gs-checkbox-size);
    height: var(--gs-checkbox-size);

    .gs-checkbox--box {
        width: var(--gs-checkbox-size);
        height: var(--gs-checkbox-size);

        border-radius: 2px;

        background-color: $gs-shade-F9;
        border: var(--gs-stroke-border-width) solid #000;

        .gs-checkbox--checkmark {
            position: absolute;
            top: 0;
            left: 0;
            width: var(--gs-checkbox-size);
            height: var(--gs-checkbox-size);
            color: #FFF;
            visibility: hidden;
        }
        .gs-checkbox--hover-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: var(--gs-checkbox-hover-size);
            height: var(--gs-checkbox-hover-size);
            border-radius: 50%;
            background-color: $gs-stroke-green;
            transform: translate(-50%, -50%);
            opacity: 0.5;
            visibility: hidden;
        }
    }

    &.gs-checkbox--checked {
        .gs-checkbox--box {
            background-color: $gs-green;
            border-color: $gs-green;
        }
        .gs-checkbox--checkmark {
            visibility: visible;
        }

    }

    &:hover, &:focus-visible, &:focus-within {
        outline: none;

        .gs-checkbox--hover-circle {
            visibility: visible;
        }
    }
}
</style>
