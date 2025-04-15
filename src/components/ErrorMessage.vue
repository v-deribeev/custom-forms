<template>
  <p class="error-msg" v-if="!!errorMessage">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
// Define props for receiving error messages
defineProps<{
  errorMessage: string;
}>();
</script>

<style scoped>
.error-msg {
  color: red;
  font-weight: bold;
  font-size: 12px;
}
</style>
