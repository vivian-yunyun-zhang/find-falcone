import { Planet } from './planet.model';

describe('Planet', () => {
  it('should create an instance', () => {
    expect(new Planet("Donlon",1,true)).toBeTruthy();
  });
});
