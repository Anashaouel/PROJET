const loadActiveProjects = async () => {
    // ... (Pas de changements dans cette fonction)
};

const archiveProject = async (id) => {
    // ... (Pas de changements dans cette fonction)
};

document.getElementById('add-project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('project-name').value.trim();
    const startDate = document.getElementById('start-date').value;

    if (name && startDate) {
        try {  // Important : ajouter un bloc try...catch
            const response = await window.electronAPI.addProject(name, startDate);
            if (response.success) {
                alert('Projet ajouté avec succès !');
                document.getElementById('project-name').value = ''; // Réinitialiser le champ nom
                document.getElementById('start-date').value = '';     // Réinitialiser le champ date
                loadActiveProjects();
            } else {
                alert('Erreur lors de l’ajout du projet.');
            }
        } catch (error) { // Capturer les erreurs potentielles
            console.error("Erreur lors de l'appel à addProject:", error);
            alert('Une erreur est survenue lors de l\'ajout du projet. Veuillez consulter la console.');
        }
    } else {
        alert('Veuillez remplir tous les champs obligatoires.');
    }
});

const loadArchives = async () => {
    // ... (Pas de changements dans cette fonction)
};

loadActiveProjects();
loadArchives();