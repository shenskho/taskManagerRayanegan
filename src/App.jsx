import React, { useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import RoutesIndex from '@routes'
import AbilityContext from './core/AbilityContext'
import useAbility from '@hooks/useAbility'
import { forceLogout } from '@store/slices/authSlice'
import 'nprogress/nprogress.css'
import 'animate.css'

const App = () => {
  const ability = useAbility()
  const dispatch = useDispatch()

  useEffect(() => {
    const logoutListener = () => dispatch(forceLogout())
    const maintenanceListener = () => toast.error('سرویس در دسترس نیست')
    window.addEventListener('forceLogout', logoutListener)
    window.addEventListener('redirectMaintenance', maintenanceListener)
    return () => {
      window.removeEventListener('forceLogout', logoutListener)
      window.removeEventListener('redirectMaintenance', maintenanceListener)
    }
  }, [dispatch])

  return (
    <AbilityContext.Provider value={ability}>
      <RoutesIndex />
      <Toaster position="top-right" />
    </AbilityContext.Provider>
  )
}

export default App
