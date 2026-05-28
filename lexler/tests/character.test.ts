import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

describe('Character', () => {
  it('starts alive with 1000 health', () => {
    const character = new Character();

    expect(character.health).toBe(1000);
    expect(character.isAlive).toBe(true);
  });

  // [TEST] Dealing damage subtracts from the target's health
  // [TEST] When damage equals or exceeds current health, health becomes 0 and target dies
  // [TEST] A Character cannot deal damage to itself
  // [TEST] A Character can heal themselves, increasing their own health
  // [TEST] A dead Character cannot heal
});
