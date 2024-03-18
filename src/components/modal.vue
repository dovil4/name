<template setup>
  <button @click="openModal(job)">{{ btnToOpenMod }}</button>
  <div v-if="isModalOpen" class="modal" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <div>{{ modalTitle }}</div>
      <form @submit.prevent="saveJob">
        <div>
          <label for="jobname">Enter the name of your job</label>
          <input id="jobname" type="text" v-model="jobname" />
        </div>
        <div>
          <label for="paytype">Select Pay type</label>
          <select id="paytype" v-model="paytype">
            <option v-for="type in jobPayTypes" :value="type" :key="type">{{ type }}</option>
          </select>
        </div>
        <div v-if="paytype !== 'inconsistent'">
          <label for="payamount"
            >Enter your <span>{{ paytype }}</span> pay amount</label
          >
          <input id="payamount" type="number" v-model="payamount" />
        </div>
        <button type="submit" :disabled="!isFormValid || !hasChanges">Save</button>
      </form>
      <button @click="closeModal">{{ buttontoClosmod }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '../../DATA/data.js'

const props = defineProps({
  modalTitle: String,
  btnToOpenMod: String,
  buttontoClosmod: String,
  job: Object
})

const tasksStore = useTasksStore()
const isModalOpen = ref(false)
const jobname = ref('')
const paytype = ref('')
const payamount = ref('')
const jobPayTypes = computed(() => tasksStore.jobPayType)

const isFormValid = computed(() => {
  const isValidPayAmount =
    paytype.value === 'inconsistent' ||
    (!isNaN(parseFloat(payamount.value)) &&
      isFinite(payamount.value) &&
      parseFloat(payamount.value) > 0)

  return jobname.value.trim() !== '' && paytype.value !== '' && isValidPayAmount
})

const hasChanges = computed(() => {
  if (!props.job || !props.job.jobId) return true
  return (
    jobname.value !== props.job.jobtitle ||
    paytype.value !== props.job.jobPayType ||
    payamount.value !== String(props.job.jobpayAmount)
  )
})

const openModal = (job = props.job) => {
  if (job && job.jobId) {
    jobname.value = job.jobtitle
    paytype.value = job.jobPayType
    payamount.value = job.jobpayAmount
  } else {
    jobname.value = ''
    paytype.value = ''
    payamount.value = ''
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveJob = () => {
  let payAmount = parseFloat(payamount.value)
  let hourlyPay = 0

  if (paytype.value === 'inconsistent') {
    payAmount = 0
    hourlyPay = 0
  } else {
    switch (paytype.value) {
      case 'yearly':
        hourlyPay = payAmount / 1045
        break
      case 'in the quarter of the year':
        hourlyPay = payAmount / 260
        break
      case 'monthly':
        hourlyPay = payAmount / 87
        break
      case 'weekly':
        hourlyPay = payAmount / 40
        break
      case 'daily':
        hourlyPay = payAmount / 12
        break
      case 'hourly':
        hourlyPay = payAmount
        break
      default:
        payAmount = 0
        hourlyPay = 0
    }
  }

  const jobDetails = {
    jobId: props.job ? props.job.jobId : Date.now(),
    jobtitle: jobname.value,
    jobPayType: paytype.value,
    jobpayAmount: payAmount,
    jobStats: 'active',
    hourlyPay
  }

  if (props.job && props.job.jobId) {
    tasksStore.updateJob(jobDetails)
  } else {
    tasksStore.addJob(jobDetails)
  }

  closeModal()
}
</script>

<style>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
