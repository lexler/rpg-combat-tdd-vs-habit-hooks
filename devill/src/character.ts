const MAX_HEALTH = 1000;

export class Character {
  health = MAX_HEALTH;
  alive = true;

  attack(target: Character, amount: number): void {
    target.health = Math.max(0, target.health - amount);
    if (target.health === 0) target.alive = false;
  }

  heal(amount: number): void {
    if (!this.alive) return;
    this.health = Math.min(MAX_HEALTH, this.health + amount);
  }
}
