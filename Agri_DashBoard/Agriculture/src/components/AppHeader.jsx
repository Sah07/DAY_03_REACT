import {
  CHeader,
  CHeaderBrand,
} from '@coreui/react'

export default function AppHeader({ title = 'Dashboard' }) {

  return (
    <CHeader className="top-header px-4 text-white">

      <CHeaderBrand className="text-white fw-bold">
        {title}
      </CHeaderBrand>

      

      <div className="ms-auto d-flex align-items-center gap-4">
      
        <i className="cil-bell fs-5"></i>

        <CHeaderBrand className="text-white fw-bold">
        Admin
      </CHeaderBrand>

      
    </div>

    </CHeader>
  )
}