// import { useState } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardTitle,
//   CButton,
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CBadge,
//   CPagination,
//   CPaginationItem,
// } from '@coreui/react'

// export default function FarmerTable({
//   farmers,
  
// }) {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [sortOrder, setSortOrder] = useState('asc')
//   const rowsPerPage = 5

//   const sortedFarmers = [...farmers].sort((a, b) => {
//     const nameA = (a.farmer_name || '').toLowerCase()
//     const nameB = (b.farmer_name || '').toLowerCase()
//     const comparison = nameA.localeCompare(nameB)

//     return sortOrder === 'asc' ? comparison : -comparison
//   })

//   const totalPages = Math.max(
//     1,
//     Math.ceil(sortedFarmers.length / rowsPerPage)
//   )

//   const validCurrentPage = Math.min(currentPage, totalPages)
//   const startIndex = (validCurrentPage - 1) * rowsPerPage
//   const paginatedFarmers = sortedFarmers.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   )

//   const toggleNameSort = () => {
//     setSortOrder((prevOrder) =>
//       prevOrder === 'asc' ? 'desc' : 'asc'
//     )
//     setCurrentPage(1)
//   }

//   return (
//     <CCard className="card-shadow">

//       <CCardBody>

//         <div className="d-flex justify-content-between align-items-center mb-4">

//           <CCardTitle className="text-success fw-bold">
//             Registered Farmers Report
//           </CCardTitle>

//           <CButton color="success">
//             Export
//           </CButton>

//         </div>

//         <CTable hover responsive bordered>
 
//           <CTableHead color="light">

//             <CTableRow>

//               <CTableHeaderCell>ID</CTableHeaderCell>
//               <CTableHeaderCell
//                 role="button"
//                 onClick={toggleNameSort}
//                 className="user-select-none"
//               >
//                 Farmer Name {sortOrder === 'asc' ? '▲' : '▼'}
//               </CTableHeaderCell>
//               <CTableHeaderCell>Phone Number</CTableHeaderCell>
//               <CTableHeaderCell>Crop</CTableHeaderCell>
//               <CTableHeaderCell>Location</CTableHeaderCell>
//               <CTableHeaderCell>Land Size</CTableHeaderCell>
//               <CTableHeaderCell>Status</CTableHeaderCell>
             

//             </CTableRow>

//           </CTableHead>

//           <CTableBody>

//            {paginatedFarmers.map((farmer) => (

//               <CTableRow key={farmer.id}>

//                 <CTableDataCell>
//                   {farmer.id}
//                 </CTableDataCell>

//                 <CTableDataCell>
//                   {farmer.farmer_name}
//                 </CTableDataCell>

//                 <CTableDataCell>
//                   {farmer.phone_number}
//                 </CTableDataCell>

//                 <CTableDataCell>
//                   {farmer.crop}
//                 </CTableDataCell>

//                 <CTableDataCell>
//                   {farmer.location}
//                 </CTableDataCell>

//                 <CTableDataCell>
//                   {farmer.land_size}
//                 </CTableDataCell>

//                 <CTableDataCell>

//                   <CBadge color="success">
//                     {farmer.status}
//                   </CBadge>

//                 </CTableDataCell>


//               </CTableRow>

//             ))}

//           </CTableBody>

//         </CTable>

//         <div className="d-flex justify-content-end mt-3">
//           <CPagination className="mb-0" aria-label="Farmer table pagination">
//             <CPaginationItem
//               disabled={validCurrentPage === 1}
//               onClick={() =>
//                 setCurrentPage((prevPage) =>
//                   Math.max(prevPage - 1, 1)
//                 )
//               }
//             >
//               Previous
//             </CPaginationItem>

//             {Array.from({ length: totalPages }, (_, index) => {
//               const page = index + 1
//               return (
//                 <CPaginationItem
//                   key={page}
//                   active={page === validCurrentPage}
//                   onClick={() => setCurrentPage(page)}
//                 >
//                   {page}
//                 </CPaginationItem>
//               )
//             })}

//             <CPaginationItem
//               disabled={validCurrentPage === totalPages}
//               onClick={() =>
//                 setCurrentPage((prevPage) =>
//                   Math.min(prevPage + 1, totalPages)
//                 )
//               }
//             >
//               Next
//             </CPaginationItem>
//           </CPagination>
//         </div>

//       </CCardBody>

//     </CCard>
//   )
// }

import { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

export default function FarmerTable({ farmers }) {

  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('asc')
  const [selectedFarmer, setSelectedFarmer] = useState(null)

  const rowsPerPage = 5
  const sortedFarmers = [...farmers].sort((a, b) => {

    const nameA = (a.farmer_name || '').toLowerCase()
    const nameB = (b.farmer_name || '').toLowerCase()

    const comparison = nameA.localeCompare(nameB)

    return sortOrder === 'asc'
      ? comparison
      : -comparison
  })

  const totalPages = Math.max(
    1,
    Math.ceil(sortedFarmers.length / rowsPerPage)
  )

  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedFarmers = sortedFarmers.slice(
    startIndex,
    startIndex + rowsPerPage
  )
  const toggleNameSort = () => {

    setSortOrder((prev) =>
      prev === 'asc' ? 'desc' : 'asc'
    )

    setCurrentPage(1)
  }

  return (

    <CCard className="card-shadow">

      <CCardBody>
        <div className="d-flex justify-content-between align-items-center mb-4">
        <CCardTitle className="text-success fw-bold">
            Registered Farmers Report
          </CCardTitle>

          <CButton color="success">
            Export
          </CButton>

        </div>

        <CTable hover responsive bordered>

          <CTableHead color="light">

            <CTableRow>

              <CTableHeaderCell>
                #
              </CTableHeaderCell>

              <CTableHeaderCell
                role="button"
                onClick={toggleNameSort}
                className="user-select-none"
              >
                Farmer Name {sortOrder === 'asc' ? '▲' : '▼'}
              </CTableHeaderCell>

              <CTableHeaderCell>
                Phone Number
              </CTableHeaderCell>

              <CTableHeaderCell>
                Crop
              </CTableHeaderCell>

              <CTableHeaderCell>
                Location
              </CTableHeaderCell>

              <CTableHeaderCell>
                Land Size
              </CTableHeaderCell>

              <CTableHeaderCell>
                Status
              </CTableHeaderCell>

            </CTableRow>

          </CTableHead>

          <CTableBody>

            {paginatedFarmers.length > 0 ? (

              paginatedFarmers.map((farmer, index) => (

                <CTableRow
                  key={farmer.id}
                  onClick={() => setSelectedFarmer(farmer)}
                  style={{ cursor: 'pointer' }}
                >
                  <CTableDataCell>
                    {startIndex + index + 1}
                  </CTableDataCell>

                  <CTableDataCell>
                    {farmer.farmer_name}
                  </CTableDataCell>

                  <CTableDataCell>
                    {farmer.phone_number}
                  </CTableDataCell>

                  <CTableDataCell>
                    {farmer.crop}
                  </CTableDataCell>

                  <CTableDataCell>
                    {farmer.location}
                  </CTableDataCell>

                  <CTableDataCell>
                    {farmer.land_size}
                  </CTableDataCell>

                  <CTableDataCell>

                    <CBadge color="success">
                      {farmer.status}
                    </CBadge>

                  </CTableDataCell>

                </CTableRow>

              ))

            ) : (

              <CTableRow>

                <CTableDataCell
                  colSpan="7"
                  className="text-center"
                >
                  No farmers found
                </CTableDataCell>

              </CTableRow>

            )}

          </CTableBody>

        </CTable>

        <div className="d-flex justify-content-end mt-3">

          <CPagination className="mb-0">

            <CPaginationItem
              disabled={validCurrentPage === 1}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
            >
              Previous
            </CPaginationItem>

            {Array.from(
              { length: totalPages },
              (_, i) => {

                const page = i + 1

                return (

                  <CPaginationItem
                    key={page}
                    active={page === validCurrentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </CPaginationItem>

                )
              }
            )}

            <CPaginationItem
              disabled={validCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
            >
              Next
            </CPaginationItem>

          </CPagination>

        </div>

        {selectedFarmer && (

          <div className="mt-4 p-4 border rounded bg-light">

            <h4 className="text-success mb-3">
              Farmer Details
            </h4>

            <p>
              <strong>ID:</strong> {selectedFarmer.id}
            </p>

            <p>
              <strong>Name:</strong> {selectedFarmer.farmer_name}
            </p>

            <p>
              <strong>Phone:</strong> {selectedFarmer.phone_number}
            </p>

            <p>
              <strong>Crop:</strong> {selectedFarmer.crop}
            </p>

            <p>
              <strong>Location:</strong> {selectedFarmer.location}
            </p>

            <p>
              <strong>Land Size:</strong> {selectedFarmer.land_size}
            </p>

            <p>
              <strong>Status:</strong> {selectedFarmer.status}
            </p>

          </div>

        )}

      </CCardBody>

    </CCard>
  )
}