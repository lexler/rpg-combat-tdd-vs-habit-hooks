import { describe, expect, it } from 'vitest';
import { MagicalObject } from '../src/magical-object.js';

describe('MagicalObject', () => {
  it('has health and a fixed max health set at creation', () => {
    const object = new MagicalObject({ maxHealth: 500 });

    expect(object.health).toBe(500);
    expect(object.maxHealth).toBe(500);
  });
});
