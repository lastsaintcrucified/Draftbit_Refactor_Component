import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { isString, isNumber, isNaN } from "lodash";
const NumberInput = ({ onChangeText, value, defaultValue, ...props }) => {
  const [currentStringNumberValue, setCurrentStringNumberValue] = useState("0");
  const formatValueToStringNumber = (valueToFormat) => {
    if (valueToFormat != null) {
      if (isString(valueToFormat) && valueToFormat !== "") {
        if (/^0[1-9]$/.test(valueToFormat)) {
          return valueToFormat.slice(1);
        } else if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(valueToFormat)) {
          return valueToFormat;
        } else {
          return currentStringNumberValue;
        }
      } else if (isNumber(valueToFormat) && !isNaN(valueToFormat)) {
        return valueToFormat.toString();
      }
    }
    return "0";
  };
  // set currentStringNumberValue as defaultValue prop if there is a differnce on first render only
  useEffect(() => {
    const defaultStringNumberValue = formatValueToStringNumber(defaultValue);
    if (currentStringNumberValue !== defaultStringNumberValue) {
      setCurrentStringNumberValue(defaultStringNumberValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeText = (newValue) => {
    const newStringNumberValue = formatValueToStringNumber(newValue);
    const number = parseFloat(newStringNumberValue);
    setCurrentStringNumberValue(newStringNumberValue);
    onChangeText === null || onChangeText === void 0
      ? void 0
      : onChangeText(number);
  };
  // run handleChangeText with value prop only when value prop changes (and first render to reset currentStringNumberValue)
  useEffect(() => {
    const nextStringNumberValue = formatValueToStringNumber(value);
    if (currentStringNumberValue !== nextStringNumberValue) {
      handleChangeText(nextStringNumberValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return React.createElement(TextInput, {
    keyboardType: "numeric",
    value: currentStringNumberValue,
    onChangeText: handleChangeText,
    ...props,
  });
};
export default NumberInput;
