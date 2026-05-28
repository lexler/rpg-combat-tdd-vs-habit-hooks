export class Character {
  health = 1000;
  isAlive = true;

  dealDamage(target: Character, amount: number): void {
    if (target === this) return;
    target.receiveDamage(amount);
  }

  heal(amount: number): void {
    if (!this.isAlive) return;
    this.health += amount;
  }

  receiveDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }
}
