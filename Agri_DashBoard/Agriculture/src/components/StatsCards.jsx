import {
  CRow,
  CCol,
  CCard,
  CCardBody,
} from '@coreui/react'

export default function StatsCards({
  totalFarmers,
}) {

  const cards = [
    {
      title: 'Total Farmers',
      value: totalFarmers,
      color: 'success',
    },
    {
      title: 'Active Crops',
      value: 58,
      color: 'primary',
    },
    {
      title: 'Pending Requests',
      value: 24,
      color: 'warning',
    },
    {
      title: 'Low Stock Alerts',
      value: 12,
      color: 'danger',
    },
  ]

  return (
    <CRow>

      {cards.map((card, index) => (

        <CCol lg={3} md={6} key={index}>

          <CCard className="shadow-sm border-0 mb-4">

            <CCardBody>

              <h6>{card.title}</h6>

              <h2 className="fw-bold">
                {card.value}
              </h2>

              <div
                className={`bg-${card.color} mt-3`}
                style={{
                  height: '6px',
                  borderRadius: '20px',
                }}
              ></div>

            </CCardBody>

          </CCard>

        </CCol>

      ))}

    </CRow>
  )
}