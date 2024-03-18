import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import YourComponent from './DisplayEvaluation.vue'
import { useTasksStore } from '../../../DATA/data.js'

// Mock the store and its returned data
vi.mock('../../DATA/data.js', () => ({
  useTasksStore: vi.fn(() => ({
    jobs: [
      { jobId: 1, jobtitle: 'Job A', jobPayType: 'yearly', hourlyPay: 20 },
      { jobId: 2, jobtitle: 'Job B', jobPayType: 'monthly', hourlyPay: 50 },
      { jobId: 3, jobtitle: 'Job C', jobPayType: 'weekly', hourlyPay: 30 }
    ]
  }))
}))

describe('YourComponent', () => {
  it('displays jobs in decreasing hourly pay order', () => {
    const wrapper = mount(YourComponent)
    const jobParagraphs = wrapper.findAll('li > p')

    const extractedPay = jobParagraphs.map((p) =>
      parseFloat(p.text().match(/hourly pay is (\d+.\d+)/)[1])
    )

    const isSortedDescending = extractedPay.every((pay, i, arr) => i === 0 || arr[i - 1] >= pay)
    expect(isSortedDescending).toBe(true)
  })
})
