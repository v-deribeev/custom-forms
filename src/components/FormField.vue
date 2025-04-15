<template>
  <label :for="id">{{ labelText }}</label>
  <input :id :type :arias v-model="fieldValue" />
</template>

<script setup lang="ts" generic="T, K extends keyof T">
defineProps<{
  id: string;
  labelText: string;
  type?: string;
  arias?: Record<string, string>;
}>();

const fieldValue = defineModel<T, K>("fieldValue");
</script>
