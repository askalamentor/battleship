import Ship from '../class/ship';

describe('Ship functions', () => {
  // create fake ships
  let carrier;
  let battleShip;

  beforeEach(() => {
    carrier = new Ship('carrier', [2, 3, 4, 5, 6]);
    battleShip = new Ship('battleShip', [10, 11, 12, 13]);
  });

  test('gets a hit', () => {
    carrier.hit(3);
    expect(carrier.hits).toEqual([3]);
  });

  test('gets multiple hits', () => {
    battleShip.hit(11);
    battleShip.hit(12);
    expect(battleShip.hits).toEqual([11, 12]);
  });

  test('sunk state', () => {
    carrier.hit(3);
    carrier.hit(4);
    expect(carrier.isSunk()).toBe(false);
  });

  test('not sunk state', () => {
    battleShip.hit(10);
    battleShip.hit(11);
    battleShip.hit(12);
    battleShip.hit(13);
    expect(battleShip.isSunk()).toBe(true);
  });
});
