import NetInfo from '@react-native-community/netinfo'
import { store } from '../app/store'
import { sendProgressToServer } from './apiService'
import { markSynced } from '../features/progress/progressSlice'

export const startSyncListener = () => {
  NetInfo.addEventListener(async state => {
    if (state.isConnected) {
      const progress = store.getState().progress

      for (const unitId in progress) {
        for (const sectionId in progress[unitId]) {
          for (const slideId in progress[unitId][sectionId]) {
            const slide = progress[unitId][sectionId][slideId]

            if (!slide.synced) {
              await sendProgressToServer({
                unitId,
                sectionId,
                slideId,
                ...slide,
              })

              store.dispatch(
                markSynced({ unitId, sectionId, slideId })
              )
            }
          }
        }
      }
    }
  })
}
