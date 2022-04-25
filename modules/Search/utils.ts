import { IFilterConfig } from './interfaces'

export const getConfigWithoutDefaults = (config: IFilterConfig) => {
  return Object.fromEntries(
    Object.entries(config).filter(([key, value]) => {
      if (typeof value === 'object') {
        if (value.length) return true
      } else if (value) return true
      return false
    })
  )
}
