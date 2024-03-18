<template>
  <div class="container">
    <h4>All Jobs:</h4>
  </div>
  <div class="container">
    <ul>
      <li v-for="job in sortedJobs" :key="job.jobId">
        <p>
          {{ job.jobtitle }}, is {{ job.jobPayType }} paid job, its hourly pay is
          {{ job.hourlyPay ? parseFloat(job.hourlyPay).toFixed(2) : '' }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from '../../DATA/data.js'

const tasksStore = useTasksStore()

const sortedJobs = computed(() => {
  return tasksStore.jobs.slice().sort((a, b) => {
    const hourlyPayA = parseFloat(a.hourlyPay)
    const hourlyPayB = parseFloat(b.hourlyPay)

    if (isNaN(hourlyPayA)) return 1
    if (isNaN(hourlyPayB)) return -1

    return hourlyPayB - hourlyPayA
  })
})
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
