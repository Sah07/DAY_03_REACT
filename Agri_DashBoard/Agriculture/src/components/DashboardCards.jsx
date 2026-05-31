
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CListGroup,
  CListGroupItem,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilPeople,
  cilLeaf,
  cilClock,
  cilWarning,
  cilStorage,
  cilDescription,
  cilArrowRight,
} from '@coreui/icons'

export default function DashboardCards({
  totalFarmers,
  totalCrops,
  pendingRequests,
  underReview,
  farmers = [],
  inventory = [],
  requests = [],
  onNavigate,
}) {
  const cards = [
    {
      title: 'Total Farmers',
      value: totalFarmers,
      color: 'success',
      icon: cilPeople,
    },
    {
      title: 'Active Crops',
      value: totalCrops,
      color: 'primary',
      icon: cilLeaf,
    },
    {
      title: 'Pending requests',
      value: pendingRequests,
      color: 'warning',
      icon: cilClock,
    },
    {
      title: 'Under Review',
      value: underReview,
      color: 'danger',
      icon: cilWarning,
    },
  ]

  const latestFarmers = [...farmers].slice(-5).reverse()
  const latestRequests = [...requests].slice(-5).reverse()

  const availableItems = inventory.filter((item) => item.status === 'Available').length
  const lowStockItems = inventory.filter((item) => item.status === 'Low Stock').length
  const outOfStockItems = inventory.filter((item) => item.status === 'Out of Stock').length
  const totalInventory = inventory.length || 1

  const sectionActions = [
    { label: 'Manage Farmers', section: 'farmers', icon: cilPeople },
    { label: 'Manage Crops', section: 'crops', icon: cilLeaf },
    { label: 'Manage Inventory', section: 'inventory', icon: cilStorage },
    { label: 'Manage Requests', section: 'requests', icon: cilDescription },
  ]

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
    <>
      <CRow>
        {cards.map((card, index) => (
          <CCol lg={3} md={6} key={index}>
            <CCard className="card-shadow mb-4">
              <CCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-medium-emphasis">{card.title}</div>
                    <h2 className="fw-bold mt-2">{card.value}</h2>
                  </div>
                  <div className={`stats-icon bg-${card.color}`}>
                    <CIcon icon={card.icon} size="xl" />
                  </div>
                </div>
                <div className="mt-3 text-success small">+12% from last month</div>
                <CProgress value={75} color={card.color} className="progress-custom mt-3" />
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CRow className="g-4">
        <CCol lg={4}>
          <CCard className="card-shadow h-100">
            <CCardBody>
              <CCardTitle className="fw-bold text-success mb-3">Quick Actions</CCardTitle>
              <div className="d-grid gap-2">
                {sectionActions.map((action) => (
                  <CButton
                    key={action.section}
                    color="success"
                    variant="outline"
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => onNavigate?.(action.section)}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <CIcon icon={action.icon} />
                      {action.label}
                    </span>
                    <CIcon icon={cilArrowRight} />
                  </CButton>
                ))}
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={8}>
          <CCard className="card-shadow h-100">
            <CCardBody>
              <CCardTitle className="fw-bold text-success mb-3">Recent Farmers</CCardTitle>
              <CTable responsive hover>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Crop</CTableHeaderCell>
                    <CTableHeaderCell>Location</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {latestFarmers.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="4" className="text-center">
                        No farmer records available
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {latestFarmers.map((farmer) => (
                    <CTableRow key={farmer.id}>
                      <CTableDataCell>{farmer.farmer_name}</CTableDataCell>
                      <CTableDataCell>{farmer.crop || '-'}</CTableDataCell>
                      <CTableDataCell>{farmer.location || '-'}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={farmer.status === 'Active' ? 'success' : 'secondary'}>
                          {farmer.status || 'Unknown'}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={6}>
          <CCard className="card-shadow h-100">
            <CCardBody>
              <CCardTitle className="fw-bold text-success mb-3">Inventory Health</CCardTitle>

              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Available</span>
                  <span>{availableItems}</span>
                </div>
                <CProgress value={(availableItems / totalInventory) * 100} color="success" className="progress-custom" />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Low Stock</span>
                  <span>{lowStockItems}</span>
                </div>
                <CProgress value={(lowStockItems / totalInventory) * 100} color="warning" className="progress-custom" />
              </div>

              <div>
                <div className="d-flex justify-content-between small mb-1">
                  <span>Out of Stock</span>
                  <span>{outOfStockItems}</span>
                </div>
                <CProgress value={(outOfStockItems / totalInventory) * 100} color="danger" className="progress-custom" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={6}>
          <CCard className="card-shadow h-100">
            <CCardBody>
              <CCardTitle className="fw-bold text-success mb-3">Latest Requests</CCardTitle>
              <CListGroup flush>
                {latestRequests.length === 0 && (
                  <CListGroupItem className="text-center text-medium-emphasis">
                    No requests available
                  </CListGroupItem>
                )}

                {latestRequests.map((requestItem) => (
                  <CListGroupItem key={requestItem.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{requestItem.request_title}</div>
                      <div className="small text-medium-emphasis">{requestItem.requested_by || 'Unknown requester'}</div>
                    </div>
                    <CBadge color={statusColor(requestItem.status)}>{requestItem.status}</CBadge>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

