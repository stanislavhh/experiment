import { MAX_DISTANCE } from './constants';

export const getSign = () => (Math.random() >= 0.5 ? '+' : '-');
export const randPosition = (max = MAX_DISTANCE) => Math.floor(Math.random() * max);

export const getRandomPosition = () => [
  Number(getSign() + randPosition()),
  Number(getSign() + randPosition()),
  Number(getSign() + randPosition()),
];
