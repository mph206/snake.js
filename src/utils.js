export function findDiv(coordinate) {
  return document
      .getElementsByClassName('row')[coordinate.y]
      .getElementsByClassName('column')[coordinate.x];
}
