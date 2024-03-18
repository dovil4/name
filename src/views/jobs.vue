<template setup>
  <div class="jobs">
    <h3>Create a new job</h3>
  </div>
  <div class="container-fluid"><jobform></jobform></div>
  <div class="container-fluid"><listJobs></listJobs></div>
</template>
<script setup>
import jobform from '../components/jobForm.vue'
import listJobs from '../components/listJobs.vue'
</script>

<style>
.jobs {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container-fluid {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
}
</style>
