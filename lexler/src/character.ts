import type { MagicalWeapon } from './magical-object.js';

const MAX_LEVEL = 10;

export class Character {
  health = 1000;
  isAlive = true;
  level: number;

  private readonly _factions = new Set<string>();
  private readonly factionsEverJoined = new Set<string>();
  private factionsTowardNextLevel = 0;
  private damageSurvived = 0;

  constructor(options: { level?: number } = {}) {
    this.level = options.level ?? 1;
  }

  get factions(): string[] {
    return [...this._factions];
  }

  get maxHealth(): number {
    return this.level >= 6 ? 1500 : 1000;
  }

  attackWith(weapon: MagicalWeapon, target: Character): void {
    this.dealDamage(target, weapon.damage);
    weapon.wearFromUse();
  }

  dealDamage(target: Character, amount: number): void {
    if (target === this) return;
    if (this.isAllyOf(target)) return;
    target.receiveDamage(this.adjustDamageForLevel(target, amount));
  }

  heal(target: Character, amount: number): void {
    if (target !== this && !this.isAllyOf(target)) return;
    target.gainHealth(amount);
  }

  gainHealth(amount: number): void {
    if (!this.isAlive) return;
    this.health = Math.min(this.health + amount, this.maxHealth);
  }

  join(faction: string): void {
    const isNewToCharacter = !this.factionsEverJoined.has(faction);
    this._factions.add(faction);
    this.factionsEverJoined.add(faction);
    if (isNewToCharacter) this.progressLevelFromFactions();
  }

  leave(faction: string): void {
    this._factions.delete(faction);
  }

  private isAllyOf(other: Character): boolean {
    for (const faction of this._factions) {
      if (other._factions.has(faction)) return true;
    }
    return false;
  }

  private adjustDamageForLevel(target: Character, amount: number): number {
    const levelDiff = target.level - this.level;
    if (levelDiff >= 5) return amount / 2;
    if (levelDiff <= -5) return amount * 1.5;
    return amount;
  }

  private receiveDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
      return;
    }
    this.progressLevelFromDamage(amount);
  }

  private progressLevelFromDamage(amount: number): void {
    if (this.level >= MAX_LEVEL) return;
    this.damageSurvived += amount;
    const threshold = this.level * 1000;
    if (this.damageSurvived >= threshold) {
      this.damageSurvived -= threshold;
      this.level += 1;
    }
  }

  private progressLevelFromFactions(): void {
    if (this.level >= MAX_LEVEL) return;
    this.factionsTowardNextLevel += 1;
    if (this.factionsTowardNextLevel >= 3) {
      this.factionsTowardNextLevel -= 3;
      this.level += 1;
    }
  }
}
