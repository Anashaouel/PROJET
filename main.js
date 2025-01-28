const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const url=require("url");
let mainWindow;

// Initialisation de la base de données
const dbPath = path.join(__dirname, 'database', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err.message);
    } else {
        console.log('Connexion réussie à la base de données SQLite.');

        // Création de la table "projects" si elle n'existe pas
        db.run(`
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                status TEXT NOT NULL,
                start_date TEXT,
                end_date TEXT,
                description TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Erreur lors de la création de la table :', err.message);
            } else {
                console.log('Table "projects" prête.');
            }
        });
    }
});

// Création de la fenêtre principale
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false, // Disable nodeIntegration for security
        },
    });
    mainWindow.loadFile('renderer/index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Gestion des projets (Corrigé et simplifié avec async/await et gestion des erreurs)
ipcMain.handle('addProject', async (event, name, startDate) => {
    try {
        const sql = `INSERT INTO projects (name, status, start_date) VALUES (?, ?, ?)`;
        const result = await new Promise((resolve, reject) => {
            db.run(sql, [name, 'En cours', startDate], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, projectId: this.lastID });
                }
            });
        });
        return result;
    } catch (error) {
        console.error('Erreur lors de l’ajout du projet :', error);
        throw error; // Rejeter l'erreur pour qu'elle soit capturée dans le renderer
    }
});

ipcMain.handle('getActiveProjects', async (event) => {
    try {
        const sql = `SELECT * FROM projects WHERE status = 'En cours'`;
        const rows = await new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return rows;
    } catch (error) {
        console.error('Erreur lors du chargement des projets actifs :', error);
        throw error;
    }
});

ipcMain.handle('archiveProject', async (event, id) => {
    try {
        const sql = `UPDATE projects SET status = 'Archivé' WHERE id = ?`;
        const result = await new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
        return result;
    } catch (error) {
        console.error('Erreur lors de l’archivage du projet :', error);
        throw error;
    }
});

ipcMain.handle('getArchivedProjects', async (event) => {
    try {
        const sql = `SELECT * FROM projects WHERE status = 'Archivé'`;
        const rows = await new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return rows;
    } catch (error) {
        console.error('Erreur lors du chargement des projets archivés :', error);
        throw error;
    }
});