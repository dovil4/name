import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import YourComponent from './jobForm.vue'
import { useTasksStore } from '../../../DATA/data.js'

vi.mock('../../DATA/data.js', () => ({
  useTasksStore: vi.fn(() => ({
    addJob: vi.fn(),
    jobPayType: [
      'yearly',
      'in the quarter of the year',
      'montly',
      'weekly',
      'daily',
      'hourly',
      'inconsistent'
    ]
  }))
}))

describe('form data saver', () => {
  it('saves the job with pay amount set to 0 for inconsistent pay type', async () => {
    const wrapper = mount(YourComponent, {})

    await wrapper.find('#jobname').setValue('Test Job')
    await wrapper.find('#paytype').setValue('inconsistent')
    expect(wrapper.find('#payamout').exists()).toBe(false)

    await wrapper.find('form').trigger('submit.prevent')

    const store = useTasksStore()
    expect(store.addJob).toHaveBeenCalledTimes(1)
    expect(store.addJob).toHaveBeenCalledWith({
      jobtitle: 'Test Job',
      jobPayType: 'inconsistent',
      jobpayAmount: 0,
      jobStats: 'active',
      hourlyPay: 0
    })
  })
})
