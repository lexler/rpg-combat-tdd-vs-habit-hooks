import type { Damageable } from './damageable.js';

export class MagicalObject implements Damageable {
  health: number;
  alive = true;

  constructor(public readonly maxHealth: number) {
    this.health = maxHealth;
  }
}

export class HealingObject extends MagicalObject {}

export class MagicalWeapon extends MagicalObject {
  readonly damage: number;

  constructor(maxHealth: number, damage: number) {
    super(maxHealth);
    this.damage = damage;
  }
}
