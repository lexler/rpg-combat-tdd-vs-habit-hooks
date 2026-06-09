import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

interface Scenario {
  name: string;
  preDamage: number;
  selfAttack: number;
  expected: { health: number; alive: boolean };
}

const scenarios: Scenario[] = [
  { name: 'living character attacking self does nothing', preDamage: 0,    selfAttack: 200,  expected: { health: 1000, alive: true  } },
  { name: 'large self-attack is also a no-op',            preDamage: 0,    selfAttack: 5000, expected: { health: 1000, alive: true  } },
  { name: 'dead character self-attack remains a no-op',   preDamage: 5000, selfAttack: 200,  expected: { health: 0,    alive: false } },
];

describe('self-targeting', () => {
  it.each(scenarios)('$name', ({ preDamage, selfAttack, expected }) => {
    const alice = new Character();
    const bob = new Character();
    if (preDamage > 0) bob.attack(alice, preDamage);
    if (selfAttack > 0) alice.attack(alice, selfAttack);
    expect(alice.health).toBe(expected.health);
    expect(alice.alive).toBe(expected.alive);
  });
});
