import { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

export default function SettingsManager({ settings, onSave, loading }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setRows(
      settings.map((item) => ({
        setting_key: item.setting_key,
        setting_value: item.setting_value || '',
      }))
    )
  }, [settings])

  const updateRow = (index, field, value) => {
    setRows((current) =>
      current.map((row, rowIndex) => {
        if (rowIndex !== index) {
          return row
        }

        return {
          ...row,
          [field]: value,
        }
      })
    )
  }

  const addRow = () => {
    setRows((current) => [
      ...current,
      {
        setting_key: '',
        setting_value: '',
      },
    ])
  }

  const removeRow = (index) => {
    setRows((current) => current.filter((_row, rowIndex) => rowIndex !== index))
  }

  const saveSettings = async () => {
    setError('')

    const prepared = {}

    for (const row of rows) {
      const key = row.setting_key.trim()

      if (!key) {
        setError('Every setting row must have a key')
        return
      }

      prepared[key] = row.setting_value
    }

    await onSave(prepared)
  }

  return (
    <CCard className="card-shadow">
      <CCardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <CCardTitle className="text-success fw-bold mb-0">
            System Settings
          </CCardTitle>

          <div className="d-flex gap-2">
            <CButton color="secondary" variant="outline" onClick={addRow}>
              Add Setting
            </CButton>
            <CButton color="success" onClick={saveSettings} disabled={loading}>
              Save Settings
            </CButton>
          </div>
        </div>

        {error && <CAlert color="danger">{error}</CAlert>}

        <CTable responsive hover bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell style={{ width: '35%' }}>Setting Key</CTableHeaderCell>
              <CTableHeaderCell>Setting Value</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '120px' }}>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {rows.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan="3" className="text-center">No settings found</CTableDataCell>
              </CTableRow>
            )}

            {rows.map((row, index) => (
              <CTableRow key={`${row.setting_key || 'new'}-${index}`}>
                <CTableDataCell>
                  <CFormInput
                    value={row.setting_key}
                    placeholder="e.g. site_name"
                    onChange={(event) => updateRow(index, 'setting_key', event.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    value={row.setting_value}
                    placeholder="Value"
                    onChange={(event) => updateRow(index, 'setting_value', event.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="danger" variant="outline" onClick={() => removeRow(index)}>
                    Remove
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
