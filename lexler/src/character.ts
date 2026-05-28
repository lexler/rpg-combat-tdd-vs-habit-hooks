export class Character {
  health = 1000;
  isAlive = true;
  level: number;
  private readonly _factions = new Set<string>();

  get factions(): string[] {
    return [...this._factions];
  }

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
    this.health = Math.min(this.health + amount, this.maxHealth);
  }

  get maxHealth(): number {
    return this.level >= 6 ? 1500 : 1000;
  }

  join(faction: string): void {
    this._factions.add(faction);
  }

  leave(faction: string): void {
    this._factions.delete(faction);
  }

  private receiveDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }
}
