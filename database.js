const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Configuration de la connexion Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'), // Chemin vers le fichier SQLite
});

// Définition des modèles
// Modèle pour les projets
const Project = sequelize.define('Project', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true, // Vérifie que le champ n'est pas vide
        }
    },
    status: { 
        type: DataTypes.STRING, 
        defaultValue: 'En cours' 
    },
    startDate: { 
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
            isDate: true, // Vérifie que c'est une date valide
        }
    },
    progress: { 
        type: DataTypes.FLOAT, 
        defaultValue: 0,
        validate: {
            min: 0, // Minimum 0%
            max: 100, // Maximum 100%
        }
    },
});

// Modèle pour les fichiers liés aux projets
const File = sequelize.define('File', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true, // Vérifie que le champ n'est pas vide
        }
    },
});

// Relations entre les tables
Project.hasMany(File, { foreignKey: 'projectId', onDelete: 'CASCADE' }); // Supprime les fichiers si un projet est supprimé
File.belongsTo(Project, { foreignKey: 'projectId' });

// Fonction d'initialisation de la base de données
const initDatabase = async () => {
    try {
        await sequelize.authenticate(); // Vérifie la connexion à la base
        console.log('Connexion à la base de données réussie.');

        await sequelize.sync({ alter: true }); // Synchronise les modèles avec la base
        console.log('Base de données synchronisée avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données :', error);
    }
};

// Exportation des modules pour utilisation dans d'autres fichiers
module.exports = { initDatabase, Project, File };
