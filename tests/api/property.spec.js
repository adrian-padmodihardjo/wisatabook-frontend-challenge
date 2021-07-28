import _chunk from 'lodash/chunk'
import apiClient from '@/api-client/main'
import { mockApiClient } from '@/api-client/main.mock'
import { getDetails, getImages } from '@/api/property'
import propertyDetails from '@/mocks/property-details.mock.json'

describe('main API client', () => {
  describe('axios mock adapter', () => {
    beforeEach(() => {
      mockApiClient(apiClient)
    })
    test('return property details data', (done) => {
      getDetails('12345678')
        .then((res) => {
          expect(res.data).toEqual(
            expect.objectContaining({
              id: expect.anything(),
              name: expect.any(String),
              name_full: expect.any(String),
              catalog_data: expect.anything(),
            }),
          )
          done()
        })
        .catch(done)
    })

    test('correctly paginate images data', (done) => {
      const chunkSize = 9
      const chunks = _chunk(propertyDetails.images, chunkSize)
      const promises = chunks.map((chunk, i) => {
        return getImages('12345678', {
          page: i + 1,
          limit: chunkSize,
        }).then((res) => {
          expect(res.data).toEqual(expect.any(Array))
          expect(res.data).toEqual(expect.arrayContaining(chunk))
        })
      })
      Promise.all(promises)
        .then(() => done())
        .catch(done)
    })

    describe('correctly filter images by caption', () => {
      const captions = [
        'Featured Image',
        'Room',
        'Lobby',
      ]

      const chunkSize = 9
      for (const caption of captions) {
        const filtered = propertyDetails.images.filter((img) => {
          return img.caption === caption
        })
        const chunks = _chunk(filtered, chunkSize)
        test(`correctly filter images with "${caption}" caption`, (done) => {
          const promises = chunks.map((chunk, i) => {
            return getImages('1234567', {
              page: i + 1,
              limit: chunkSize,
              caption,
            }).then((res) => {
              res.data.forEach((img) => {
                expect(img).toEqual(
                  expect.objectContaining({ caption }),
                )
              })
            })
          })
          Promise.all(promises)
            .then(() => done())
            .catch(done)
        })
      }
    })
  })
})
