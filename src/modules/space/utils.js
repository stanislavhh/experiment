import { getSign, randPosition } from 'helpers/random';
import { MAX_DISTANCE, STARS_COUNT } from './constants';

export const getRandomPosition = () => [
  Number(getSign() + randPosition(MAX_DISTANCE)),
  Number(getSign() + randPosition(MAX_DISTANCE)),
  Number(getSign() + randPosition(MAX_DISTANCE)),
];

export const getStars = (count = STARS_COUNT) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    radius: Math.random() * 2.5,
    position: getRandomPosition(),
  }));
