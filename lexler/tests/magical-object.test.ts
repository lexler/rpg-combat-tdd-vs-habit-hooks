import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';
import { HealingObject, MagicalObject } from '../src/magical-object.js';

describe('MagicalObject', () => {
  it('has health and a fixed max health set at creation', () => {
    const object = new MagicalObject({ maxHealth: 500 });

    expect(object.health).toBe(500);
    expect(object.maxHealth).toBe(500);
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
});
