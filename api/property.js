import apiClient from '../api-client/main'

export function getDetails (propertyId) {
  return apiClient({
    method: 'GET',
    url: `/property-details/${propertyId}`,
  })
}

export function getImages (propertyId, params) {
  return apiClient({
    method: 'GET',
    url: `/property-images/${propertyId}`,
    params,
  })
}
