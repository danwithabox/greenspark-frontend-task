import type { GSWidget_Data } from "@greenspark-task/lib-ui";

export type State = {
    widgets: GSWidget_Data[],
};

export const state: State = {
    widgets: [],
};
