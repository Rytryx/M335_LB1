import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const tableName = 'reflections';

const openOrCreateDatabase = async () => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase(
        {
          name: 'reflections.db',
          location: 'default',
          createFromLocation: 1,
        },
        () => {
          console.log('Database opened successfully');
          resolve(db);
        },
        (error) => {
          console.error('Error opening database:', error);
          reject(error);
        }
      );
    });
  };

const createTable = async () => {
  const db = await openOrCreateDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            image TEXT,
            date TEXT,
            text TEXT,
            voiceRecording TEXT
          );`,
          [],
          () => {
            console.log('Table created successfully');
            resolve();
          },
          (error) => {
            console.error('Error creating table:', error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error('Transaction error:', error);
      }
    );
  });
};

export const getDBConnection = async () => {
  const db = await openOrCreateDatabase();
  return db;
};

export const addReflection = async (db, reflection) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO ${tableName} (title, image, date, text, voiceRecording) VALUES (?, ?, ?, ?, ?);`,
            [reflection.title, reflection.image, reflection.date, reflection.text, reflection.voiceRecording],
            () => {
              console.log('Reflection added successfully');
              resolve();
            },
            (error) => {
              console.error('Error adding reflection:', error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error('Transaction error:', error);
        }
      );
    });
  };
  
  export const getReflections = async (db) => {
    try {
      const reflections = [];
      const results = await db.executeSql(`SELECT * FROM ${tableName}`);
      results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
          reflections.push(result.rows.item(i));
        }
      });
      return reflections;
    } catch (error) {
      console.error(error);
      throw Error('Failed to retrieve reflections from the database.');
    }
  };
  
  export const updateReflection = async (db, reflection) => {
    const updateQuery = `
      UPDATE ${tableName}
      SET title = ?, image = ?, date = ?, text = ?, voiceRecording = ?
      WHERE id = ?;
    `;
    const { id, title, image, date, text, voiceRecording } = reflection;
    await db.executeSql(updateQuery, [title, image, date, text, voiceRecording, id]);
  };
  
  export const deleteReflection = async (db, id) => {
    const deleteQuery = `
      DELETE FROM ${tableName}
      WHERE id = ?;
    `;
    await db.executeSql(deleteQuery, [id]);
  };

const getDatabase = async () => {
    await createTable();
    const db = await openOrCreateDatabase();
    return db;
  };

export default getDatabase;
