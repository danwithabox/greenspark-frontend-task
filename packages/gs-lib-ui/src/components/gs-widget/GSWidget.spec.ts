import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { GSWidget, gsWidgetColourMapping, type GSWidget_Data } from "../index";

describe("GSWidget", () => {
    let wrapper: ReturnType<typeof mount<typeof GSWidget>>;

    beforeEach(() => {
        wrapper = mount(GSWidget, {
            props: {
                widget: {
                    id:             0,
                    impactType:     "plastic bottles",
                    amount:         2,
                    action:         "collects",
                    active:         true,
                    linked:         true,
                    selectedColour: "green",
                },
            },
        });
    });

    // NOTE(FOR REVIEWERS): E2E testing (Cypress or Playwright) would be better suited for this, but that's overkill for this task
    it("changes header colour class when a colour selector is clicked", async () => {
        const el_header = wrapper.find(`.gs-widget--header`);
        const el_colorSelectBlue = wrapper.find(`.gs-colour-select-item&.${gsWidgetColourMapping["blue"]}`);

        const headerElementClassesIncludingColorClass = (text: GSWidget_Data["selectedColour"]) => el_header.classes().includes(gsWidgetColourMapping[text]);

        expect(headerElementClassesIncludingColorClass("green")).toBe(true);
        expect(headerElementClassesIncludingColorClass("blue")).toBe(false);

        await el_colorSelectBlue.trigger("click");

        expect(headerElementClassesIncludingColorClass("green")).toBe(false);
        expect(headerElementClassesIncludingColorClass("blue")).toBe(true);
    });
});
