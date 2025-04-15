<template>
  <div class="fieldWrapper">
    <label :for="id">{{ labelText }}</label>
    <input
      :id="id"
      :type="type"
      v-bind="arias"
      v-model="fieldValue"
      @blur="markTouched(id)"
      @input="updateValue(id, fieldValue as string)"
    />
    <ErrorMessage :error-message="computedError" />
  </div>
</template>

<script setup lang="ts" generic="T, K extends keyof T">
import ErrorMessage from "./ErrorMessage.vue";
import { useValidator } from "../composables/useValidator";
import { computed, onMounted, watch } from "vue";
import type { ValidatorOptions } from "../composables/useValidator";

// Define props for input, including a v-model equivalent for fieldValue
const props = defineProps<{
  id: string;
  labelText: string;
  errorMessage?: string;
  type?: string;
  validatorOptions?: ValidatorOptions;
  arias?: Record<string, string>;
}>();

// Set up the field value for v-model binding
const fieldValue = defineModel<T, K>("fieldValue");

const {
  registerField,
  markTouched,
  updateValue,
  shouldValidate,
  validateField,
} = useValidator();

onMounted(() => {
  registerField(props.id, fieldValue as unknown as string);
});

// Keep the field value in sync
watch(fieldValue, (val) => {
  updateValue(props.id, val as unknown as string);
});

// Compute the error based on validation rules
const computedError = computed(() => {
  if (!props.validatorOptions) return "";
  if (!shouldValidate(props.id)) return "";
  return validateField(
    fieldValue.value as unknown as string,
    props.validatorOptions
  );
});
</script>

<style scoped>
.fieldWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
