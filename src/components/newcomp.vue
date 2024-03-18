<template>
<template>
  <form @submit.prevent="submitForm">
    <label for="jobName">Enter your job name:</label>
    <input v-model="jobName" id="jobName" type="text" />
    <button type="submit">Submit</button>
  </form>
</template>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JobForm',
  setup() {
    const jobName = ref<string>('');

    const submitForm = () => {
      alert(`Your job name is: ${jobName.value}`);
      // Here you can handle the form submission, e.g., sending data to an API.
    };

    return {
      jobName,
      submitForm,
    };
  },
});
</script>
