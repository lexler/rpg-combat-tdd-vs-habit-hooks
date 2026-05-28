import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';
import { HealingObject, MagicalWeapon } from '../src/magical-object.js';

function inflictDamage(target: Character, total: number): void {
  if (total % 50 !== 0) throw new Error('total must be multiple of 50');
  const attacker = new Character();
  const healer = new Character();
  const healingObject = new HealingObject(1_000_000);
  const hits = total / 50;
  const weapon = new MagicalWeapon(hits + 10, 50);
  for (let i = 0; i < hits; i++) {
    attacker.attackWith(target, weapon);
    healer.healWith(target, healingObject);
  }
}

interface DamageLevelScenario {
  name: string;
  damageInflicted: number;
  expectedLevel: number;
}

const damageLevelScenarios: DamageLevelScenario[] = [
  { name: 'no damage yet: level 1',          damageInflicted: 0,     expectedLevel: 1 },
  { name: '950 damage: still level 1',       damageInflicted: 950,   expectedLevel: 1 },
  { name: '1000 damage: level 2',            damageInflicted: 1000,  expectedLevel: 2 },
  { name: '2950 damage: level 2',            damageInflicted: 2950,  expectedLevel: 2 },
  { name: '3000 damage: level 3',            damageInflicted: 3000,  expectedLevel: 3 },
  { name: '6000 damage: level 4',            damageInflicted: 6000,  expectedLevel: 4 },
  { name: '10000 damage: level 5',           damageInflicted: 10000, expectedLevel: 5 },
  { name: '15000 damage: level 6',           damageInflicted: 15000, expectedLevel: 6 },
];

describe('damage-based leveling', () => {
  it.each(damageLevelScenarios)('$name', ({ damageInflicted, expectedLevel }) => {
    const target = new Character();
    inflictDamage(target, damageInflicted);
    expect(target.level).toBe(expectedLevel);
    expect(target.alive).toBe(true);
  });
});

interface FactionLevelScenario {
  name: string;
  distinctFactions: number;
  expectedLevel: number;
}

const factionLevelScenarios: FactionLevelScenario[] = [
  { name: 'zero factions: level 1',                  distinctFactions: 0,  expectedLevel: 1  },
  { name: 'two factions: still level 1',             distinctFactions: 2,  expectedLevel: 1  },
  { name: 'three factions: level 2',                 distinctFactions: 3,  expectedLevel: 2  },
  { name: 'five factions: level 2',                  distinctFactions: 5,  expectedLevel: 2  },
  { name: 'six factions: level 3',                   distinctFactions: 6,  expectedLevel: 3  },
  { name: 'twenty-seven factions: level 10',         distinctFactions: 27, expectedLevel: 10 },
  { name: 'thirty factions: capped at level 10',     distinctFactions: 30, expectedLevel: 10 },
];

describe('faction-based leveling', () => {
  it.each(factionLevelScenarios)('$name', ({ distinctFactions, expectedLevel }) => {
    const target = new Character();
    for (let i = 0; i < distinctFactions; i++) target.join(`F${i}`);
    expect(target.level).toBe(expectedLevel);
  });
});

describe('level-advancement edge cases', () => {
  it('rejoining the same faction does not bump the count', () => {
    const target = new Character();
    for (let i = 0; i < 5; i++) target.join('Red');
    expect(target.level).toBe(1);
  });

  it('dying at the level-up threshold does NOT level up', () => {
    const target = new Character();
    const stranger = new Character();
    stranger.attack(target, 5000);
    expect(target.alive).toBe(false);
    expect(target.level).toBe(1);
  });

  it('crossing both paths takes the max level', () => {
    const target = new Character();
    inflictDamage(target, 1000);
    for (let i = 0; i < 6; i++) target.join(`F${i}`);
    expect(target.level).toBe(3);
  });
});
