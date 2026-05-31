import { useEffect, useMemo, useState } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CForm,
  CFormCheck,
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

const initialForm = {
  full_name: '',
  email: '',
  is_active: true,
  role_ids: [],
}

export default function UserManager({ users, roles, onCreate, onUpdate, onDelete, loading }) {
  const [form, setForm] = useState(initialForm)
  const [editingUser, setEditingUser] = useState(null)
  const [error, setError] = useState('')

  const roleByName = useMemo(() => {
    const map = new Map()
    roles.forEach((role) => {
      map.set(role.role_name, role.id)
    })
    return map
  }, [roles])

  useEffect(() => {
    if (!editingUser) {
      return
    }

    const selectedRoleIds = (editingUser.roles || [])
      .map((roleName) => roleByName.get(roleName))
      .filter(Boolean)
      .map((id) => String(id))

    setForm({
      full_name: editingUser.full_name || '',
      email: editingUser.email || '',
      is_active: Boolean(editingUser.is_active),
      role_ids: selectedRoleIds,
    })
  }, [editingUser, roleByName])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleRoleChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value)

    setForm((current) => ({
      ...current,
      role_ids: selectedValues,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.full_name.trim() || !form.email.trim()) {
      setError('Full name and email are required')
      return
    }

    const payload = {
      full_name: form.full_name,
      email: form.email,
      is_active: form.is_active,
      role_ids: form.role_ids.map((id) => Number(id)),
    }

    if (editingUser) {
      await onUpdate(editingUser.id, payload)
      setEditingUser(null)
    } else {
      await onCreate(payload)
    }

    setForm(initialForm)
  }

  const startEdit = (user) => {
    setEditingUser(user)
  }

  const cancelEdit = () => {
    setEditingUser(null)
    setForm(initialForm)
    setError('')
  }

  return (
    <CRow className="g-4">
      <CCol lg={4}>
        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              {editingUser ? 'Edit User' : 'Add User'}
            </CCardTitle>

            {error && <CAlert color="danger">{error}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Full Name</label>
                <CFormInput
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <CFormInput
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label>Assign Roles</label>
                <CFormSelect
                  multiple
                  name="role_ids"
                  value={form.role_ids}
                  onChange={handleRoleChange}
                  style={{ minHeight: 120 }}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={String(role.id)}>
                      {role.role_name}
                    </option>
                  ))}
                </CFormSelect>
                <small className="text-muted">Hold Ctrl to select multiple roles.</small>
              </div>

              <div className="mb-3">
                <CFormCheck
                  id="is-active"
                  label="User is active"
                  checked={form.is_active}
                  onChange={(event) => {
                    setForm((current) => ({
                      ...current,
                      is_active: event.target.checked,
                    }))
                  }}
                />
              </div>

              <div className="d-flex gap-2">
                <CButton color="success" type="submit" disabled={loading}>
                  {editingUser ? 'Update User' : 'Save User'}
                </CButton>

                {editingUser && (
                  <CButton color="secondary" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </CButton>
                )}
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol lg={8}>
        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              Users
            </CCardTitle>

            <CTable responsive hover bordered>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Roles</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {users.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan="6" className="text-center">No users found</CTableDataCell>
                  </CTableRow>
                )}

                {users.map((user, index) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{user.full_name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={user.is_active ? 'success' : 'secondary'}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex flex-wrap gap-1">
                        {(user.roles || []).map((roleName) => (
                          <CBadge key={`${user.id}-${roleName}`} color="info">
                            {roleName}
                          </CBadge>
                        ))}
                        {(user.roles || []).length === 0 && '-'}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton size="sm" color="warning" variant="outline" onClick={() => startEdit(user)}>
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" variant="outline" onClick={() => onDelete(user.id)}>
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
      </CCol>
    </CRow>
  )
}
