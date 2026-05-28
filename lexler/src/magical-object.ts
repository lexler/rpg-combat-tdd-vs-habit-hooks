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
    const drawn = Math.min(amount, this.health);
    this.health -= drawn;
    target.gainHealth(drawn);
  }
}
