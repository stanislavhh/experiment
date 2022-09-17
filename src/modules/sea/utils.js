import { getSign, randPosition } from 'helpers/random';


export const getRandomBallPosition = () => [
  Number(getSign() + randPosition(2)),
  20,
  Number(getSign() + randPosition(2)),
];

export const def = () => {};
