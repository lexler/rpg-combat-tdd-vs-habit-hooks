import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

interface Scenario {
  name: string;
  preDamage: number;
  heal: number;
  expected: { health: number; alive: boolean };
}

const scenarios: Scenario[] = [
  { name: 'starts at full health and alive',            preDamage: 0,    heal: 0,   expected: { health: 1000, alive: true  } },
  { name: 'takes damage from an attacker',              preDamage: 200,  heal: 0,   expected: { health: 800,  alive: true  } },
  { name: 'dies when health reduced to exactly zero',   preDamage: 1000, heal: 0,   expected: { health: 0,    alive: false } },
  { name: 'overkill damage leaves health at 0, not negative', preDamage: 5000, heal: 0,   expected: { health: 0,    alive: false } },
  { name: 'healing a living character restores health', preDamage: 400,  heal: 200, expected: { health: 800,  alive: true  } },
  { name: 'healing cannot exceed max health of 1000',   preDamage: 50,   heal: 200, expected: { health: 1000, alive: true  } },
  { name: 'a dead character cannot be healed back',     preDamage: 5000, heal: 500, expected: { health: 0,    alive: false } },
];

describe('Character', () => {
  it.each(scenarios)('$name', ({ preDamage, heal, expected }) => {
    const alice = new Character();
    const bob = new Character();
    if (preDamage > 0) bob.attack(alice, preDamage);
    if (heal > 0) alice.heal(alice, heal);
    expect(alice.health).toBe(expected.health);
    expect(alice.alive).toBe(expected.alive);
  });
});
