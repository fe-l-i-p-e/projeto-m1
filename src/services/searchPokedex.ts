import { readFile } from 'node:fs/promises';
import { Pokeresumo } from '../models/CatalogoPokemon';

const URL_Database = `./pc_box.JSON`;

async function lerPokedex(): Promise<Pokeresumo[]> {
  try {
    const raw = await readFile(URL_Database, { encoding: 'utf-8' });
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.error('Arquivo inválido: formato inesperado.');
      return [];
    }
    return parsed as Pokeresumo[];
  } catch {
    console.error('Não foi possível ler a Pokédex.');
    return [];
  }
}

export function exibirPokemon(pokemon: Pokeresumo): void {
  console.log(`
┌─────────────────────────────┐
  #${pokemon.id} — ${pokemon.nome.toUpperCase()}
  Tipos : ${pokemon.tipos.join(', ')}
  Altura: ${pokemon.altura / 10} m
  Peso  : ${pokemon.peso / 10} kg
└─────────────────────────────┘`);
}

export async function showAll(): Promise<Pokeresumo[]> {
  return lerPokedex();
}

export async function showOne(identificador: string): Promise<Pokeresumo | undefined> {
  const pokemons = await lerPokedex();
  const normalizado = identificador.trim().toLowerCase();

  return pokemons.find(
    (p) =>
      p.nome.toLowerCase() === normalizado ||
      p.id === Number(normalizado),
  );
}