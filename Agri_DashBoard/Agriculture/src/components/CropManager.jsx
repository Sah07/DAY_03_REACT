import { useState } from 'react'
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

const initialForm = {
  crop_name: '',
  crop_type: '',
  season: '',
  status: 'Active',
}

export default function CropManager({ crops, onCreate, onUpdate, onDelete, loading }) {
  const [form, setForm] = useState(initialForm)
  const [editingCrop, setEditingCrop] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.crop_name.trim()) {
      setError('Crop name is required')
      return
    }

    const payload = {
      crop_name: form.crop_name,
      crop_type: form.crop_type,
      season: form.season,
      status: form.status,
    }

    if (editingCrop) {
      await onUpdate(editingCrop.id, payload)
      setEditingCrop(null)
    } else {
      await onCreate(payload)
    }

    setForm(initialForm)
  }

  const handleEdit = (crop) => {
    setEditingCrop(crop)
    setForm({
      crop_name: crop.crop_name || '',
      crop_type: crop.crop_type || '',
      season: crop.season || '',
      status: crop.status || 'Active',
    })
  }

  const handleCancelEdit = () => {
    setEditingCrop(null)
    setForm(initialForm)
    setError('')
  }

  return (
    <CRow className="g-4">
      <CCol lg={4}>
        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              {editingCrop ? 'Edit Crop' : 'Add Crop'}
            </CCardTitle>

            {error && <CAlert color="danger">{error}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Crop Name</label>
                <CFormInput name="crop_name" value={form.crop_name} onChange={handleChange} placeholder="Enter crop name" />
              </div>

              <div className="mb-3">
                <label>Crop Type</label>
                <CFormInput name="crop_type" value={form.crop_type} onChange={handleChange} placeholder="Enter crop type" />
              </div>

              <div className="mb-3">
                <label>Season</label>
                <CFormInput name="season" value={form.season} onChange={handleChange} placeholder="Enter season" />
              </div>

              <div className="mb-3">
                <label>Status</label>
                <CFormSelect name="status" value={form.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </CFormSelect>
              </div>

              <div className="d-flex gap-2">
                <CButton color="success" type="submit" disabled={loading}>
                  {editingCrop ? 'Update Crop' : 'Save Crop'}
                </CButton>

                {editingCrop && (
                  <CButton color="secondary" variant="outline" onClick={handleCancelEdit}>
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
              Crop List
            </CCardTitle>

            <CTable responsive hover bordered>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>Season</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {crops.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan="6" className="text-center">No crops found</CTableDataCell>
                  </CTableRow>
                )}

                {crops.map((crop, index) => (
                  <CTableRow key={crop.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{crop.crop_name}</CTableDataCell>
                    <CTableDataCell>{crop.crop_type || '-'}</CTableDataCell>
                    <CTableDataCell>{crop.season || '-'}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={crop.status === 'Active' ? 'success' : 'secondary'}>{crop.status}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton size="sm" color="warning" variant="outline" onClick={() => handleEdit(crop)}>
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" variant="outline" onClick={() => onDelete(crop.id)}>
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
