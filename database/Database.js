const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Erreur de connexion à la base de données :', err.message);
            } else {
                console.log('Connexion à la base de données SQLite réussie.');
            }
        });
    }

    run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.error('Erreur SQL :', err.message);
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) {
                    console.error('Erreur SQL :', err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Erreur SQL :', err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Erreur lors de la fermeture de la base de données :', err.message);
            } else {
                console.log('Base de données SQLite fermée.');
            }
        });
    }
}

module.exports = Database;
