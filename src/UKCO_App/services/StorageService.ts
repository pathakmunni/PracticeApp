import AsyncStorage from '@react-native-async-storage/async-storage'

export const StorageKeys = {
  UNIT_BUNDLE: 'unit:bundle:',
  MEDIA_MANIFEST: 'media:manifest',
}

export const StorageService = {

  async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  },

  async get<T>(key: string): Promise<T | null> {
    const data = await AsyncStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key)
  }

}