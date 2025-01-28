const Project = sequelize.define('Project', {
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false }, // Date de début du projet
    status: { type: DataTypes.STRING, defaultValue: 'En cours' }, // 'En cours', 'Archivé', etc.
    progress: { type: DataTypes.FLOAT, defaultValue: 0 }, // Avancement (%) du projet
});

const Phase = sequelize.define('Phase', {
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false }, // Délai de la phase
    projectId: { type: DataTypes.INTEGER, allowNull: false }, // Liaison au projet
});

const Task = sequelize.define('Task', {
    description: { type: DataTypes.STRING, allowNull: false },
    assignee: { type: DataTypes.STRING, allowNull: false }, // Employé assigné
    deadline: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'En cours' }, // 'En cours', 'Terminé'
    phaseId: { type: DataTypes.INTEGER, allowNull: false }, // Liaison à la phase
});

// Relations entre les tables
Project.hasMany(Phase, { foreignKey: 'projectId' });
Phase.belongsTo(Project);
Phase.hasMany(Task, { foreignKey: 'phaseId' });
Task.belongsTo(Phase);

module.exports = { Project, Phase, Task };
