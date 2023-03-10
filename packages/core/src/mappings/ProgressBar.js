import { COMPONENT_TYPES, FORM_TYPES, GROUPS, PROP_TYPES, BLOCK_STYLES_SECTIONS, } from "@draftbit/types";
export const SEED_DATA = [
    {
        name: "Progress Bar",
        tag: "ProgressBar",
        description: "A horizontal bar used to show completed progress",
        category: COMPONENT_TYPES.deprecated,
        stylesPanelSections: BLOCK_STYLES_SECTIONS,
        preview_image_url: "{CLOUDINARY_URL}/Status_Progress.png",
        supports_list_render: false,
        props: {
            progress: {
                group: GROUPS.data,
                label: "Progress",
                description: "The amount of progress to display. A number 0-1.",
                formType: FORM_TYPES.number,
                propType: PROP_TYPES.NUMBER,
                defaultValue: 0.5,
                min: 0,
                max: 1,
                step: 0.01,
                precision: 2,
                editable: true,
                required: true,
            },
            color: {
                group: GROUPS.basic,
                label: "Progress Color",
                description: "Custom color for the progress shown",
                formType: FORM_TYPES.color,
                propType: PROP_TYPES.THEME,
                defaultValue: null,
                editable: true,
                required: true,
            },
            unfilledColor: {
                group: GROUPS.basic,
                label: "Unfilled Color",
                description: "The color of the unfilled portion of the progress bar(eg. if at 50% then this is the color of the other 50%)",
                formType: FORM_TYPES.color,
                propType: PROP_TYPES.THEME,
                defaultValue: null,
                editable: true,
                required: true,
            },
            borderRadius: {
                group: GROUPS.basic,
                label: "Border Radius",
                description: "The border radius of the bar",
                formType: FORM_TYPES.number,
                propType: PROP_TYPES.NUMBER,
                defaultValue: 10,
                min: 0,
                max: 100,
                step: 1,
                precision: 1,
                editable: true,
                required: true,
            },
            borderWidth: {
                group: GROUPS.basic,
                label: "Border Width",
                description: "The width of the border that surrounds the bar.",
                formType: FORM_TYPES.number,
                propType: PROP_TYPES.NUMBER,
                defaultValue: 1,
                min: 0,
                max: 15,
                step: 1,
                precision: 1,
                editable: true,
                required: true,
            },
            borderColor: {
                group: GROUPS.basic,
                label: "Border Color",
                description: "Custom color for border of the entire bar",
                formType: FORM_TYPES.color,
                propType: PROP_TYPES.THEME,
                defaultValue: null,
                editable: true,
                required: true,
            },
            animationType: {
                group: GROUPS.basic,
                label: "Animation Type",
                description: "The type of animation that occurs when the bar is filled(Default is Spring)",
                formType: FORM_TYPES.flatArray,
                propType: PROP_TYPES.STRING,
                defaultValue: "spring",
                options: ["decay", "timing", "spring"],
                editable: true,
                required: true,
            },
        },
        layout: {
            width: 200,
            height: 20,
        },
    },
];
