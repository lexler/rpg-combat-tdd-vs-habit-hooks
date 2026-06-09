import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

interface AttackScenario {
  name: string;
  aliceFactions: string[];
  bobFactions: string[];
  damage: number;
  expectedAliceHealth: number;
}

const attackScenarios: AttackScenario[] = [
  { name: 'both unaffiliated: damage applies',                       aliceFactions: [],             bobFactions: [],              damage: 200, expectedAliceHealth: 800  },
  { name: 'different factions, no overlap: damage applies',          aliceFactions: ['Red'],        bobFactions: ['Blue'],         damage: 200, expectedAliceHealth: 800  },
  { name: 'shared single faction: damage blocked',                   aliceFactions: ['Red'],        bobFactions: ['Red'],          damage: 200, expectedAliceHealth: 1000 },
  { name: 'multiple factions with one overlap: damage blocked',      aliceFactions: ['Red', 'Blue'], bobFactions: ['Green', 'Blue'], damage: 200, expectedAliceHealth: 1000 },
  { name: 'only one in a faction: damage applies',                   aliceFactions: ['Red'],        bobFactions: [],              damage: 200, expectedAliceHealth: 800  },
];

describe('faction attack rules', () => {
  it.each(attackScenarios)('$name', ({ aliceFactions, bobFactions, damage, expectedAliceHealth }) => {
    const alice = new Character();
    const bob = new Character();
    for (const f of aliceFactions) alice.join(f);
    for (const f of bobFactions) bob.join(f);
    bob.attack(alice, damage);
    expect(alice.health).toBe(expectedAliceHealth);
  });
});

interface HealScenario {
  name: string;
  aliceFactions: string[];
  bobFactions: string[];
  preDamage: number;
  bobHealsAliceBy: number;
  expectedAliceHealth: number;
}

const healScenarios: HealScenario[] = [
  { name: 'shared faction: bob heals alice',                aliceFactions: ['Red'], bobFactions: ['Red'],  preDamage: 400, bobHealsAliceBy: 200, expectedAliceHealth: 800 },
  { name: 'no shared faction: bob cannot heal alice',       aliceFactions: ['Red'], bobFactions: ['Blue'], preDamage: 400, bobHealsAliceBy: 200, expectedAliceHealth: 600 },
  { name: 'both unaffiliated: bob cannot heal alice',       aliceFactions: [],      bobFactions: [],       preDamage: 400, bobHealsAliceBy: 200, expectedAliceHealth: 600 },
];

describe('faction heal rules', () => {
  it.each(healScenarios)('$name', ({ aliceFactions, bobFactions, preDamage, bobHealsAliceBy, expectedAliceHealth }) => {
    const alice = new Character();
    const bob = new Character();
    const stranger = new Character();
    for (const f of aliceFactions) alice.join(f);
    for (const f of bobFactions) bob.join(f);
    stranger.attack(alice, preDamage);
    bob.heal(alice, bobHealsAliceBy);
    expect(alice.health).toBe(expectedAliceHealth);
  });
});
