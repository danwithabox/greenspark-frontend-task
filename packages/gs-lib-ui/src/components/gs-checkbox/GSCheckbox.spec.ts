import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { GSCheckbox } from "../index";

describe("GSCheckbox", () => {
    let wrapper: ReturnType<typeof mount<typeof GSCheckbox>>;

    beforeEach(() => {
        wrapper = mount(GSCheckbox, {
            props: {
                modelValue:            false,
                "onUpdate:modelValue": async (value) => await wrapper.setProps({ modelValue: value, }),
            },
        });
    });

    it("changes modelValue when it is clicked", async () => {
        const element = wrapper.find(`div[tabindex="0"]`);

        await element.trigger("click");
        expect(wrapper.props("modelValue")).toBe(true);

        await element.trigger("click");
        expect(wrapper.props("modelValue")).toBe(false);

        await element.trigger("keydown.space");
        await element.trigger("keyup.space");
        expect(wrapper.props("modelValue")).toBe(true);

        await element.trigger("keydown.space");
        await element.trigger("keyup.space");
        expect(wrapper.props("modelValue")).toBe(false);
    });
});
