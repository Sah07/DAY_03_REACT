import { useEffect, useState } from 'react'

import {
  CAlert,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'

import AppSidebar from '../components/AppSidebar'
import AppHeader from '../components/AppHeader'
import DashboardCards from '../components/DashboardCards'
import FarmerForm from '../components/FarmerForm'
import FarmerTable from '../components/FarmerTable'
import CropManager from '../components/CropManager'
import InventoryManager from '../components/InventoryManager'
import RequestManager from '../components/RequestManager'
import ReportsPanel from '../components/ReportsPanel'
import UserManager from '../components/UserManager'
import RolePermissionManager from '../components/RolePermissionManager'
import SettingsManager from '../components/SettingsManager'
import {
  fetchFarmers,
  createFarmer,
  fetchCrops,
  createCrop,
  updateCrop,
  deleteCrop,
  fetchInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  fetchRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  fetchReportsSummary,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  assignUserRoles,
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
  fetchPermissions,
  createPermission,
  deletePermission,
  assignRolePermissions,
  fetchSettings,
  updateSettings,
} from '../services/adminApi'


export default function Dashboard() {

  const [farmers, setFarmers] = useState([])
  const [crops, setCrops] = useState([])
  const [inventory, setInventory] = useState([])
  const [requests, setRequests] = useState([])
  const [reportData, setReportData] = useState(null)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [settings, setSettings] = useState([])
  const [activeSection, setActiveSection] = useState('dashboard')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadFarmers = async () => {
    const data = await fetchFarmers()
    setFarmers(data)
  }

  const loadCrops = async () => {
    const data = await fetchCrops()
    setCrops(data)
  }

  const loadInventory = async () => {
    const data = await fetchInventory()
    setInventory(data)
  }

  const loadRequests = async () => {
    const data = await fetchRequests()
    setRequests(data)
  }

  const loadReports = async () => {
    const data = await fetchReportsSummary()
    setReportData(data)
  }

  const loadUsers = async () => {
    const data = await fetchUsers()
    setUsers(data)
  }

  const loadRoles = async () => {
    const data = await fetchRoles()
    setRoles(data)
  }

  const loadPermissions = async () => {
    const data = await fetchPermissions()
    setPermissions(data)
  }

  const loadSettings = async () => {
    const data = await fetchSettings()
    setSettings(data)
  }

  const loadAll = async () => {
    setLoading(true)
    setError('')

    try {
      await Promise.all([
        loadFarmers(),
        loadCrops(),
        loadInventory(),
        loadRequests(),
        loadReports(),
        loadUsers(),
        loadRoles(),
        loadPermissions(),
        loadSettings(),
      ])
    } catch (loadError) {
      setError('Failed to load dashboard data. Please check backend server and database.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  /* ADD FARMER */

  const addFarmer = async (farmer) => {
    try {
      await createFarmer({
        farmer_name: farmer.name,
        phone_number: farmer.phone,
        crop: farmer.crop,
        location: farmer.location,
        land_size: farmer.land,
        status: 'Active',
      })

      await loadAll()
    } catch {
      setError('Unable to save farmer. Please try again.')
    }
  }

  const handleCreateCrop = async (payload) => {
    try {
      await createCrop(payload)
      await loadAll()
    } catch {
      setError('Unable to create crop. Please try again.')
    }
  }

  const handleUpdateCrop = async (id, payload) => {
    try {
      await updateCrop(id, payload)
      await loadAll()
    } catch {
      setError('Unable to update crop. Please try again.')
    }
  }

  const handleDeleteCrop = async (id) => {
    try {
      await deleteCrop(id)
      await loadAll()
    } catch {
      setError('Unable to delete crop. Please try again.')
    }
  }

  const handleCreateInventory = async (payload) => {
    try {
      await createInventoryItem(payload)
      await loadAll()
    } catch {
      setError('Unable to create inventory item. Please try again.')
    }
  }

  const handleUpdateInventory = async (id, payload) => {
    try {
      await updateInventoryItem(id, payload)
      await loadAll()
    } catch {
      setError('Unable to update inventory item. Please try again.')
    }
  }

  const handleDeleteInventory = async (id) => {
    try {
      await deleteInventoryItem(id)
      await loadAll()
    } catch {
      setError('Unable to delete inventory item. Please try again.')
    }
  }

  const handleCreateRequest = async (payload) => {
    try {
      await createRequest(payload)
      await loadAll()
    } catch {
      setError('Unable to create request. Please try again.')
    }
  }

  const handleUpdateRequest = async (id, payload) => {
    try {
      await updateRequest(id, payload)
      await loadAll()
    } catch {
      setError('Unable to update request. Please try again.')
    }
  }

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id)
      await loadAll()
    } catch {
      setError('Unable to delete request. Please try again.')
    }
  }

  const handleCreateUser = async (payload) => {
    try {
      await createUser(payload)
      await loadAll()
    } catch {
      setError('Unable to create user. Please try again.')
    }
  }

  const handleUpdateUser = async (id, payload) => {
    try {
      await updateUser(id, {
        full_name: payload.full_name,
        email: payload.email,
        is_active: payload.is_active,
      })

      await assignUserRoles(id, payload.role_ids || [])
      await loadAll()
    } catch {
      setError('Unable to update user. Please try again.')
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id)
      await loadAll()
    } catch {
      setError('Unable to delete user. Please try again.')
    }
  }

  const handleCreateRole = async (payload) => {
    try {
      const result = await createRole(payload)
      await loadAll()
      return result
    } catch {
      setError('Unable to create role. Please try again.')
      return null
    }
  }

  const handleUpdateRole = async (id, payload) => {
    try {
      await updateRole(id, payload)
      await loadAll()
    } catch {
      setError('Unable to update role. Please try again.')
    }
  }

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id)
      await loadAll()
    } catch {
      setError('Unable to delete role. Please try again.')
    }
  }

  const handleCreatePermission = async (payload) => {
    try {
      await createPermission(payload)
      await loadAll()
    } catch {
      setError('Unable to create permission. Please try again.')
    }
  }

  const handleDeletePermission = async (id) => {
    try {
      await deletePermission(id)
      await loadAll()
    } catch {
      setError('Unable to delete permission. Please try again.')
    }
  }

  const handleAssignRolePermissions = async (roleId, permissionIds) => {
    try {
      await assignRolePermissions(roleId, permissionIds)
      await loadAll()
    } catch {
      setError('Unable to update role permissions. Please try again.')
    }
  }

  const handleSaveSettings = async (settingsPayload) => {
    try {
      await updateSettings(settingsPayload)
      await loadAll()
    } catch {
      setError('Unable to save settings. Please try again.')
    }
  }

  const pageTitleMap = {
    dashboard: 'Dashboard',
    farmers: 'Farmers',
    crops: 'Crops',
    inventory: 'Inventory',
    requests: 'Requests',
    reports: 'Reports',
    users: 'Users',
    roles: 'Roles & Permissions',
    settings: 'Settings',
  }

  return (
    <div className="d-flex">

      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="main-wrapper">

        <AppHeader
          title={pageTitleMap[activeSection] || 'Dashboard'}
        />

        <CContainer fluid className="p-4">

          {error && (
            <CAlert color="danger" className="mb-3">
              {error}
            </CAlert>
          )}

          {activeSection === 'dashboard' && (
            <DashboardCards
              totalFarmers={farmers.length}
              totalCrops={crops.length}
              pendingRequests={requests.filter((item) => item.status === 'Pending').length}
              underReview={requests.filter((item) => item.status === 'Under Review').length}
              farmers={farmers}
              inventory={inventory}
              requests={requests}
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'farmers' && (
            <CRow className="mt-2">
              <CCol lg={4}>
                <FarmerForm
                  addFarmer={addFarmer}
                />
              </CCol>

              <CCol lg={8}>
                <FarmerTable
                  farmers={farmers}
                />
              </CCol>
            </CRow>
          )}

          {activeSection === 'crops' && (
            <CropManager
              crops={crops}
              onCreate={handleCreateCrop}
              onUpdate={handleUpdateCrop}
              onDelete={handleDeleteCrop}
              loading={loading}
            />
          )}

          {activeSection === 'inventory' && (
            <InventoryManager
              items={inventory}
              onCreate={handleCreateInventory}
              onUpdate={handleUpdateInventory}
              onDelete={handleDeleteInventory}
              loading={loading}
            />
          )}

          {activeSection === 'requests' && (
            <RequestManager
              requests={requests}
              onCreate={handleCreateRequest}
              onUpdate={handleUpdateRequest}
              onDelete={handleDeleteRequest}
              loading={loading}
            />
          )}

          {activeSection === 'reports' && (
            <ReportsPanel
              reportData={reportData}
            />
          )}

          {activeSection === 'users' && (
            <UserManager
              users={users}
              roles={roles}
              onCreate={handleCreateUser}
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
              loading={loading}
            />
          )}

          {activeSection === 'roles' && (
            <RolePermissionManager
              roles={roles}
              permissions={permissions}
              onCreateRole={handleCreateRole}
              onUpdateRole={handleUpdateRole}
              onDeleteRole={handleDeleteRole}
              onAssignPermissions={handleAssignRolePermissions}
              onCreatePermission={handleCreatePermission}
              onDeletePermission={handleDeletePermission}
              loading={loading}
            />
          )}

          {activeSection === 'settings' && (
            <SettingsManager
              settings={settings}
              onSave={handleSaveSettings}
              loading={loading}
            />
          )}

        </CContainer>
      </div>
    </div>
  )
}
