import MockAdapter from 'axios-mock-adapter'
import _pick from 'lodash/pick'
import _filter from 'lodash/filter'
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
  const { page, limit } = params
  const data = _filter(propertyDetails.images, (_, index) => {
    const start = (page - 1) * limit
    const end = (page * limit) - 1
    return start <= index && index <= end
  })

  return [200, data]
}

export function mockApiClient (axiosInstance) {
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
