import { readFile, writeFile } from 'node:fs/promises';

import { Pokeresumo } from '../models/CatalogoPokemon';

const URL_Database = `./pokedex.JSON`;

async function LerArquivo(): Promise<Pokeresumo[]> {
  try {
    const pokemonsRegistrados = await readFile(URL_Database, {
      encoding: 'utf-8',
    });
    const parsed: unknown = JSON.parse(pokemonsRegistrados);
    if (!Array.isArray(parsed)) {
      console.error('Arquivo inválido: formato inesperado.');
      return [];
    }
    return parsed as Pokeresumo[];
  } catch {
    console.error('Arquivo inválido, não foi possível ler os dados.');
    return [];
  }
}

export async function savePokemon(pokemon: Pokeresumo) {
  const Pokemons = await LerArquivo();

  if (Pokemons.length === 0) {
    await writeFile(URL_Database, JSON.stringify([pokemon]), {
      encoding: 'utf-8',
    });
    console.log(`O Pokemon "${pokemon.nome}" foi registrado em sua Pokédex`);
    return;
  }
  const usuarioExisteArquivo = Pokemons.some(
    (Pokemons: Pokeresumo) => Pokemons.id == pokemon.id,
  );
  if (usuarioExisteArquivo) {
    console.log(
      `O Pokemon "${pokemon.nome}" já está registrado em sua Pokédex `,
    );
    return;
  }
  Pokemons.push(pokemon);

  await writeFile(URL_Database, JSON.stringify(Pokemons), {
    encoding: 'utf-8',
  });
  console.log(`O Pokemon "${pokemon.nome}" foi registrado em sua Pokédex`);
}
