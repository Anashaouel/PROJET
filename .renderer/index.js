<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Projets</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        form, .section {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, button {
            width: 100%;
            max-width: 400px;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .section {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Gestion des Projets</h1>

    <!-- Formulaire pour ajouter un projet -->
    <!-- L'attribut action est maintenant ajouté -->
    <form id="add-project-form" action="adresse_de_la_page_destinataire">
        <label for="project-name">Nom du projet :</label>
        <input type="text" id="project-name" name="project-name" required>

        <label for="start-date">Date de début :</label>
        <input type="date" id="start-date" name="start-date" required>

        <button type="submit">Ajouter le Projet</button>
    </form>

    <!-- Section pour afficher les projets actifs -->
    <div id="active-projects" class="section">
        <h2>Projets Actifs</h2>
    </div>

    <!-- Section pour afficher les projets archivés -->
    <div id="archived-projects" class="section">
        <h2>Projets Archivés</h2>
    </div>

    <script src="../renderer.js"></script>
</body>
</html>
