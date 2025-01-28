const { contextBridge } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

contextBridge.exposeInMainWorld('electronAPI', {
    addProject: (name, startDate) => { // Pas besoin d'async ici, le handle gère déjà les promesses
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO projects (name, status, start_date)
                VALUES (?, 'En cours', ?)
            `;
            db.run(sql, [name, startDate], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, projectId: this.lastID });
                }
            });
        });
    },
    getActiveProjects: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM projects WHERE status = 'En cours'`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    archiveProject: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE projects SET status = 'Archivé' WHERE id = ?`;
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    },
    getArchivedProjects: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM projects WHERE status = 'Archivé'`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
});