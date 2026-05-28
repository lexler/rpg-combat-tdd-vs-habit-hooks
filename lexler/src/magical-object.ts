import type { Character } from './character.js';

export class MagicalObject {
  health: number;
  readonly maxHealth: number;

  constructor(options: { maxHealth: number }) {
    this.maxHealth = options.maxHealth;
    this.health = options.maxHealth;
  }
}

export class HealingObject extends MagicalObject {
  heal(target: Character, amount: number): void {
    target.gainHealth(amount);
  }
}
