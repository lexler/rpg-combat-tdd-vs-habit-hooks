export class Character {
  health = 1000;
  isAlive = true;

  dealDamage(target: Character, amount: number): void {
    if (target === this) return;
    target.receiveDamage(amount);
  }

  heal(_amount: number): void {}

  receiveDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }
}
