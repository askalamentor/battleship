import Gameboard from '../class/gameboard';
import shipTypes from '../class/shipTypes';

describe('gameboard functions', () => {
  let testboard;

  beforeEach(() => {
    testboard = new Gameboard();
  });

  test('initialize board cells', () => {
    expect(testboard.board.length).toEqual(100);
  });

  test('update a cell when receiving a shot', () => {
    testboard.receiveAttack(50);
    expect(testboard.board[50].getShot).toBe(true);
  });

  test('if there is no shot, returns false', () => {
    expect(testboard.board[50].getShot).toBe(false);
  });

  test('hit the part of ship', () => {
    testboard.board[50].hasShip = true;
    expect(testboard.checkIfShotShip(50)).toBe(true);
  });

  test('rejects ship placement that exceed board boundry', () => {
    testboard.board[50].hasShip = true;
    expect(testboard.checkCollision([98, 99, 100, 101, 102])).toBe(false);
  });

  test('rejects ship placement that intersects with other ship', () => {
    testboard.board[50].hasShip = true;
    expect(testboard.checkCollision([40, 50, 60, 70, 80])).toBe(false);
  });

  test('rejects ship placement that exceeds x-axis wall', () => {
    expect(testboard.checkCollision([8, 9, 10, 11, 12])).toBe(false);
  });

  test('rejects ship placement that exceeds y-axis wall', () => {
    expect(testboard.checkCollision([75, 85, 95, 105])).toBe(false);
  });

  test('return location of a ship', () => {
    expect(testboard.setShipOnBoard(35, shipTypes[0], 'y')).toEqual([
      35, 45, 55, 65, 75,
    ]);
  });
});
