import { describe, expect, it } from 'vitest';
import { Character } from '../src/character.js';

describe('Character', () => {
  it('starts alive with 1000 health', () => {
    const character = new Character();

    expect(character.health).toBe(1000);
    expect(character.isAlive).toBe(true);
  });

  it('subtracts dealt damage from the target health', () => {
    const attacker = new Character();
    const target = new Character();

    attacker.dealDamage(target, 100);

    expect(target.health).toBe(900);
  });

  it('dies and has 0 health when damage exceeds current health', () => {
    const attacker = new Character();
    const target = new Character();

    attacker.dealDamage(target, 1500);

    expect(target.health).toBe(0);
    expect(target.isAlive).toBe(false);
  });

  it('cannot deal damage to itself', () => {
    const character = new Character();

    character.dealDamage(character, 100);

    expect(character.health).toBe(1000);
  });

  it('heals themselves, increasing their own health', () => {
    const character = new Character();
    new Character().dealDamage(character, 300);

    character.heal(character, 100);

    expect(character.health).toBe(800);
  });

  it('cannot heal once dead', () => {
    const character = new Character();
    new Character().dealDamage(character, 1500);

    character.heal(character, 100);

    expect(character.health).toBe(0);
    expect(character.isAlive).toBe(false);
  });

  it('starts at level 1', () => {
    const character = new Character();

    expect(character.level).toBe(1);
  });

  it('deals half damage when target is 5+ levels above attacker', () => {
    const attacker = new Character();
    const target = new Character({ level: 6 });

    attacker.dealDamage(target, 100);

    expect(target.health).toBe(950);
  });

  it('deals 50% more damage when target is 5+ levels below attacker', () => {
    const attacker = new Character({ level: 6 });
    const target = new Character();

    attacker.dealDamage(target, 100);

    expect(target.health).toBe(850);
  });

  it('caps health at 1000 when healing below level 6', () => {
    const character = new Character();
    new Character().dealDamage(character, 50);

    character.heal(character, 200);

    expect(character.health).toBe(1000);
  });

  it('raises the health cap to 1500 at level 6', () => {
    const character = new Character({ level: 6 });

    character.heal(character, 600);

    expect(character.health).toBe(1500);
  });

  it('belongs to no factions when newly created', () => {
    const character = new Character();

    expect(character.factions).toEqual([]);
  });

  it('can join a faction', () => {
    const character = new Character();

    character.join('Knights');

    expect(character.factions).toContain('Knights');
  });

  it('can leave a faction', () => {
    const character = new Character();
    character.join('Knights');
    character.join('Mages');

    character.leave('Knights');

    expect(character.factions).toEqual(['Mages']);
  });

  it('cannot deal damage to allies', () => {
    const attacker = new Character();
    const ally = new Character();
    attacker.join('Knights');
    ally.join('Knights');

    attacker.dealDamage(ally, 100);

    expect(ally.health).toBe(1000);
  });

  it('can heal an ally', () => {
    const healer = new Character();
    const ally = new Character();
    healer.join('Knights');
    ally.join('Knights');
    new Character().dealDamage(ally, 300);

    healer.heal(ally, 100);

    expect(ally.health).toBe(800);
  });

  it('cannot heal a non-ally', () => {
    const healer = new Character();
    const other = new Character();
    new Character().dealDamage(other, 300);

    healer.heal(other, 100);

    expect(other.health).toBe(700);
  });

  it('gains a level after surviving 1000 cumulative damage', () => {
    const character = new Character();
    const attacker = new Character();

    attacker.dealDamage(character, 500);
    character.heal(character, 500);
    attacker.dealDamage(character, 500);

    expect(character.level).toBe(2);
  });
});
