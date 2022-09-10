export function findDiv(coordinate) {
  return document
      .getElementsByClassName('row')[coordinate.y]
      .getElementsByClassName('cell')[coordinate.x];
}

export function findDivSnake(coordinate) {
  return document
      .getElementsByClassName('row')[coordinate.y]
      .getElementsByClassName('cell snake')[coordinate.x];
}