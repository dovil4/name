import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import YourComponent from './modal.vue'
import { useTasksStore } from '../../../DATA/data.js'

vi.mock('../../DATA/data.js', () => ({
  useTasksStore: vi.fn(() => ({
    jobPayType: [
      'yearly',
      'in the quarter of the year',
      'monthly',
      'weekly',
      'daily',
      'hourly',
      'inconsistent'
    ],
    addJob: vi.fn(),
    updateJob: vi.fn(),
    jobs: [
      {
        jobtitle: 'New Job Title',
        jobPayType: 'weekly',
        jobpayAmount: 2000,
        hourlyPay: 12.5,
        jobId: 5,
        jobStats: 'active'
      }
    ]
  }))
}))

describe('Modal table', () => {
  it('updates old job values with new ones', async () => {
    const wrapper = mount(YourComponent, {
      props: {
        modalTitle: 'Edit Job',
        btnToOpenMod: 'Open',
        buttontoClosmod: 'Close',
        job: {
          jobname: 'singer',
          jobId: '1',
          jobtitle: 'Old Job Title',
          jobPayType: 'monthly',
          jobpayAmount: '1000'
        }
      }
    })

    await wrapper.vm.openModal()
    expect(wrapper.vm.isModalOpen).toBe(true)

    await wrapper.find('#jobname').setValue('New Job Title')
    await wrapper.find('#paytype').setValue('weekly')
    await wrapper.find('#payamount').setValue('2000')

    await wrapper.find('form').trigger('submit.prevent')

    const store = useTasksStore()
    expect(store.updateJob()).toHaveBeenCalledTimes(1)
    expect(store.updateJob).toHaveBeenCalledWith(
      expect.objectContaining({
        jobtitle: 'New Job Title',
        jobPayType: 'weekly',
        jobpayAmount: 2000,
        hourlyPay: expect.any(Number)
      })
    )
  })
})
//that is properties in pinia data store
//    jobs: [
//      {
//        jobtitle: 'New Job Title',
//        jobPayType: 'weekly',
//        jobpayAmount: 2000,
//        hourlyPay: 12.5,
//        jobId: 5,
//        jobStats: 'active'
//      }
