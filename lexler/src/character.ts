export class Character {
  health = 1000;
  isAlive = true;
  level: number;

  constructor(options: { level?: number } = {}) {
    this.level = options.level ?? 1;
  }

  dealDamage(target: Character, amount: number): void {
    if (target === this) return;
    target.receiveDamage(this.adjustDamageForLevel(target, amount));
  }

  private adjustDamageForLevel(target: Character, amount: number): number {
    const levelDiff = target.level - this.level;
    if (levelDiff >= 5) return amount / 2;
    if (levelDiff <= -5) return amount * 1.5;
    return amount;
  }

  heal(amount: number): void {
    if (!this.isAlive) return;
    const cap = this.level >= 6 ? 1500 : 1000;
    this.health = Math.min(this.health + amount, cap);
  }

  private receiveDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }
}
