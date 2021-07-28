import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/api-client/main'
import { mockApiClient } from '@/api-client/main.mock'
import { getDetails } from '@/api/property'

describe('main API client', () => {
  describe('axios mock adapter', () => {
    test('successfully create mock adapter instance', () => {
      const mock = mockApiClient(apiClient)
      expect(mock).toBeInstanceOf(MockAdapter)
      // mock must be resetted, since next test suite assumes no mock is provided
      mock.reset()
    })

    describe('correctly use bound API client', () => {
      test('correctly use provided mocked axios instance', (done) => {
        const data = Symbol('mock')
        const instance = axios.create()
        const mock = new MockAdapter(instance)
        mock.onAny()
          .reply(200, data)

        /**
         * axiosInstance in `getDetails` should be replaced by mock,
         * since `this` context is provided via Function#call.
         */
        getDetails.call(mock, '12345678')
          .then((res) => {
            expect(res.data).toBe(data)
            done()
          })
          .catch(done)
      })

      test('correctly use provided axios instance', (done) => {
        const data = Symbol('instance')
        const instance = axios.create({})
        const mock = new MockAdapter(instance)
        mock.onAny()
          .reply(200, data)

        /**
         * axiosInstance in `getDetails` should be replaced by
         * recently created instance,
         * since `this` context is provided via Function#call.
         */
        getDetails.call(instance, '12345678')
          .then((res) => {
            expect(res.data).toBe(data)
            done()
          })
          .catch(done)
      })

      test('correctly use default axios instance', (done) => {
        /**
         * Without any `this` context provided,
         * any request should fallback using default axios instance
         * defined in '@/api-client/main.js'
         */
        // eslint-disable-next-line no-useless-call
        getDetails.call(null, '12345678')
          .then(() => {
            done(new Error('without mock, no response should be returned'))
          })
          .catch(() => {
            /**
             * 404 or error is expected, since default instance
             * actually points to nowhere
             */
            done()
          })
      })
    })
  })
})
