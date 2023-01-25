import { createColorProp, FORM_TYPES, GROUPS, PROP_TYPES, } from "@draftbit/types";
export const SEED_DATA = {
    name: "Linear Gradient",
    tag: "LinearGradient",
    description: "Linear Gradient Component",
    layout: { width: "100%", height: "100%" },
    props: {
        endY: {
            group: GROUPS.basic,
            label: "End Y",
            description: "End position from Bottom",
            editable: true,
            required: false,
            defaultValue: 100,
            min: 0,
            max: 100,
            step: 1,
            precision: 0,
            formType: FORM_TYPES.number,
            propType: PROP_TYPES.NUMBER,
        },
        endX: {
            group: GROUPS.basic,
            label: "End X",
            description: "End position from Right",
            editable: true,
            required: false,
            defaultValue: 100,
            min: 0,
            max: 100,
            step: 1,
            precision: 0,
            formType: FORM_TYPES.number,
            propType: PROP_TYPES.NUMBER,
        },
        startY: {
            group: GROUPS.basic,
            label: "Start Y",
            description: "Start position from Top",
            editable: true,
            required: false,
            defaultValue: 0,
            min: 0,
            max: 100,
            step: 1,
            precision: 0,
            formType: FORM_TYPES.number,
            propType: PROP_TYPES.NUMBER,
        },
        startX: {
            group: GROUPS.basic,
            label: "Start X",
            description: "Start position from Left",
            editable: true,
            required: false,
            defaultValue: 0,
            min: 0,
            max: 100,
            step: 1,
            precision: 0,
            formType: FORM_TYPES.number,
            propType: PROP_TYPES.NUMBER,
        },
        color3: createColorProp({
            label: "Color 3",
            defaultValue: undefined,
        }),
        color2: createColorProp({
            label: "Color 2",
            defaultValue: "secondary",
        }),
        color1: createColorProp({
            label: "Color 1",
            defaultValue: "primary",
        }),
    },
};