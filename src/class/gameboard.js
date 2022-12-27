export default class Gameboard {
  constructor() {
    this.board = [];
    this.initBoard();
  }

  initBoard() {
    for (let i = 0; i < 100; i++) {
      this.board.push({ hasShip: false, getShot: false });
    }
  }

  receiveAttack(location) {
    this.board[location].getShot = true;
  }

  checkIfShotShip(location) {
    // true -> hit, false -> miss
    return this.board[location].hasShip;
  }

  setShipOnBoard(location, ship, axis) {
    const locationArray = [];

    for (let i = 0; i < ship.length; i++) {
      // we can place ship in x-axis
      if (axis === 'x') {
        locationArray.push(location + i);
      } else {
        // or we can place ship in y-axis
        locationArray.push(location + i * 10);
      }
    }

    return locationArray;
  }

  checkCollision(locationArray) {
    // If some parts of ships exceeds border edge,
    // there is a wall collision. So, we need edges.
    const edges = [9, 19, 29, 39, 49, 59, 69, 79, 89];

    if (locationArray.some((location) => !this.board[location])) {
      // return false, if the location of the ship exceeds board boundry
      return false;
    } else if (locationArray.some((location) => this.board[location].hasShip)) {
      // return false, if the location of the shi intersects with another ship
      return false;
    } else if (
      edges.some((edge) => {
        return [edge, edge + 1].every((duo) => locationArray.includes(duo));
      })
    ) {
      return false;
    } else {
      return true;
    }
  }

  // create random ship location for opponent board
  randomShipLocation(ship) {
    // generate random axis
    const randomAxis = () => ['x', 'y'][Math.floor(Math.random() * 2)];

    const findLocation = (axis) => {
      const freeLocationOptions = [];

      for (let i = 0; i < 100 - ship.length; i++) {
        let array = [];
        if (axis === 'x') {
          // set ship part with respect to axis
          for (let part = 0; part < ship.length; part++) {
            array.push(i + part);
          }
        } else {
          for (let part = 0; part < ship.length; part++) {
            array.push(i + part * count);
          }
        }
        // test if generated location has any collision,
        // if no collision, add array to freeLocationOptions
        if (this.checkCollision(array)) {
          freeLocationOptions.push(array);
        }
      }
      // choose a random ship alignment
      return freeLocationOptions[
        Math.floor(Math.random() * freeLocationOptions.length)
      ];
    };
    // return selected random ship alignment
    return findLocation(randomAxis());
  }
}
