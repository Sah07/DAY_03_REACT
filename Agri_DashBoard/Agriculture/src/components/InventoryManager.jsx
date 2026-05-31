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
  item_name: '',
  category: '',
  quantity: 0,
  unit: 'kg',
  status: 'Available',
}

export default function InventoryManager({ items, onCreate, onUpdate, onDelete, loading }) {
  const [form, setForm] = useState(initialForm)
  const [editingItem, setEditingItem] = useState(null)
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

    if (!form.item_name.trim()) {
      setError('Item name is required')
      return
    }

    const payload = {
      item_name: form.item_name,
      category: form.category,
      quantity: Number(form.quantity || 0),
      unit: form.unit,
      status: form.status,
    }

    if (editingItem) {
      await onUpdate(editingItem.id, payload)
      setEditingItem(null)
    } else {
      await onCreate(payload)
    }

    setForm(initialForm)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setForm({
      item_name: item.item_name || '',
      category: item.category || '',
      quantity: item.quantity || 0,
      unit: item.unit || 'kg',
      status: item.status || 'Available',
    })
  }

  return (
    <CRow className="g-4">
      <CCol lg={4}>
        <CCard className="card-shadow">
          <CCardBody>
            <CCardTitle className="text-success fw-bold mb-3">
              {editingItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
            </CCardTitle>

            {error && <CAlert color="danger">{error}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Item Name</label>
                <CFormInput name="item_name" value={form.item_name} onChange={handleChange} placeholder="Enter item name" />
              </div>

              <div className="mb-3">
                <label>Category</label>
                <CFormInput name="category" value={form.category} onChange={handleChange} placeholder="Enter category" />
              </div>

              <div className="mb-3">
                <label>Quantity</label>
                <CFormInput type="number" min="0" name="quantity" value={form.quantity} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label>Unit</label>
                <CFormSelect name="unit" value={form.unit} onChange={handleChange}>
                  <option value="kg">kg</option>
                  <option value="litre">litre</option>
                  <option value="packet">packet</option>
                  <option value="piece">piece</option>
                </CFormSelect>
              </div>

              <div className="mb-3">
                <label>Status</label>
                <CFormSelect name="status" value={form.status} onChange={handleChange}>
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </CFormSelect>
              </div>

              <div className="d-flex gap-2">
                <CButton color="success" type="submit" disabled={loading}>
                  {editingItem ? 'Update Item' : 'Save Item'}
                </CButton>

                {editingItem && (
                  <CButton
                    color="secondary"
                    variant="outline"
                    onClick={() => {
                      setEditingItem(null)
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
              Inventory List
            </CCardTitle>

            <CTable responsive hover bordered>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Item</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Quantity</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {items.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan="6" className="text-center">No inventory items found</CTableDataCell>
                  </CTableRow>
                )}

                {items.map((item, index) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{item.item_name}</CTableDataCell>
                    <CTableDataCell>{item.category || '-'}</CTableDataCell>
                    <CTableDataCell>{item.quantity} {item.unit}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge
                        color={
                          item.status === 'Available'
                            ? 'success'
                            : item.status === 'Low Stock'
                              ? 'warning'
                              : 'danger'
                        }
                      >
                        {item.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton size="sm" color="warning" variant="outline" onClick={() => handleEdit(item)}>
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" variant="outline" onClick={() => onDelete(item.id)}>
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
