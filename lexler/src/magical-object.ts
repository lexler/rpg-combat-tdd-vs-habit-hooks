import type { Character } from './character.js';

export class MagicalObject {
  health: number;
  readonly maxHealth: number;

  constructor(options: { maxHealth: number }) {
    this.maxHealth = options.maxHealth;
    this.health = options.maxHealth;
  }
}

export class MagicalWeapon extends MagicalObject {
  readonly damage: number;

  constructor(options: { maxHealth: number; damage: number }) {
    super({ maxHealth: options.maxHealth });
    this.damage = options.damage;
  }

  wearFromUse(): void {
    this.health -= 1;
  }
}

export class HealingObject extends MagicalObject {
  heal(target: Character, amount: number): void {
    const drawn = Math.min(amount, this.health);
    this.health -= drawn;
    target.gainHealth(drawn);
  }
}
