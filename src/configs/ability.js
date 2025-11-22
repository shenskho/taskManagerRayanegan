import { AbilityBuilder, createMongoAbility } from '@casl/ability'

export const defineAbilityFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

  if (role === 'admin') {
    can('manage', 'all')
  } else if (role === 'manager') {
    can(['read', 'create', 'update'], 'Report')
    can('read', 'Dashboard')
    cannot('delete', 'Report')
  } else {
    can('read', 'Dashboard')
    can('read', 'Report')
  }

  return build({ detectSubjectType: (object) => object.type || object })
}

export const ability = defineAbilityFor('guest')
