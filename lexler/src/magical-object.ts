export class MagicalObject {
  health: number;
  readonly maxHealth: number;

  constructor(options: { maxHealth: number }) {
    this.maxHealth = options.maxHealth;
    this.health = options.maxHealth;
  }
}
