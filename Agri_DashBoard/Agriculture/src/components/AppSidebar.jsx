import {
  CSidebar,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavLink,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilSpeedometer,
  cilPeople,
  cilLeaf,
  cilStorage,
  cilDescription,
  cilChart,
  cilSettings,
  cilUser,
  cilLockLocked,
} from '@coreui/icons'

export default function AppSidebar({ activeSection = 'dashboard', onSectionChange }) {
  const handleSectionChange = (section) => {
    if (typeof onSectionChange === 'function') {
      onSectionChange(section)
    }
  }

  const handleDashboardClick = () => {
    handleSectionChange('dashboard')
  }

  const handleFarmersClick = () => {
    handleSectionChange('farmers')
  }

  const handleCropsClick = () => {
    handleSectionChange('crops')
  }

  const handleInventoryClick = () => {
    handleSectionChange('inventory')
  }

  const handleRequestsClick = () => {
    handleSectionChange('requests')
  }

  const handleReportsClick = () => {
    handleSectionChange('reports')
  }

  const handleUsersClick = () => {
    handleSectionChange('users')
  }

  const handleRolesClick = () => {
    handleSectionChange('roles')
  }

  const handleSettingsClick = () => {
    handleSectionChange('settings')
  }

  return (
    <CSidebar visible className="sidebar-custom bg-green">

    <div className='bg-success text-white p-3 d-flex align-items-center gap-2'>
      <h2 className='text-white fw-bold fs-4'>Agriculture System</h2>
    </div>
     

      <CSidebarNav>

        <CNavItem>
          <CNavLink
            active={activeSection === 'dashboard'}
            onClick={handleDashboardClick}
          >
            <CIcon icon={cilSpeedometer} className="me-2" />
            Dashboard
          </CNavLink>
        </CNavItem>

        <CNavTitle>MANAGEMENT</CNavTitle>

        <CNavItem>
          <CNavLink
            active={activeSection === 'farmers'}
            onClick={handleFarmersClick}
          >
            <CIcon icon={cilPeople} className="me-2" />
            Farmers
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            active={activeSection === 'crops'}
            onClick={handleCropsClick}
          >
            <CIcon icon={cilLeaf} className="me-2" />
            Crops
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            active={activeSection === 'inventory'}
            onClick={handleInventoryClick}
          >
            <CIcon icon={cilStorage} className="me-2" />
            Inventory
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            active={activeSection === 'requests'}
            onClick={handleRequestsClick}
          >
            <CIcon icon={cilDescription} className="me-2" />
            Requests
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            active={activeSection === 'reports'}
            onClick={handleReportsClick}
          >
            <CIcon icon={cilChart} className="me-2" />
            Reports
          </CNavLink>
        </CNavItem>

        <CNavTitle>SYSTEM</CNavTitle>

        <CNavItem>
          <CNavLink
            active={activeSection === 'users'}
            onClick={handleUsersClick}
          >
            <CIcon icon={cilUser} className="me-2" />
            Users
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            active={activeSection === 'roles'}
            onClick={handleRolesClick}
          >
            <CIcon icon={cilLockLocked} className="me-2" />
            Roles & Permissions
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            active={activeSection === 'settings'}
            onClick={handleSettingsClick}
          >
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
        <CNavItem>
          <CNavLink>
            <CIcon icon={cilLockLocked} className="me-6" />
            Log out
          </CNavLink>
        </CNavItem>
    </CSidebar>
  )
}