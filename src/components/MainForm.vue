<template>
  <form novalidate>
    <FormField
      id="firstName"
      labelText="First Name"
      type="text"
      v-model:fieldValue="formData.firstName"
      :validatorOptions="firstNameValidatorOptions"
    />
    <FormField
      id="lastName"
      labelText="Last Name"
      type="text"
      v-model:fieldValue="formData.lastName"
      :validatorOptions="lastNameValidatorOptions"
    />
    <FormField
      id="email"
      labelText="Email"
      type="email"
      v-model:fieldValue="formData.email"
      :validatorOptions="emailValidatorOptions"
    />
    <FormField
      id="password"
      labelText="Password"
      type="password"
      v-model:fieldValue="formData.password"
      :validatorOptions="passwordValidatorOptions"
    />
  </form>
  <button @click.prevent="handleFormSubmit">Submit</button>
  {{ formData }}
</template>

<script setup lang="ts">
import FormField from "./FormField.vue";
import { ref, computed } from "vue";

// Define the form data
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

// Define the validation rules for each field
const firstNameValidatorOptions = {
  required: true,
  regex: /^[\p{L}][\p{L} '-]*[\p{L}]$/u,
  label: "First name",
};

const lastNameValidatorOptions = {
  required: true,
  regex: /^[\p{L}][\p{L} '-]*[\p{L}]$/u,
  label: "Last name",
};

const emailValidatorOptions = {
  required: true,
  regex:
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|icloud\.com|me\.com|apple\.com|yahoo\.com)$/,
  label: "Email",
};

const passwordValidatorOptions = {
  required: true,
  regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{7,}$/,
  label: "Password",
};

const handleFormSubmit = (): void => {
  localStorage.setItem("userData", JSON.stringify(formData.value));
  console.log(
    "localStorage",
    JSON.parse(localStorage.getItem("userData") || "")
  );
};
</script>

<style scoped>
/* Your styles here */
</style>
