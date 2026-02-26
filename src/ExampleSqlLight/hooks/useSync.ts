import { useEffect } from 'react'
import { startSyncListener } from '../services/syncService'

export const useSync = () => {
  useEffect(() => {
    startSyncListener()
  }, [])
}
