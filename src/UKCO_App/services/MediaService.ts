import RNFS from 'react-native-fs'

const MEDIA_DIR = `${RNFS.DocumentDirectoryPath}/media`

export const MediaService = {

  async downloadMedia(url: string, mediaId: string) {

    const path = `${MEDIA_DIR}/${mediaId}`

    const exists = await RNFS.exists(path)

    if (exists) return path

    await RNFS.downloadFile({
      fromUrl: url,
      toFile: path
    }).promise

    return path
  }

}