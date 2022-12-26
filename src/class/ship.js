export default class Ship {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.hits = [];
  }

  isSunk() {
    return this.position.every((element) => this.hits.includes(element));
  }

  hit(indexPos) {
    this.hits.push(indexPos);
  }
}
