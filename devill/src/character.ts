import type { Damageable } from './damageable.js';
import { HealingObject, MagicalWeapon } from './magical-object.js';

export class Character implements Damageable {
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

  attack(target: Damageable, amount: number): void {
    if (!this.canDamage(target)) return;
    const dealt = target instanceof Character ? this.applyLevelModifier(target, amount) : amount;
    this.applyDamage(target, dealt);
  }

  attackWith(target: Damageable, weapon: MagicalWeapon): void {
    if (!weapon.alive) return;
    if (!this.canDamage(target)) return;
    this.applyDamage(target, weapon.damage);
    this.consumeWeapon(weapon);
  }

  heal(target: Character, amount: number): void {
    if (!target.alive) return;
    if (target !== this && !this.sharesFactionWith(target)) return;
    target.health = Math.min(target.maxHealth, target.health + amount);
  }

  healWith(target: Character, object: HealingObject): void {
    if (!target.alive || !object.alive) return;
    const amount = Math.min(object.health, target.maxHealth - target.health);
    target.health += amount;
    object.health -= amount;
    if (object.health === 0) object.alive = false;
  }

  private canDamage(target: Damageable): boolean {
    if (target === this) return false;
    if (target instanceof Character && this.sharesFactionWith(target)) return false;
    return true;
  }

  private applyDamage(target: Damageable, amount: number): void {
    target.health = Math.max(0, target.health - amount);
    if (target.health === 0) target.alive = false;
  }

  private consumeWeapon(weapon: MagicalWeapon): void {
    weapon.health -= 1;
    if (weapon.health === 0) weapon.alive = false;
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
