import { readFile, writeFile } from 'node:fs/promises';
import { Pokeresumo } from '../models/CatalogoPokemon';

const URL_Database = `./pc_box.JSON`;

export async function savePokemon(pokemon: Pokeresumo): Promise<void> {
  const pokemonsRegistrados = await readFile(URL_Database, { encoding: 'utf-8' });
  const parsed: unknown = JSON.parse(pokemonsRegistrados);
  const pokemons: Pokeresumo[] = Array.isArray(parsed) ? parsed : [];

  const usuarioExisteArquivo = pokemons.some((p) => p.id === pokemon.id);

  if (usuarioExisteArquivo) {
    console.log(`O Pokemon "${pokemon.nome}" já está registrado em sua Pokédex`);
    return;
  }

  pokemons.push(pokemon);
  await writeFile(URL_Database, JSON.stringify(pokemons, null, 2));
  console.log(`Pokemon "${pokemon.nome}" registrado com sucesso em sua Pokédex!`);
}

export async function removePokemon(identificador: string): Promise<void> {
  const raw = await readFile(URL_Database, { encoding: 'utf-8' });
  const parsed: unknown = JSON.parse(raw);
  const pokemons: Pokeresumo[] = Array.isArray(parsed) ? parsed : [];

  const normalizado = identificador.trim().toLowerCase();

  const encontrado = pokemons.find(
    (p) => p.nome.toLowerCase() === normalizado || p.id === Number(normalizado),
  );

  if (!encontrado) {
    console.log(`[AVISO] Nenhum Pokémon encontrado com "${identificador}" na Pokédex.`);
    return;
  }

  const atualizado = pokemons.filter((p) => p.id !== encontrado.id);
  await writeFile(URL_Database, JSON.stringify(atualizado, null, 2));
  console.log(`[OK] "${encontrado.nome}" foi removido da sua Pokédex.`);
}

export async function removeAllPokemons(): Promise<void> {
  await writeFile(URL_Database, JSON.stringify([], null, 2));
  console.log(`[OK] Sua Pokédex foi esvaziada.`);
}