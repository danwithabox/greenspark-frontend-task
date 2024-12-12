<template>
    <div class="main-view--frame">
        <h2 class="font-bold">Per product widgets</h2>
        <hr>
        <div class="main-view--widget-list flex flex-col flex-grow tablet:flex justify-between tablet:flex-row">
            <GSWidget v-for="widget in mutableWidgets" :key="widget.id"
                :widget
                @changed-active="(id, active) => store.commit(MutationTypes.SET_ONLY_ACTIVE_WIDGET, { id, active, })"
            ></GSWidget>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { GSWidget, type GSWidget_Data } from "@greenspark-task/lib-ui";
import { useStore } from "~/store/store";
import { ActionTypes } from "~/store/definitions/action-types";
import { MutationTypes } from "~/store/definitions/mutation-types";

const store = useStore();

onMounted(async () => {
    await store.dispatch(ActionTypes.FETCH_DATA, void 0);
});

//#region NOTE(FOR REVIEWERS):
/**
 * With a calculated risk of being seen as a smart-ass, some opinions about Vuex:
 * 
 * This code below, and the sprawling `store` folder, is why Pinia is nicer.
 * 
 * To demonstrate, I enabled ["strict" mode in Vuex](https://vuex.vuejs.org/guide/strict.html),
 * and it causes errors, because `<GSWidget>` expects that it can mutate its own slice of data.
 * 
 * With Pinia, we don't have to avoid directly mutating the state in such convoluted ways.
 * In fact, it is intended and explicitly allowed, and the dev tools can still track such mutations:
 * https://github.com/vuejs/pinia/discussions/1264
 * 
 * We could either rewrite `<GSWidget>` into a mess of update events,
 * bubbling all the way up through its component hierarchy,
 * or we can let it mutate a safe `ref` copy of the data, which we then sync back to the store.
 * 
 * The latter was more manageable as a workaround, so I did that.
 * 
 * There exists a **good** principle of "not mutating parent data through props", but in my experience,
 * that is needlessly strict in some cases.
 * In the case of Pinia, mutating input props can be thought of as "delegating store state management" instead,
 * while otherwise **still adhering to this principle when working with "normal" components**.
 * 
 * In my work, I have found Pinia's behavior to result in quicker, leaner, nicer results, without any
 * issues - no infinite loops in state management, nor in rendering. It's perfectly safe, and super comfortable
 * in terms of developer experience!
 * 
 * However, this is just an opinion, and I can adapt to whatever convention a team employs.
 */
const mutableWidgets = ref<GSWidget_Data[]>([]);
watch(() => mutableWidgets.value, (widgets) => {
    const isSame = JSON.stringify(widgets) === JSON.stringify(store.state.widgets);

    if (!isSame) store.commit(MutationTypes.SET_WIDGETS, widgets);
}, { deep: true, });
watch(() => store.state.widgets, (state_widgets) => {
    mutableWidgets.value = JSON.parse(JSON.stringify(state_widgets));
}, { deep: true, });
//#endregion
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
