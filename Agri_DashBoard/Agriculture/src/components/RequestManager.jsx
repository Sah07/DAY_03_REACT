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
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const initialForm = {
  request_title: '',
  request_type: '',
  requested_by: '',
  priority: 'Medium',
  status: 'Pending',
  notes: '',
}

export default function RequestManager({ requests, onCreate, onUpdate, onDelete, loading }) {
  const [form, setForm] = useState(initialForm)
  const [editingRequest, setEditingRequest] = useState(null)
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

    if (!form.request_title.trim()) {
      setError('Request title is required')
      return
    }

    if (editingRequest) {
      await onUpdate(editingRequest.id, form)
      setEditingRequest(null)
    } else {
      await onCreate(form)
    }

    setForm(initialForm)
  }

  const handleEdit = (requestItem) => {
    setEditingRequest(requestItem)
    setForm({
      request_title: requestItem.request_title || '',
      request_type: requestItem.request_type || '',
      requested_by: requestItem.requested_by || '',
      priority: requestItem.priority || 'Medium',
      status: requestItem.status || 'Pending',
      notes: requestItem.notes || '',
    })
  }

  const statusColor = (status) => {
    if (status === 'Completed') {
      return 'success'
    }

    if (status === 'Under Review') {
      return 'warning'
    }

    return 'info'
  }

  return (
    <CRow className="g-4">
      <CCol lg={4}>
        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              {editingRequest ? 'Edit Request' : 'Create Request'}
            </CCardTitle>

            {error && <CAlert color="danger">{error}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <CFormInput name="request_title" value={form.request_title} onChange={handleChange} placeholder="Enter request title" />
              </div>

              <div className="mb-3">
                <label>Type</label>
                <CFormInput name="request_type" value={form.request_type} onChange={handleChange} placeholder="Enter request type" />
              </div>

              <div className="mb-3">
                <label>Requested By</label>
                <CFormInput name="requested_by" value={form.requested_by} onChange={handleChange} placeholder="Enter requester" />
              </div>

              <div className="mb-3">
                <label>Priority</label>
                <CFormSelect name="priority" value={form.priority} onChange={handleChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </CFormSelect>
              </div>

              <div className="mb-3">
                <label>Status</label>
                <CFormSelect name="status" value={form.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </CFormSelect>
              </div>

              <div className="mb-3">
                <label>Notes</label>
                <CFormTextarea rows={3} name="notes" value={form.notes} onChange={handleChange} placeholder="Enter notes" />
              </div>

              <div className="d-flex gap-2">
                <CButton color="success" type="submit" disabled={loading}>
                  {editingRequest ? 'Update Request' : 'Save Request'}
                </CButton>

                {editingRequest && (
                  <CButton
                    color="secondary"
                    variant="outline"
                    onClick={() => {
                      setEditingRequest(null)
                      setForm(initialForm)
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
      </CCol>

      <CCol lg={8}>
        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              Service Requests
            </CCardTitle>

            <CTable responsive hover bordered>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>Requested By</CTableHeaderCell>
                  <CTableHeaderCell>Priority</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {requests.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan="7" className="text-center">No requests found</CTableDataCell>
                  </CTableRow>
                )}

                {requests.map((requestItem, index) => (
                  <CTableRow key={requestItem.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{requestItem.request_title}</CTableDataCell>
                    <CTableDataCell>{requestItem.request_type || '-'}</CTableDataCell>
                    <CTableDataCell>{requestItem.requested_by || '-'}</CTableDataCell>
                    <CTableDataCell>{requestItem.priority || '-'}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={statusColor(requestItem.status)}>{requestItem.status}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton size="sm" color="warning" variant="outline" onClick={() => handleEdit(requestItem)}>
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" variant="outline" onClick={() => onDelete(requestItem.id)}>
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
