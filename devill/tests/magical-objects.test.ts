import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';
import { HealingObject, MagicalObject, MagicalWeapon } from '../src/magical-object.js';

interface ObjectDamageScenario {
  name: string;
  objectMax: number;
  damage: number;
  expectedObjectHealth: number;
  expectedObjectAlive: boolean;
}

const objectDamageScenarios: ObjectDamageScenario[] = [
  { name: 'object takes partial damage',         objectMax: 500, damage: 100,  expectedObjectHealth: 400, expectedObjectAlive: true  },
  { name: 'object destroyed at exactly zero',    objectMax: 500, damage: 500,  expectedObjectHealth: 0,   expectedObjectAlive: false },
  { name: 'overkill damage clamps to zero',      objectMax: 500, damage: 5000, expectedObjectHealth: 0,   expectedObjectAlive: false },
];

describe('magical object damage', () => {
  it.each(objectDamageScenarios)('$name', ({ objectMax, damage, expectedObjectHealth, expectedObjectAlive }) => {
    const alice = new Character();
    const object = new MagicalObject(objectMax);
    alice.attack(object, damage);
    expect(object.health).toBe(expectedObjectHealth);
    expect(object.alive).toBe(expectedObjectAlive);
  });
});

interface HealingScenario {
  name: string;
  objectMax: number;
  characterLevel: number;
  preDamage: number;
  expectedCharacterHealth: number;
  expectedObjectHealth: number;
  expectedObjectAlive: boolean;
}

const healingScenarios: HealingScenario[] = [
  { name: 'object restores partial health',      objectMax: 500,  characterLevel: 1, preDamage: 200, expectedCharacterHealth: 1000, expectedObjectHealth: 300, expectedObjectAlive: true  },
  { name: 'object caps at character max',        objectMax: 100,  characterLevel: 1, preDamage: 50,  expectedCharacterHealth: 1000, expectedObjectHealth: 50,  expectedObjectAlive: true  },
  { name: 'object consumed entirely',            objectMax: 200,  characterLevel: 1, preDamage: 500, expectedCharacterHealth: 700,  expectedObjectHealth: 0,   expectedObjectAlive: false },
  { name: 'level 6 character heals to 1500',     objectMax: 1000, characterLevel: 6, preDamage: 800, expectedCharacterHealth: 1500, expectedObjectHealth: 200, expectedObjectAlive: true  },
];

describe('healing object usage', () => {
  it.each(healingScenarios)('$name', ({ objectMax, characterLevel, preDamage, expectedCharacterHealth, expectedObjectHealth, expectedObjectAlive }) => {
    const target = new Character(characterLevel);
    const stranger = new Character(characterLevel);
    const object = new HealingObject(objectMax);
    if (preDamage > 0) stranger.attack(target, preDamage);
    const healer = new Character();
    healer.healWith(target, object);
    expect(target.health).toBe(expectedCharacterHealth);
    expect(object.health).toBe(expectedObjectHealth);
    expect(object.alive).toBe(expectedObjectAlive);
  });

  it('cannot heal a dead character with a healing object', () => {
    const target = new Character();
    const stranger = new Character();
    stranger.attack(target, 5000);
    const object = new HealingObject(500);
    const healer = new Character();
    healer.healWith(target, object);
    expect(target.health).toBe(0);
    expect(target.alive).toBe(false);
    expect(object.health).toBe(500);
    expect(object.alive).toBe(true);
  });
});

interface WeaponScenario {
  name: string;
  weaponMax: number;
  weaponDamage: number;
  uses: number;
  expectedTargetHealth: number;
  expectedWeaponHealth: number;
  expectedWeaponAlive: boolean;
}

const weaponScenarios: WeaponScenario[] = [
  { name: 'single use deals weapon damage',           weaponMax: 3, weaponDamage: 100, uses: 1, expectedTargetHealth: 900, expectedWeaponHealth: 2, expectedWeaponAlive: true  },
  { name: 'weapon destroyed after final use',         weaponMax: 3, weaponDamage: 100, uses: 3, expectedTargetHealth: 700, expectedWeaponHealth: 0, expectedWeaponAlive: false },
  { name: 'using a destroyed weapon is a no-op',      weaponMax: 1, weaponDamage: 100, uses: 3, expectedTargetHealth: 900, expectedWeaponHealth: 0, expectedWeaponAlive: false },
];

describe('magical weapon usage', () => {
  it.each(weaponScenarios)('$name', ({ weaponMax, weaponDamage, uses, expectedTargetHealth, expectedWeaponHealth, expectedWeaponAlive }) => {
    const alice = new Character();
    const target = new Character();
    const weapon = new MagicalWeapon(weaponMax, weaponDamage);
    for (let i = 0; i < uses; i++) alice.attackWith(target, weapon);
    expect(target.health).toBe(expectedTargetHealth);
    expect(weapon.health).toBe(expectedWeaponHealth);
    expect(weapon.alive).toBe(expectedWeaponAlive);
  });
});
