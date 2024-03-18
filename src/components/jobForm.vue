<template>
  <form @submit.prevent="saveJob">
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label class="form-label" for="jobname">Enter the name of your job</label>
      </div>
      <div class="col-auto">
        <input id="jobname" type="text" v-model="jobname" />
      </div>
    </div>

    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label for="paytype">Select what pay type job offers:</label>
      </div>
      <div class="col-auto">
        <select id="paytype" v-model="paytype">
          <option v-for="jobPayType in jobPayTypes" :value="jobPayType" :key="jobPayType">
            {{ jobPayType }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="paytype !== 'inconsistent'">
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="payamout">Enter your {{ paytype }} pay amount:</label>
        </div>
        <div class="col-auto">
          <input id="payamout" type="number" v-model.number="payamout" />
        </div>
      </div>
    </div>
    <br />
    <div class="alignbutton">
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </form>
</template>

<script>
import { useTasksStore } from '../../DATA/data.js'
import { computed, ref } from 'vue'

export default {
  setup() {
    const tasksStore = useTasksStore()
    const jobname = ref('')
    const paytype = ref('')
    const payamout = ref('')

    const isFormValid = computed(() => {
      return (
        jobname.value.trim() !== '' &&
        paytype.value !== '' &&
        (paytype.value === 'inconsistent' || payamout.value > 0)
      )
    })

    const jobPayTypes = computed(() => tasksStore.jobPayType)

    const calculateHourlyPay = (payType, payAmount) => {
      switch (payType) {
        case 'yearly':
          return payAmount / 1045
        case 'in the quarter of the year':
          return payAmount / 260
        case 'monthly':
          return payAmount / 87
        case 'weekly':
          return payAmount / 40
        case 'daily':
          return payAmount / 12
        case 'hourly':
          return payAmount
        case 'inconsistent':
          return 0
        default:
          return 0
      }
    }

    const saveJob = () => {
      console.log(isFormValid.value)
      if (!isFormValid.value) {
        alert('Please fill in all required fields.')

        return
      }

      let payAmount = paytype.value === 'inconsistent' ? 0 : parseFloat(payamout.value)
      if (isNaN(payAmount)) {
        payAmount = 0
      }

      const hourlyPay = calculateHourlyPay(paytype.value, payAmount)

      const newJob = {
        jobtitle: jobname.value,
        jobPayType: paytype.value,
        jobpayAmount: paytype.value !== 'inconsistent' ? payAmount : 0,
        jobStats: 'active',
        hourlyPay: hourlyPay
      }

      tasksStore.addJob(newJob)
      jobname.value = ''
      paytype.value = ''
      payamout.value = ''
    }

    return { jobname, paytype, payamout, jobPayTypes, saveJob, isFormValid }
  }
}

//10
//30quality
//
</script>

<style scoped>
.formbox,
h3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.alignbutton {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
