import { getSign, randPosition } from 'helpers/random';


export const getRandomBallPosition = () => [
  Number(getSign() + randPosition(10)),
  20,
  Number(getSign() + randPosition(10)),
];

export const def = () => {};
