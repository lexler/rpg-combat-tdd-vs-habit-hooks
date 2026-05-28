export class Character {
  health = 1000;
  isAlive = true;

  dealDamage(target: Character, amount: number): void {
    target.health -= amount;
  }
}
