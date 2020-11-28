import { SpaceShipAdapter } from './space-ship-adapter';
import { SpaceShip } from './space-ship.model';

describe('SpaceShipAdapter', () => {
  it('should create an instance', () => {
    expect(new SpaceShipAdapter()).toBeTruthy();
  });

  it('SpaceShipAdapter.adapt()', () => {
    let spaceShipAdapter = new SpaceShipAdapter();
    expect(spaceShipAdapter.adapt({name:"s1",total_no:2,max_distance:200,speed:2})).toEqual(new SpaceShip("s1",2,200,2));
  });
});
