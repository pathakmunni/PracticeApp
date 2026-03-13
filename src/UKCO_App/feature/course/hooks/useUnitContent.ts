import content from '../../../assets/contentNew.json'
import { useEffect, useState } from 'react'
import { StorageService, StorageKeys } from '../../../services/StorageService'

export const useUnitContent = (unitId: string) => {

  const [unit, setUnit] = useState<any>(null)

  useEffect(() => {

    const load = async () => {

      const cached = await StorageService.get(
        StorageKeys.UNIT_BUNDLE + unitId
      )

      if (cached) {
        setUnit(cached)
        return
      }

      const unitData = content.units.find(
        u => u.unitId === unitId
      )

      setUnit(unitData)

      await StorageService.set(
        StorageKeys.UNIT_BUNDLE + unitId,
        unitData
      )
    }

    load()

  }, [unitId])

  return unit
}