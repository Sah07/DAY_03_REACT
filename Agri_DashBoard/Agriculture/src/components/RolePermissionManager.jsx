import { useMemo, useState } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const initialRoleForm = {
  role_name: '',
  description: '',
  permission_ids: [],
}

const initialPermissionForm = {
  permission_key: '',
  description: '',
}

export default function RolePermissionManager({
  roles,
  permissions,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
  onAssignPermissions,
  onCreatePermission,
  onDeletePermission,
  loading,
}) {
  const [roleForm, setRoleForm] = useState(initialRoleForm)
  const [permissionForm, setPermissionForm] = useState(initialPermissionForm)
  const [editingRole, setEditingRole] = useState(null)
  const [error, setError] = useState('')

  const permissionIdByKey = useMemo(() => {
    const map = new Map()
    permissions.forEach((permission) => {
      map.set(permission.permission_key, permission.id)
    })
    return map
  }, [permissions])

  const handleRoleChange = (event) => {
    const { name, value } = event.target

    setRoleForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleRolePermissionsChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value)

    setRoleForm((current) => ({
      ...current,
      permission_ids: selectedValues,
    }))
  }

  const handleRoleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!roleForm.role_name.trim()) {
      setError('Role name is required')
      return
    }

    const payload = {
      role_name: roleForm.role_name,
      description: roleForm.description,
    }

    const permissionIds = roleForm.permission_ids.map((id) => Number(id))

    if (editingRole) {
      await onUpdateRole(editingRole.id, payload)
      await onAssignPermissions(editingRole.id, permissionIds)
      setEditingRole(null)
    } else {
      const created = await onCreateRole(payload)
      if (created?.id) {
        await onAssignPermissions(created.id, permissionIds)
      }
    }

    setRoleForm(initialRoleForm)
  }

  const startRoleEdit = (role) => {
    const selectedIds = (role.permissions || [])
      .map((permissionKey) => permissionIdByKey.get(permissionKey))
      .filter(Boolean)
      .map((id) => String(id))

    setEditingRole(role)
    setRoleForm({
      role_name: role.role_name || '',
      description: role.description || '',
      permission_ids: selectedIds,
    })
  }

  const handlePermissionSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!permissionForm.permission_key.trim()) {
      setError('Permission key is required')
      return
    }

    await onCreatePermission({
      permission_key: permissionForm.permission_key,
      description: permissionForm.description,
    })

    setPermissionForm(initialPermissionForm)
  }

  return (
    <CRow className="g-4">
      <CCol lg={5}>
        <CCard className="card-shadow mb-4">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              {editingRole ? 'Edit Role' : 'Create Role'}
            </CCardTitle>

            {error && <CAlert color="danger">{error}</CAlert>}

            <CForm onSubmit={handleRoleSubmit}>
              <div className="mb-3">
                <label>Role Name</label>
                <CFormInput
                  name="role_name"
                  value={roleForm.role_name}
                  onChange={handleRoleChange}
                  placeholder="e.g. Supervisor"
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <CFormInput
                  name="description"
                  value={roleForm.description}
                  onChange={handleRoleChange}
                  placeholder="Role description"
                />
              </div>

              <div className="mb-3">
                <label>Permissions</label>
                <CFormSelect
                  multiple
                  value={roleForm.permission_ids}
                  onChange={handleRolePermissionsChange}
                  style={{ minHeight: 130 }}
                >
                  {permissions.map((permission) => (
                    <option key={permission.id} value={String(permission.id)}>
                      {permission.permission_key}
                    </option>
                  ))}
                </CFormSelect>
                <small className="text-muted">Hold Ctrl to select multiple permissions.</small>
              </div>

              <div className="d-flex gap-2">
                <CButton color="success" type="submit" disabled={loading}>
                  {editingRole ? 'Update Role' : 'Save Role'}
                </CButton>

                {editingRole && (
                  <CButton
                    color="secondary"
                    variant="outline"
                    onClick={() => {
                      setEditingRole(null)
                      setRoleForm(initialRoleForm)
                      setError('')
                    }}
                  >
                    Cancel
                  </CButton>
                )}
              </div>
            </CForm>
          </CCardBody>
        </CCard>

        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              Create Permission
            </CCardTitle>

            <CForm onSubmit={handlePermissionSubmit}>
              <div className="mb-3">
                <label>Permission Key</label>
                <CFormInput
                  name="permission_key"
                  value={permissionForm.permission_key}
                  onChange={(event) => {
                    setPermissionForm((current) => ({
                      ...current,
                      permission_key: event.target.value,
                    }))
                  }}
                  placeholder="e.g. reports.export"
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <CFormInput
                  name="description"
                  value={permissionForm.description}
                  onChange={(event) => {
                    setPermissionForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }}
                  placeholder="Permission description"
                />
              </div>

              <CButton color="success" type="submit" disabled={loading}>Save Permission</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol lg={7}>
        <CCard className="card-shadow mb-4">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              Roles
            </CCardTitle>

            <CTable responsive hover bordered>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Permissions</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {roles.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan="5" className="text-center">No roles found</CTableDataCell>
                  </CTableRow>
                )}

                {roles.map((role, index) => (
                  <CTableRow key={role.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{role.role_name}</CTableDataCell>
                    <CTableDataCell>{role.description || '-'}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex flex-wrap gap-1">
                        {(role.permissions || []).map((permissionKey) => (
                          <CBadge color="info" key={`${role.id}-${permissionKey}`}>
                            {permissionKey}
                          </CBadge>
                        ))}
                        {(role.permissions || []).length === 0 && '-'}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton size="sm" color="warning" variant="outline" onClick={() => startRoleEdit(role)}>
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" variant="outline" onClick={() => onDeleteRole(role.id)}>
                          Delete
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              Permissions
            </CCardTitle>

            <CTable responsive hover bordered>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Key</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {permissions.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan="4" className="text-center">No permissions found</CTableDataCell>
                  </CTableRow>
                )}

                {permissions.map((permission, index) => (
                  <CTableRow key={permission.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{permission.permission_key}</CTableDataCell>
                    <CTableDataCell>{permission.description || '-'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="danger"
                        variant="outline"
                        onClick={() => onDeletePermission(permission.id)}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
