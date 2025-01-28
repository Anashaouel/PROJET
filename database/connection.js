const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db.sqlite',
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à SQLite réussie !');
    } catch (error) {
        console.error('Échec de connexion :', error);
    }
};

testConnection();

module.exports = sequelize;
(async () => {
    await sequelize.sync({ alter: true });
    console.log("Modèles synchronisés avec succès !");
})();
