<template>
  <legend>
    <label :for="id">{{ labelText }}</label>
    <input :id type="radio" :arias :name v-model="fieldValue" />
  </legend>
</template>

<script setup lang="ts" generic="T, K extends keyof T">
defineProps<{
  id: string;
  labelText: string;
  name: string;
  arias?: Record<string, string>;
}>();

const fieldValue = defineModel<T, K>("fieldValue");
</script>
