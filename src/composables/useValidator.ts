import { reactive } from "vue";

export interface ValidatorOptions {
  regex?: RegExp;
  custom?: (val: string) => boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  label?: string;
}

const touched = reactive<Record<string, boolean>>({});
const initialValues = reactive<Record<string, string>>({});
const currentValues = reactive<Record<string, string>>({});

// --- 🌱 Field State Management ---

const registerField = (key: string, initialValue = "") => {
  if (!(key in initialValues)) {
    initialValues[key] = initialValue;
    currentValues[key] = initialValue;
    touched[key] = false;
  }
};

const markTouched = (key: string) => {
  touched[key] = true;
};

const updateValue = (key: string, value: string | undefined) => {
  currentValues[key] = value ?? "";
};

const isTouched = (key: string): boolean => touched[key] === true;

const isDirty = (key: string): boolean =>
  currentValues[key] !== initialValues[key];

const shouldValidate = (key: string): boolean => isTouched(key) || isDirty(key);

// --- 🔍 Field Validation ---

export function validateField(
  value: string,
  options: ValidatorOptions
): string {
  console.log("value", value);
  const val = value.trim();

  if (options.required && val.length === 0) {
    return `${options.label || "Field"} is required.`;
  }

  if (options.minLength && val.length < options.minLength) {
    return `${options.label || "Field"} must be at least ${
      options.minLength
    } characters long.`;
  }

  if (options.regex && !options.regex.test(val)) {
    return `${options.label || "Field"} is not valid.`;
  }

  if (options.custom && !options.custom(val)) {
    return `${options.label || "Field"} is not valid.`;
  }

  return "";
}

// --- 🧩 Exported API ---

export function useValidator() {
  return {
    // state
    registerField,
    markTouched,
    updateValue,
    isTouched,
    isDirty,
    shouldValidate,
    currentValues,

    // validation
    validateField,
  };
}
