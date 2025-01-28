const sequelize = require('./database/connection');
const Project = require('./database/projectModel');

const init = async () => {
    await sequelize.sync({ force: true }); // Supprime et recrée la table
    await Project.create({ name: 'Projet Bizerte', status: 'En cours' });
    const projets = await Project.findAll();
    console.log('Projets :', projets);
};

init();
