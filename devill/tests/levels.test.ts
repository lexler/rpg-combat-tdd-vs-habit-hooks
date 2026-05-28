import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

interface DamageScenario {
  name: string;
  attackerLevel: number;
  targetLevel: number;
  damage: number;
  expectedDamageDealt: number;
}

const damageScenarios: DamageScenario[] = [
  { name: 'same level: damage unchanged',             attackerLevel: 1,  targetLevel: 1,  damage: 100, expectedDamageDealt: 100 },
  { name: 'attacker 4 levels above: unchanged',       attackerLevel: 5,  targetLevel: 1,  damage: 100, expectedDamageDealt: 100 },
  { name: 'attacker exactly 5 levels above: +50%',    attackerLevel: 6,  targetLevel: 1,  damage: 100, expectedDamageDealt: 150 },
  { name: 'attacker 9 levels above: +50%',            attackerLevel: 10, targetLevel: 1,  damage: 100, expectedDamageDealt: 150 },
  { name: 'target 4 levels above: unchanged',         attackerLevel: 1,  targetLevel: 5,  damage: 100, expectedDamageDealt: 100 },
  { name: 'target exactly 5 levels above: -50%',      attackerLevel: 1,  targetLevel: 6,  damage: 100, expectedDamageDealt: 50  },
  { name: 'target 9 levels above: -50%',              attackerLevel: 1,  targetLevel: 10, damage: 100, expectedDamageDealt: 50  },
];

describe('level damage modifier', () => {
  it.each(damageScenarios)('$name', ({ attackerLevel, targetLevel, damage, expectedDamageDealt }) => {
    const attacker = new Character(attackerLevel);
    const target = new Character(targetLevel);
    const startingHealth = target.health;
    attacker.attack(target, damage);
    expect(startingHealth - target.health).toBe(expectedDamageDealt);
  });
});

interface MaxHealthScenario {
  name: string;
  level: number;
  preDamage: number;
  heal: number;
  expectedHealth: number;
}

const maxHealthScenarios: MaxHealthScenario[] = [
  { name: 'level 1 starts at 1000',         level: 1,  preDamage: 0,   heal: 0,    expectedHealth: 1000 },
  { name: 'level 5 still starts at 1000',   level: 5,  preDamage: 0,   heal: 0,    expectedHealth: 1000 },
  { name: 'level 6 starts at 1500',         level: 6,  preDamage: 0,   heal: 0,    expectedHealth: 1500 },
  { name: 'level 10 starts at 1500',        level: 10, preDamage: 0,   heal: 0,    expectedHealth: 1500 },
  { name: 'level 6 heal caps at 1500',      level: 6,  preDamage: 100, heal: 5000, expectedHealth: 1500 },
];

describe('max health by level', () => {
  it.each(maxHealthScenarios)('$name', ({ level, preDamage, heal, expectedHealth }) => {
    const subject = new Character(level);
    const bob = new Character();
    if (preDamage > 0) bob.attack(subject, preDamage);
    if (heal > 0) subject.heal(heal);
    expect(subject.health).toBe(expectedHealth);
  });
});
