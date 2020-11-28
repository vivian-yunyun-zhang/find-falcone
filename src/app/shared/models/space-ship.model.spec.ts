import { SpaceShip } from './space-ship.model';

describe('SpaceShip', () => {
  it('should create an instance', () => {
    expect(new SpaceShip("Space pod",2,200,2)).toBeTruthy();
  });
});
