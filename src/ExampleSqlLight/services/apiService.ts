const BASE_URL = 'https://your-api.com'

export const sendProgressToServer = async (data: any) => {
  try {
    await fetch(`${BASE_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.log('Sync failed', error)
  }
}
