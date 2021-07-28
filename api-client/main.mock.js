import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import _pick from 'lodash/pick'
import propertyDetails from '../mocks/property-details.mock.json'

export function handlePropertyDetailsResponse () {
  const data = _pick(propertyDetails, [
    'id',
    'name',
    'name_full',
    'catalog_data',
  ])
  return [200, data]
}

export function handlePropertyImagesResponse ({ params } = {}) {
  const { page, limit, caption } = params
  let source = propertyDetails.images
  if (typeof caption === 'string') {
    source = source.filter((img) => {
      return img.caption === caption
    })
  }

  const data = source.filter((img, index) => {
    const start = (page - 1) * limit
    const end = (page * limit) - 1
    const hasMatchedIndex = start <= index && index <= end
    return hasMatchedIndex
  })

  return [200, data]
}

export function mockApiClient (axiosInstance = axios.create()) {
  const mock = new MockAdapter(axiosInstance)
  mock
    .onGet(/\/(property-details)\/[0-9]+\/?$/)
    .reply(handlePropertyDetailsResponse)

  mock
    .onGet(/\/(property-images)\/[0-9]+\/?$/)
    .reply(handlePropertyImagesResponse)

  return mock
}

export default mockApiClient
