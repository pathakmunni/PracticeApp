import courseData from '../data/course.json'
import { Unit } from '../types/courseTypes'

export const fetchCourse = async (): Promise<Unit[]> => {
  try {
    // 🔥 FUTURE API CALL
    // const response = await fetch('https://api.example.com/course')
    // const json = await response.json()
    // return json.units

    // 🔥 CURRENT LOCAL JSON
    if (Array.isArray(courseData)) {
      return courseData
    }

    if ((courseData as any).units) {
      return (courseData as any).units
    }

    return [courseData as Unit]

  } catch (error) {
    console.log('Course fetch error:', error)
    return []
  }
}


// import rawCourse from '../data/course.json'
// import { Unit } from '../types/courseTypes'

// export const fetchCourse = async (): Promise<Unit[]> => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       const data = rawCourse as RawCourseResponse

//       const formattedUnits: Unit[] = data.units.map((u: any) => ({
//         id: u.id ?? u.unit_id,
//         title: u.title ?? u.name,
//         sections: u.sections ?? u.sectionList ?? [],
//       }))

//       resolve(formattedUnits)
//     }, 300)
//   })
// }





// export const fetchCourse = async () => {
//   const response = await fetch('API_URL')
//   return response.json()
// }


// import NetInfo from '@react-native-community/netinfo'
// import { Unit } from '../types/courseTypes'
// import localCourse from '../data/course.json'
// import { saveCourseToDB, getCourseFromDB } from './sqliteService'
// import { fetchCourseFromApi } from './apiService'

// /**
//  * Main function used by homeSlice
//  */
// export const fetchCourse = async (): Promise<Unit[]> => {
//   const net = await NetInfo.fetch()

//   try {
//     if (net.isConnected) {
//       // 1️⃣ Try API
//       const apiData = await fetchCourseFromApi()

//       if (apiData?.length) {
//         // Save to SQLite for offline use
//         await saveCourseToDB(apiData)
//         return apiData
//       }
//     }

//     // 2️⃣ If offline OR API failed → load from SQLite
//     const dbData = await getCourseFromDB()
//     if (dbData?.length) {
//       return dbData
//     }

//     // 3️⃣ Fallback to bundled JSON
//     return localCourse.units
//   } catch (error) {
//     console.log('Course fetch failed, using local JSON')
//     return localCourse.units
//   }
// }


// import NetInfo from '@react-native-community/netinfo'
// import { Unit } from '../types/courseTypes'
// import localCourse from '../data/course.json'
// import { saveCourseToDB, getCourseFromDB } from './sqliteService'
// import { fetchCourseFromApi } from './apiService'

// /**
//  * Main function used by homeSlice
//  */
// export const fetchCourse = async (): Promise<Unit[]> => {
//   const net = await NetInfo.fetch()

//   try {
//     if (net.isConnected) {
//       // 1️⃣ Try API
//       const apiData = await fetchCourseFromApi()

//       if (apiData?.length) {
//         // Save to SQLite for offline use
//         await saveCourseToDB(apiData)
//         return apiData
//       }
//     }

//     // 2️⃣ If offline OR API failed → load from SQLite
//     const dbData = await getCourseFromDB()
//     if (dbData?.length) {
//       return dbData
//     }

//     // 3️⃣ Fallback to bundled JSON
//     return localCourse.units
//   } catch (error) {
//     console.log('Course fetch failed, using local JSON')
//     return localCourse.units
//   }
// }
