import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/api-client/main'
import { mockApiClient } from '@/api-client/main.mock'

describe('main API client', () => {
  describe('axios mock adapter', () => {
    test('successfully create mock adapter instance', () => {
      const mock = mockApiClient(apiClient)
      expect(mock).toBeInstanceOf(MockAdapter)
    })
  })
})
