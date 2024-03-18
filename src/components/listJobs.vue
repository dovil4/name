<template setup>
  <div v-for="job in jobs" :key="job.jobId" class="job">
    <span class="delete" @click="deleteJob(job.jobId)">&times;</span>
    <h2>{{ job.jobtitle || 'Untitled Job' }}</h2>
    <p>Pay Type: {{ job.jobPayType }}</p>
    <p v-if="job.jobPayType !== 'inconsistent'">
      <strong>Pay Amount:</strong> {{ job.jobpayAmount }}
    </p>
    <p><strong>Status:</strong> {{ job.jobStats }}</p>
    <Modal modalTitle="Edit task" btnToOpenMod="Edit" buttontoClosmod="quit" :job="job" />
  </div>
</template>

<script setup>
import { useTasksStore } from '../../DATA/data.js'
import { computed } from 'vue'
import Modal from './modal.vue'

const tasksStore = useTasksStore()
const jobs = computed(() => tasksStore.jobs)

function deleteJob(jobId) {
  tasksStore.deleteJob(jobId)
}
</script>

<style scoped>
.delete {
  font-size: 20px;
}
.jobs-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.job {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  max-width: 200px;
  overflow-wrap: break-word;
  background-color: rgb(176, 230, 212);
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
../../../DATA/data.js
