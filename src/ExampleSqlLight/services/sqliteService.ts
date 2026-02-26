import SQLite from 'react-native-sqlite-storage'

SQLite.enablePromise(false)

export const db = SQLite.openDatabase(
  { name: 'learning.db', location: 'default' },
  () => console.log('✅ Database opened'),
  error => console.log('❌ Database error:', error)
)

//
// ==========================
// INIT DATABASE
// ==========================
//

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        // Course Table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS course (
            id TEXT PRIMARY KEY,
            data TEXT
          );
        `)

        // Progress Table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS progress (
            id TEXT PRIMARY KEY,
            data TEXT,
            synced INTEGER DEFAULT 0
          );
        `)
      },
      error => {
        console.log('❌ Init DB Error:', error)
        reject(error)
      },
      () => {
        console.log('✅ Tables ready')
        resolve()
      }
    )
  })
}

//
// ==========================
// SAVE COURSE
// ==========================
//

export const saveCourseToDB = (units: any[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM course;`)

        units.forEach(unit => {
          const id = unit.id || unit.unit_id

          tx.executeSql(
            `INSERT INTO course (id, data) VALUES (?, ?)`,
            [String(id), JSON.stringify(unit)]
          )
        })
      },
      error => {
        console.log('❌ Save Course Error:', error)
        reject(error)
      },
      () => {
        console.log('✅ Course saved offline')
        resolve()
      }
    )
  })
}

//
// ==========================
// GET COURSE
// ==========================
//

export const getCourseFromDB = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM course`,
        [],
        (_, results) => {
          const rows = results.rows
          const units: any[] = []

          for (let i = 0; i < rows.length; i++) {
            units.push(JSON.parse(rows.item(i).data))
          }

          resolve(units)
        },
        (_, error) => {
          console.log('❌ Fetch Course Error:', error)
          reject(error)
          return false
        }
      )
    })
  })
}

//
// ==========================
// SAVE PROGRESS (Offline First)
// ==========================
//

export const saveProgressToDB = (
  id: string,
  progressData: any
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `
          INSERT OR REPLACE INTO progress (id, data, synced)
          VALUES (?, ?, 0);
        `,
          [id, JSON.stringify(progressData)]
        )
      },
      error => {
        console.log('❌ Save Progress Error:', error)
        reject(error)
      },
      () => {
        console.log('✅ Progress saved offline')
        resolve()
      }
    )
  })
}

//
// ==========================
// GET ALL PROGRESS
// ==========================
//

export const getProgressFromDB = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM progress`,
        [],
        (_, results) => {
          const rows = results.rows
          const progressList: any[] = []

          for (let i = 0; i < rows.length; i++) {
            progressList.push({
              id: rows.item(i).id,
              data: JSON.parse(rows.item(i).data),
              synced: rows.item(i).synced,
            })
          }

          resolve(progressList)
        },
        (_, error) => {
          console.log('❌ Fetch Progress Error:', error)
          reject(error)
          return false
        }
      )
    })
  })
}

//
// ==========================
// MARK PROGRESS AS SYNCED
// ==========================
//

export const markProgressAsSynced = (
  id: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `UPDATE progress SET synced = 1 WHERE id = ?`,
          [id]
        )
      },
      error => {
        console.log('❌ Sync Update Error:', error)
        reject(error)
      },
      () => {
        resolve()
      }
    )
  })
}

