<template>
  <form novalidate>
    <FormField
      id="firstName"
      labelText="First Name"
      type="text"
      v-model:fieldValue="formData.firstName"
    />
    <FormField
      id="lastName"
      labelText="Last Name"
      type="text"
      v-model:fieldValue="formData.lastName"
    />
    <FormField
      id="email"
      labelText="Email"
      type="email"
      v-model:fieldValue="formData.email"
    />
    <FormField
      id="password"
      labelText="Password"
      type="password"
      v-model:fieldValue="formData.password"
    />
  </form>
  <button @click.prevent="handleFormSubmit">Submit</button>
  {{ formData }}
</template>

<script setup lang="ts">
import FormField from "./FormField.vue";
import { ref } from "vue";

const formData = ref<{
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const handleFormSubmit = (): void => {
  localStorage.setItem("userData", JSON.stringify(formData.value));
  console.log(
    "localStorage",
    JSON.parse(localStorage.getItem("userData") || "")
  );
};
</script>

<style scoped></style>
