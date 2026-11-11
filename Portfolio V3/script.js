/* =========================================================
   SCRIPT.JS : les petites choses "qui bougent"
   Chaque page le charge avec <script src="script.js"></script>
   ========================================================= */


/* ---------- 1. Bouton mode clair / mode sombre ---------- */
var racine = document.documentElement;              /* la balise <html> */
var boutonTheme = document.getElementById("bouton-theme");

/* Renvoie le thème affiché maintenant : "light" ou "dark" */
function themeActuel() {
  if (racine.dataset.theme) return racine.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/* Applique le thème et change le texte du bouton */
function appliquerTheme(theme) {
  racine.dataset.theme = theme;
  if (boutonTheme) boutonTheme.textContent = theme === "dark" ? "Mode clair" : "Mode sombre";
}

/* Au chargement : choix déjà enregistré, sinon thème de l'ordinateur */
var choix = null;
try { choix = localStorage.getItem("theme"); } catch (e) {}
appliquerTheme(choix || themeActuel());

/* Au clic : on inverse et on enregistre le choix dans le navigateur */
if (boutonTheme) {
  boutonTheme.addEventListener("click", function () {
    var nouveau = themeActuel() === "dark" ? "light" : "dark";
    appliquerTheme(nouveau);
    try { localStorage.setItem("theme", nouveau); } catch (e) {}
  });
}


/* ---------- 2. Bouton "Copier l'adresse" (page Contact) ---------- */
var boutonCopier = document.getElementById("bouton-copier");
if (boutonCopier) {
  boutonCopier.addEventListener("click", function () {
    navigator.clipboard.writeText("tomaslatour5@gmail.com")
      .then(function () { boutonCopier.textContent = "Adresse copiée"; })
      .catch(function () {
        /* si la copie est refusée : on sélectionne l'adresse */
        window.getSelection().selectAllChildren(document.getElementById("email"));
        boutonCopier.textContent = "Adresse sélectionnée";
      });
  });
}


/* ---------- 3. Sujet de veille qui change chaque jour (page Veille) ----------
   On numérote les jours depuis le 1er janvier 1970, puis on prend
   le sujet n° (numéro du jour % nombre de sujets) dans la liste.
   Le "%" donne le reste de la division : on repart au début de la liste
   quand on arrive au bout. */
var SUJETS = [
  { titre: "L'hameçonnage (phishing)",
    texte: "Des e-mails ou des SMS imitent une banque, un livreur ou un service interne pour voler des identifiants. C'est encore la première porte d'entrée des attaques : la double authentification et la sensibilisation des utilisateurs restent les meilleures protections.",
    lien: "déploiement de Microsoft Authenticator." },
  { titre: "Les rançongiciels",
    texte: "Un rançongiciel chiffre les fichiers d'une organisation et demande une rançon pour les rendre. Les établissements d'enseignement sont souvent visés. Les sauvegardes hors ligne, les mises à jour et la séparation du réseau limitent les dégâts.",
    lien: "VLAN isolé pour le BTS SIO." },
  { titre: "La double authentification (MFA)",
    texte: "Avec la MFA, un mot de passe volé ne suffit plus : il faut aussi valider la connexion sur un second appareil. Les attaquants essaient maintenant de fatiguer l'utilisateur avec des demandes répétées, d'où l'intérêt des codes à saisir.",
    lien: "déploiement de Microsoft Authenticator." },
  { titre: "Les mises à jour de sécurité",
    texte: "Chaque mois, les éditeurs publient des correctifs pour des failles connues. Un poste ou un serveur non mis à jour devient une cible facile, car ces failles sont décrites publiquement.",
    lien: "maintenance des PC et des serveurs." },
  { titre: "Le RGPD au quotidien",
    texte: "Le RGPD impose de protéger les données personnelles : n'y donner accès qu'aux personnes qui en ont besoin, ne pas les garder trop longtemps et signaler les fuites. Pour un technicien, cela passe d'abord par les droits d'accès.",
    lien: "comptes et droits des nouveaux arrivants." },
  { titre: "Le Zero Trust",
    texte: "Le Zero Trust part du principe qu'aucun appareil ni utilisateur n'est fiable par défaut, même à l'intérieur du réseau. Chaque accès est vérifié, et chacun n'a que les droits dont il a besoin.",
    lien: "segmentation en VLAN et règles de pare-feu." },
  { titre: "L'IA et la cybersécurité",
    texte: "L'intelligence artificielle aide les défenseurs à repérer des comportements anormaux, mais elle permet aussi aux attaquants d'écrire des e-mails d'hameçonnage plus crédibles. La vigilance des utilisateurs reste indispensable.",
    lien: "sensibilisation des utilisateurs." }
];

var titreVeille = document.getElementById("veille-titre");
if (titreVeille) {
  var numeroDuJour = Math.floor(Date.now() / 86400000);   /* 86 400 000 ms = 1 jour */
  var sujet = SUJETS[numeroDuJour % SUJETS.length];
  titreVeille.textContent = sujet.titre;
  document.getElementById("veille-texte").textContent = sujet.texte;
  document.getElementById("veille-lien").textContent = "Lien avec mes missions : " + sujet.lien;
  document.getElementById("veille-date").textContent =
    "Sujet du jour · " + new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}
