// L'import d'un module sans spécifier 'node:' va récupérer en priorité les modules installés et spécifiés
// dans le package.json.
// A contrario, utiliser 'node:' va permettre de spécifier à l'import d'aller chercher obligatoirement
// dans les modules internes à node.
// le module readline sans promises va demander l'utilisation de callback pour fonctionner correctement
// (ou la simulation d'async avec new Promise)
// tandis que le module readline/promises va permettre nativement l'utilisation de l'async/await et donc
// sortir du chaining de callback
// const readline = require("readline");
// const readline = require("readline/promises");
// const readline = require("node:readline");
const readline = require("node:readline/promises");
const tools = require("./utils/shape.utils");

// IIFE
// Immediatly Invoked Function Expression
// C'est une fonction qui s'invoque elle même-même a l'exécution du script
(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const choice = await rl.question(
    "Quelle forme voulez-vous ?\n1: Carré\n2: Rectangle\n3: Triangle\n4: Cercle\n Réponse: ",
  );

  let shape;
  switch (choice) {
    case "1":
      const base = await rl.question("La taille des côtés est de : \n");
      shape = {
        type: 4,
        // En JS, si la valeur de la clé d'un object à le même nom que sa clé, il n'est pas nécessaire
        // de l'écrire donc
        // ➡️ base: base ✅
        // ➡️ base ✅
        base,
      };
      break;
    case "2":
    case "3":
      const height = await rl.question(
        "Quelle est la hauteur de votre forme ? \n",
      );
      const width = await rl.question(
        "Quelle est la largeur de votre forme ? \n",
      );
      shape = {
        type: choice === "2" ? 2 : 3,
        height,
        width,
      };
      break;
    case "4":
      const radius = await rl.question(
        "Quelle est le rayon de votre cercle ? \n",
      );
      shape = {
        type: 1,
        radius,
      };
      break;
    default:
      rl.write("La forme demandée n'est pas disponible");
      break;
  }

  const area = tools.area(shape);
  const perimetre = tools.perimetre(shape);

  await rl.write(
    `Les résultats des calculs sont \nAire: ${area}\nPérimètre: ${perimetre}\n`,
  );

  await rl.close();
})();
