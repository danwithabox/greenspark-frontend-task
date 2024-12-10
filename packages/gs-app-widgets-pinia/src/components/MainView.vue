<template>
    <div>
        <div v-for="(widget, index) in computed_widgets">
            <GsWidget :model-value="widget" @update:model-value="(widget) => updateWidget(widget, index)"></GsWidget>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type GS_DTO_Widget, useStore_Main } from "~/stores/main.store";
import { computed, onMounted } from "vue";
import GsWidget from "./gs-widget/GsWidget.vue";

const store_Main = useStore_Main();

onMounted(async () => {
    await store_Main.action_fetchData();
});

const computed_widgets = computed(() => store_Main.state.widgets);

function updateWidget(widget: GS_DTO_Widget, index: number) {
    store_Main.state.widgets[index] = widget;
}

</script>

<style scoped lang="scss">

</style>
