import { request } from '../api-client/main'

export function getDetails (propertyId) {
  return request.call(this, {
    method: 'GET',
    url: `/property-details/${propertyId}`,
  })
}

export function getImages (propertyId, params) {
  return request.call(this, {
    method: 'GET',
    url: `/property-images/${propertyId}`,
    params,
  })
}
