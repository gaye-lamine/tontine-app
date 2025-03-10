import { Router } from "express";
import { v4 as uuidv4 } from "uuid"; // Pour générer des UUIDs
import { Request, Response } from "express";

// Initialiser le routeur
const router = Router();

// Exemple d'utilisateur (pour tests, à remplacer par une base de données réelle)
let utilisateurs = [
  { id: uuidv4(), nom: "John", prenom: "Doe", telephone: "1234567890", points: 10, flammes: 0, created_at: new Date() },
];

// 1. Créer un utilisateur
router.post("/utilisateurs", (req: Request, res: Response) => {
  const { nom, prenom, telephone } = req.body;
  const newUtilisateur = {
    id: uuidv4(),
    nom,
    prenom,
    telephone,
    points: 10, // Valeur par défaut
    flammes: 0, // Valeur par défaut
    created_at: new Date(),
  };
  utilisateurs.push(newUtilisateur);
  res.status(201).json(newUtilisateur);
});

// 2. Récupérer tous les utilisateurs
router.get("/utilisateurs", (req: Request, res: Response) => {
  res.status(200).json(utilisateurs);
});

// 3. Récupérer un utilisateur par son ID
router.get("/utilisateurs/:id", (req: Request, res: Response) => {
  const utilisateur = utilisateurs.find(u => u.id === req.params.id);
  if (utilisateur) {
    res.status(200).json(utilisateur);
  } else {
    res.status(404).json({ message: "Utilisateur non trouvé" });
  }
});

// 4. Mettre à jour un utilisateur
router.put("/utilisateurs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { nom, prenom, telephone } = req.body;
  const utilisateur = utilisateurs.find(u => u.id === id);
  if (utilisateur) {
    utilisateur.nom = nom || utilisateur.nom;
    utilisateur.prenom = prenom || utilisateur.prenom;
    utilisateur.telephone = telephone || utilisateur.telephone;
    res.status(200).json(utilisateur);
  } else {
    res.status(404).json({ message: "Utilisateur non trouvé" });
  }
});

// 5. Supprimer un utilisateur
router.delete("/utilisateurs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  utilisateurs = utilisateurs.filter(u => u.id !== id);
  res.status(200).json({ message: "Utilisateur supprimé" });
});

// Routes pour gérer les tontines (en suivant une structure similaire)
router.post("/tontines", (req: Request, res: Response) => {
  const { nom, montant, frequence, jour, nombre_participants, amende, created_by } = req.body;
  const newTontine = {
    id: uuidv4(),
    nom,
    montant,
    cagnotte: 0, // Initialement vide
    frequence,
    jour,
    nombre_participants,
    amende,
    created_by,
    created_at: new Date(),
  };
  // Ajouter à la base de données (ou à une liste temporaire pour l'exemple)
  res.status(201).json(newTontine);
});

// Ajouter d'autres routes pour les participants, cotisations, cycles, transactions, notifications de manière similaire...

// Exemple de route pour la documentation Swagger
/**
 * @swagger
 * /utilisateurs:
 *   post:
 *     description: Créer un nouvel utilisateur
 *     parameters:
 *       - name: nom
 *         in: body
 *         required: true
 *         type: string
 *       - name: prenom
 *         in: body
 *         required: false
 *         type: string
 *       - name: telephone
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Paramètres manquants ou invalides
 */
 
// Exporter le routeur pour l'utiliser dans le fichier `server.ts`
export default router;
