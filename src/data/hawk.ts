// SILUETA PROVISORIA del halcón (geometría original, simétrica) hasta recibir el logo oficial.
// Se usa tanto para el SVG como para la escena 3D, así ambos cambian con un solo archivo.
// Mitad derecha, de pico (eje) a cola (eje). Coordenadas con Y hacia arriba.
const RIGHT_HALF: [number, number][] = [
  [0, 2.3],
  [0.14, 1.95],
  [0.24, 1.5],
  [0.34, 1.2],
  [1.0, 1.25],
  [2.5, 1.3],
  [4.0, 0.75],
  [5.3, -0.7],
  [4.3, -0.25],
  [4.5, -1.2],
  [3.6, -0.55],
  [3.6, -1.5],
  [2.7, -0.85],
  [1.4, -0.95],
  [0.8, -1.5],
  [0.85, -2.6],
  [0.3, -3.05],
  [0, -2.85],
];

// Contorno completo (sentido horario): derecha de arriba a abajo y luego izquierda espejada.
export const hawkPoints: [number, number][] = [
  ...RIGHT_HALF,
  ...RIGHT_HALF.slice(1, -1)
    .reverse()
    .map(([x, y]): [number, number] => [-x, y]),
];

// Path SVG (Y invertida) y viewBox que lo encuadra.
export const hawkSvgPath =
  hawkPoints.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${-y}`).join(" ") + " Z";
export const hawkViewBox = "-5.6 -3.5 11.2 6.0";
