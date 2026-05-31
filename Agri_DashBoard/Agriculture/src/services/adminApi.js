import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const fetchFarmers = async () => {
  const { data } = await api.get('/farmers')
  return data
}

export const createFarmer = async (payload) => {
  await api.post('/farmers', payload)
}

export const fetchCrops = async () => {
  const { data } = await api.get('/crops')
  return data
}

export const createCrop = async (payload) => {
  await api.post('/crops', payload)
}

export const updateCrop = async (id, payload) => {
  await api.put(`/crops/${id}`, payload)
}

export const deleteCrop = async (id) => {
  await api.delete(`/crops/${id}`)
}

export const fetchInventory = async () => {
  const { data } = await api.get('/inventory')
  return data
}

export const createInventoryItem = async (payload) => {
  await api.post('/inventory', payload)
}

export const updateInventoryItem = async (id, payload) => {
  await api.put(`/inventory/${id}`, payload)
}

export const deleteInventoryItem = async (id) => {
  await api.delete(`/inventory/${id}`)
}

export const fetchRequests = async () => {
  const { data } = await api.get('/requests')
  return data
}

export const createRequest = async (payload) => {
  await api.post('/requests', payload)
}

export const updateRequest = async (id, payload) => {
  await api.put(`/requests/${id}`, payload)
}

export const deleteRequest = async (id) => {
  await api.delete(`/requests/${id}`)
}

export const fetchReportsSummary = async () => {
  const { data } = await api.get('/reports/summary')
  return data
}

export const fetchUsers = async () => {
  const { data } = await api.get('/users')
  return data
}

export const createUser = async (payload) => {
  const { data } = await api.post('/users', payload)
  return data
}

export const updateUser = async (id, payload) => {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`)
  return data
}

export const assignUserRoles = async (userId, roleIds) => {
  const { data } = await api.put(`/users/${userId}/roles`, {
    role_ids: roleIds,
  })
  return data
}

export const fetchRoles = async () => {
  const { data } = await api.get('/roles')
  return data
}

export const createRole = async (payload) => {
  const { data } = await api.post('/roles', payload)
  return data
}

export const updateRole = async (id, payload) => {
  const { data } = await api.put(`/roles/${id}`, payload)
  return data
}

export const deleteRole = async (id) => {
  const { data } = await api.delete(`/roles/${id}`)
  return data
}

export const fetchPermissions = async () => {
  const { data } = await api.get('/permissions')
  return data
}

export const createPermission = async (payload) => {
  const { data } = await api.post('/permissions', payload)
  return data
}

export const deletePermission = async (id) => {
  const { data } = await api.delete(`/permissions/${id}`)
  return data
}

export const assignRolePermissions = async (roleId, permissionIds) => {
  const { data } = await api.put(`/roles/${roleId}/permissions`, {
    permission_ids: permissionIds,
  })
  return data
}

export const fetchSettings = async () => {
  const { data } = await api.get('/settings')
  return data
}

export const updateSettings = async (settings) => {
  const { data } = await api.put('/settings', {
    settings,
  })
  return data
}
