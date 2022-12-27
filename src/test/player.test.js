import Player from '../class/player';

describe('player functions', () => {
  let player;

  beforeEach(() => {
    player = new Player('Mister Tester');
  });

  test('creates a player with a name', () => {
    expect(player.name).toBe('Mister Tester');
  });
});
