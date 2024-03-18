import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    jobs: [
      {
        jobtitle: 'New Job Title',
        jobPayType: 'weekly',
        jobpayAmount: 2000,
        hourlyPay: 12.5,
        jobId: 0,
        jobStats: 'active'
      }
    ],
    jobId: 1,
    jobPayType: [
      'yearly',
      'in the quarter of the year',
      'montly',
      'weekly',
      'daily',
      'hourly',
      'inconsistent'
    ],
    Options: ['active', 'paused']
  }),
  getters: {
    getJobsByPayType: (state) => {
      return (payType) => state.jobs.filter((job) => job.payType === payType)
    }
  },
  actions: {
    addJob(newJob) {
      const jobWithId = { ...newJob, jobId: this.jobId }
      this.jobs.push(jobWithId)
      this.jobId++
    },

    updateJob(updatedJob) {
      const index = this.jobs.findIndex((job) => job.jobId === updatedJob.jobId)
      if (index !== -1) {
        this.jobs[index] = { ...this.jobs[index], ...updatedJob }
      }
    },
    deleteJob(jobId) {
      this.jobs = this.jobs.filter((job) => job.jobId !== jobId)
    }
  }
})
