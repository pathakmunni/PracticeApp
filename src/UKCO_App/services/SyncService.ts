export const SyncService = {

  async syncOfflineQueue(queue) {

    for (const action of queue) {

      await fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify(action)
      })

    }

  }

}