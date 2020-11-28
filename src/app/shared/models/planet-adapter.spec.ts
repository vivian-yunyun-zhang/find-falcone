import { PlanetAdapter } from './planet-adapter';
import { Planet } from './planet.model';

describe('PlanetAdapter', () => {
  it('should create an instance', () => {
    expect(new PlanetAdapter()).toBeTruthy();
  });

  it('PlanetAdapter.adapt()', () => {
    let planetAdapter = new PlanetAdapter();
    expect(planetAdapter.adapt({name:"p1",distance:200,disabled:false})).toEqual(new Planet("p1",200,false));
  });
});
