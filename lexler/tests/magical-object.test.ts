import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';
import { HealingObject, MagicalObject, MagicalWeapon } from '../src/magical-object.js';

describe('MagicalObject', () => {
  it('has health and a fixed max health set at creation', () => {
    const object = new MagicalObject({ maxHealth: 500 });

    expect(object.health).toBe(500);
    expect(object.maxHealth).toBe(500);
  });

  it('is destroyed once health reaches 0', () => {
    const attacker = new Character();
    const target = new Character();
    const sword = new MagicalWeapon({ maxHealth: 1, damage: 50 });

    attacker.attackWith(sword, target);

    expect(sword.health).toBe(0);
    expect(sword.isDestroyed).toBe(true);
  });
});

describe('HealingObject', () => {
  it('heals a character', () => {
    const character = new Character();
    new Character().dealDamage(character, 300);
    const fountain = new HealingObject({ maxHealth: 500 });

    fountain.heal(character, 100);

    expect(character.health).toBe(800);
  });

  it('cannot push a character above their max health', () => {
    const character = new Character();
    new Character().dealDamage(character, 100);
    const fountain = new HealingObject({ maxHealth: 500 });

    fountain.heal(character, 500);

    expect(character.health).toBe(1000);
  });

  it('cannot give more health than it has remaining', () => {
    const character = new Character();
    new Character().dealDamage(character, 400);
    const fountain = new HealingObject({ maxHealth: 50 });

    fountain.heal(character, 200);

    expect(character.health).toBe(650);
    expect(fountain.health).toBe(0);
  });
});

describe('MagicalWeapon', () => {
  it('deals its fixed damage to a target when wielded', () => {
    const attacker = new Character();
    const target = new Character();
    const sword = new MagicalWeapon({ maxHealth: 10, damage: 200 });

    attacker.attackWith(sword, target);

    expect(target.health).toBe(800);
  });

  it('loses 1 health each time it is used', () => {
    const attacker = new Character();
    const target = new Character();
    const sword = new MagicalWeapon({ maxHealth: 10, damage: 100 });

    attacker.attackWith(sword, target);

    expect(sword.health).toBe(9);
  });
});
