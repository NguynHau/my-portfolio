const { r, g, b } = { r: 24, g: 10, b: 5 }; // #180a05

// Invert
const ir = 255 - r;
const ig = 255 - g;
const ib = 255 - b;

// Hue rotate 180 (approximation matrix)
// [ 0.213,  0.715,  0.072 ]
// [ 0.213,  0.715,  0.072 ]
// [ 0.213,  0.715,  0.072 ]
// + cos(180) * [ 0.787, -0.715, -0.072 ] ...
// For cos=180 (-1) and sin=180 (0), the matrix is:
// R' = ir * (0.213 - 0.787) + ig * (0.715 - (-0.715)?)
const matrix = [
  [-0.574, 1.430, 0.144],
  [0.426, -0.285, 0.144],
  [0.426, 1.430, -0.856]
];
const fr = ir * matrix[0][0] + ig * matrix[0][1] + ib * matrix[0][2];
const fg = ir * matrix[1][0] + ig * matrix[1][1] + ib * matrix[1][2];
const fb = ir * matrix[2][0] + ig * matrix[2][1] + ib * matrix[2][2];

console.log(`Final: rgb(${Math.max(0, Math.min(255, fr))}, ${Math.max(0, Math.min(255, fg))}, ${Math.max(0, Math.min(255, fb))})`);
