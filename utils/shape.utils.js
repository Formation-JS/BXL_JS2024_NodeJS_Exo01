/**
 * @typedef { Object } shape
 * @property { number } type -> Le type de forme choisi par l'utilisateur
 * @property { number } radius -> Rayon pour le cercle
 * @property { number } width -> Largeur pour le rectangle / triangle
 * @property { number } height -> Hauteur pour le rectangle / triangle
 * @property { number } base -> Côté pour le carré
 */

/**
 * Vérifie si la forme reçue est valide selon plusieurs paramètres
 * @param { shape } shape
 * @returns { boolean }
 */
function isShapeValid(shape) {
  if (shape.type === 1 && shape.hasOwnProperty("radius")) {
    return true;
  }
  if (
    (shape.type === 2 || shape.type === 3) &&
    shape.hasOwnProperty("height") &&
    shape.hasOwnProperty("width")
  ) {
    return true;
  }
  if (shape.type === 4 && shape.hasOwnProperty("base")) {
    return true;
  }
  return false;
}

/**
 * Calcule l'air de la forme reçue
 * @param { shape } shape
 * @returns { number } -> L'aire de la forme arrondie à 2 décimales via la fonction .toFixed(2)
 */
function calcArea(shape) {
  let result;

  switch (shape.type) {
    case 1:
      result = Math.PI * shape.radius ** 2;
      break;
    case 2:
      result = shape.width * shape.height;
      break;
    case 3:
      result = (shape.width * shape.height) / 2;
      break;
    case 4:
      result = shape.base ** 2;
      break;
  }

  return result.toFixed(2);
}

function calcPeri(shape) {
  let result;

  switch (shape.type) {
    case 1:
      result = 2 * Math.PI * shape.radius;
      break;
    case 2:
      result = (shape.width + shape.height) * 2;
      break;
    case 3:
      let hypo = Math.sqrt(shape.width ** 2 + shape.height ** 2);
      result = shape.width + shape.height + hypo;
      break;
    case 4:
      result = shape.base * 4;
      break;
  }

  return parseInt(result).toFixed(2);
}

const tools = {
  area: (shape) => {
    if (!isShapeValid(shape)) {
      throw new Error("Forme invalide, recommencez.");
    }
    return calcArea(shape);
  },
  perimetre: (shape) => {
    if (!isShapeValid(shape)) {
      throw new Error("Forme invalide, recommencez.");
    }
    return calcPeri(shape);
  },
};

module.exports = tools;
