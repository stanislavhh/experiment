export const VIEW_SIZE = 10000;

export const MAX_CAMERA_DISTANCE = 50;

export const SUN_PARAMS = {
  // DEG
  elevation: 0.5,
  // RAD
  azimuth: 0.75,
  rayleigh: 5,
};

export const DEFAULT_CONTACT_PHYSICS_MATERIAL = {
  friction: 0.9,
  restitution: 0.7,
  contactEquationStiffness: 1e7,
  contactEquationRelaxation: 1,
  frictionEquationStiffness: 1e7,
  frictionEquationRelaxation: 2,
};

export const FLOAT_SIZE = [15, 2, 15];
export const DEFAULT_FLOAT_POSITION = [0, 2, 0];
export const DEFAULT_FLOAT_VELOCITY = [0, 0, 0];

export const MAX_VELOCITY = 50;


export const INITIAL_BIRD_ROTATION = [0, Math.PI / 1.4, 0];
export const BIRD_SPEED = 0.1;