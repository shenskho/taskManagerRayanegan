import { useMemo } from 'react'
import { defineAbilityFor } from '@configs/ability'
import useAuth from './useAuth'

const useAbility = () => {
  const { role } = useAuth()
  return useMemo(() => defineAbilityFor(role || 'guest'), [role])
}

export default useAbility
