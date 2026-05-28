export class Character {
  level: number;
  health: number;
  alive = true;
  factions = new Set<string>();

  constructor(level = 1) {
    this.level = level;
    this.health = this.maxHealth;
  }

  get maxHealth(): number {
    return this.level >= 6 ? 1500 : 1000;
  }

  join(faction: string): void {
    this.factions.add(faction);
  }

  attack(target: Character, amount: number): void {
    if (target === this) return;
    if (this.sharesFactionWith(target)) return;
    const dealt = this.applyLevelModifier(target, amount);
    target.health = Math.max(0, target.health - dealt);
    if (target.health === 0) target.alive = false;
  }

  heal(target: Character, amount: number): void {
    if (!target.alive) return;
    if (target !== this && !this.sharesFactionWith(target)) return;
    target.health = Math.min(target.maxHealth, target.health + amount);
  }

  private sharesFactionWith(other: Character): boolean {
    for (const faction of this.factions) {
      if (other.factions.has(faction)) return true;
    }
    return false;
  }

  private applyLevelModifier(target: Character, amount: number): number {
    const gap = this.level - target.level;
    if (gap >= 5) return amount * 1.5;
    if (gap <= -5) return amount * 0.5;
    return amount;
  }
}
