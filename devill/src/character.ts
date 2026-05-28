export class Character {
  level: number;
  health: number;
  alive = true;

  constructor(level = 1) {
    this.level = level;
    this.health = this.maxHealth;
  }

  get maxHealth(): number {
    return this.level >= 6 ? 1500 : 1000;
  }

  attack(target: Character, amount: number): void {
    if (target === this) return;
    const dealt = this.applyLevelModifier(target, amount);
    target.health = Math.max(0, target.health - dealt);
    if (target.health === 0) target.alive = false;
  }

  heal(amount: number): void {
    if (!this.alive) return;
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  private applyLevelModifier(target: Character, amount: number): number {
    const gap = this.level - target.level;
    if (gap >= 5) return amount * 1.5;
    if (gap <= -5) return amount * 0.5;
    return amount;
  }
}
