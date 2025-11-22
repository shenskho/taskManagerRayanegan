import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { forceLogout } from '@store/slices/authSlice'
import LayoutWrapper from '../components/LayoutWrapper'

const VerticalLayout = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <div className="vertical-layout">
      <Navbar color="light" light expand="md" className="shadow-sm">
        <NavbarBrand href="/">Vuexy React Admin</NavbarBrand>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink href="/dashboard">{t('dashboard')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/reports">{t('reports')}</NavLink>
          </NavItem>
          <NavItem className="ms-2">
            <Button color="danger" size="sm" onClick={() => dispatch(forceLogout())}>
              {t('logout')}
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </div>
  )
}

export default VerticalLayout
