<template>
    <div>
        <div class="main-view--frame">
            <h2 class="font-bold">Per product widgets</h2>
            <hr>
            <div class="main-view--widget-list flex flex-col flex-grow tablet:flex justify-between tablet:flex-row">
                <GSWidget v-for="widget in computed_widgets" :key="widget.id"
                    :widget
                    @changed-active="(id, active) => store_Main.action_setOnlyActiveWidget(id, active)"
                ></GSWidget>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore_Main } from "~/stores/main.store";
import { GSWidget } from "~/components";

const store_Main = useStore_Main();

onMounted(async () => {
    await store_Main.api_action_fetchData();
});

const computed_widgets = computed(() => store_Main.state.widgets);

</script>

<style scoped lang="scss">
.main-view--frame {
    display: flex;
    flex-direction: column;

    width: 331px;
    height: 697px;

    padding: 36px;

    border-radius: 8px;

    background-color: $gs-shade-F9;

    @include shadow-lg;

    @media (min-width: theme('screens.tablet')) {
        width: 851px;
        height: 419px;
    }
}

.main-view--widget-list {
    padding: 0 20px;

    @media (min-width: theme('screens.tablet')) {
        padding: 0;
    }
}

hr {
    width: 100%;
    height: 2px;
    background-color: $gs-shade-B0;
    margin-bottom: 20px;
    border: none;
}
</style>
