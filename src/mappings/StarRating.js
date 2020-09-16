import { FORM_TYPES, PROP_TYPES, GROUPS } from "../core/component-types";

export const SEED_DATA_PROPS = {
  starSize: {
    defaultValue: 16,
    description: "Size of each individual star",
    editable: true,
    formType: FORM_TYPES.number,
    group: GROUPS.basic,
    label: "Star size",
    max: 36,
    min: 0,
    propType: PROP_TYPES.NUMBER,
    required: false,
    step: 1,
  },
  maxStars: {
    defaultValue: 5,
    description: "The max number of stars",
    editable: true,
    formType: FORM_TYPES.number,
    group: GROUPS.basic,
    label: "Max Stars",
    max: 36,
    min: 0,
    propType: PROP_TYPES.NUMBER,
    required: true,
    step: 1,
  },
  rating: {
    defaultValue: null,
    description: "The number of stars that should be colored in",
    editable: true,
    formType: FORM_TYPES.number,
    group: GROUPS.data,
    label: "Rating",
    min: 0,
    propType: PROP_TYPES.NUMBER,
    required: true,
    step: 1,
  },
};
