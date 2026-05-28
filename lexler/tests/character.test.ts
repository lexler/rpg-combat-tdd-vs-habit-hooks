import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

describe('Character', () => {
  it('starts alive with 1000 health', () => {
    const character = new Character();

    expect(character.health).toBe(1000);
    expect(character.isAlive).toBe(true);
  });

  it('subtracts dealt damage from the target health', () => {
    const attacker = new Character();
    const target = new Character();

    attacker.dealDamage(target, 100);

    expect(target.health).toBe(900);
  });

  it('dies and has 0 health when damage exceeds current health', () => {
    const attacker = new Character();
    const target = new Character();

    attacker.dealDamage(target, 1500);

    expect(target.health).toBe(0);
    expect(target.isAlive).toBe(false);
  });

  it('cannot deal damage to itself', () => {
    const character = new Character();

    character.dealDamage(character, 100);

    expect(character.health).toBe(1000);
  });

  it('heals themselves, increasing their own health', () => {
    const character = new Character();
    new Character().dealDamage(character, 300);

    character.heal(100);

    expect(character.health).toBe(800);
  });

  // [TEST] A dead Character cannot heal
});
