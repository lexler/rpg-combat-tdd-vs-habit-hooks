export class Character {
  health = 1000;
  isAlive = true;
  level: number;

  constructor(options: { level?: number } = {}) {
    this.level = options.level ?? 1;
  }

  dealDamage(target: Character, amount: number): void {
    if (target === this) return;
    const levelDiff = target.level - this.level;
    let adjusted = amount;
    if (levelDiff >= 5) adjusted = amount / 2;
    else if (levelDiff <= -5) adjusted = amount * 1.5;
    target.receiveDamage(adjusted);
  }

  heal(amount: number): void {
    if (!this.isAlive) return;
    this.health += amount;
  }

  private receiveDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }
}
