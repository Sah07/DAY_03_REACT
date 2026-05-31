import {
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

export default function ReportsPanel({ reportData }) {
  const summary = reportData?.summary || {}
  const latestFarmers = reportData?.latestFarmers || []
  const latestRequests = reportData?.latestRequests || []

  const cards = [
    {
      label: 'Total Farmers',
      value: summary.totalFarmers || 0,
    },
    {
      label: 'Total Crops',
      value: summary.totalCrops || 0,
    },
    {
      label: 'Inventory Items',
      value: summary.totalInventoryItems || 0,
    },
    {
      label: 'Total Requests',
      value: summary.totalRequests || 0,
    },
    {
      label: 'Pending or Review',
      value: summary.pendingOrReviewRequests || 0,
    },
  ]

  return (
    <div>
      <CRow className="g-3 mb-4">
        {cards.map((card) => (
          <CCol lg={3} md={6} key={card.label}>
            <CCard className="card-shadow">
              <CCardBody>
                <div className="text-medium-emphasis">{card.label}</div>
                <h3 className="fw-bold mt-2 mb-0">{card.value}</h3>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CRow className="g-4">
        <CCol lg={6}>
          <CCard className="card-shadow">
            <CCardBody>
              <CCardTitle className="text-success fw-bold">Latest Farmers</CCardTitle>
              <CTable responsive hover bordered>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Crop</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {latestFarmers.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="3" className="text-center">No farmer records</CTableDataCell>
                    </CTableRow>
                  )}

                  {latestFarmers.map((farmer) => (
                    <CTableRow key={farmer.id}>
                      <CTableDataCell>{farmer.farmer_name}</CTableDataCell>
                      <CTableDataCell>{farmer.crop || '-'}</CTableDataCell>
                      <CTableDataCell>{farmer.status}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={6}>
          <CCard className="card-shadow">
            <CCardBody>
              <CCardTitle className="text-success fw-bold">Latest Requests</CCardTitle>
              <CTable responsive hover bordered>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Priority</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {latestRequests.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="3" className="text-center">No request records</CTableDataCell>
                    </CTableRow>
                  )}

                  {latestRequests.map((requestItem) => (
                    <CTableRow key={requestItem.id}>
                      <CTableDataCell>{requestItem.request_title}</CTableDataCell>
                      <CTableDataCell>{requestItem.priority}</CTableDataCell>
                      <CTableDataCell>{requestItem.status}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
