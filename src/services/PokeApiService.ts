import { Pokeresumo } from '../models/CatalogoPokemon';
import { PokemonApiResponse } from '../models/Pokemon';
export async function PokeBusca(
  nomeOuId: string | number,
): Promise<Pokeresumo | null> {
  const urlBase = 'https://pokeapi.co/api/v2/pokemon/';

  try {
    const response = await fetch(`${urlBase}${String(nomeOuId)}`);

    switch (response.status) {
      case 400:
        throw new Error('Requisição inválida');
      case 404:
        throw new Error(`Pokémon "${String(nomeOuId)}" não encontrado`);
      default:
        throw new Error(
          `Erro ao buscar Pokémon: ${String(response.status)} ${response.statusText}`,
        );
      case 200: {
        const data = (await response.json()) as PokemonApiResponse;

        // Mapeia PokemonApiResponse → Pokeresumo
        const pokeresumo: Pokeresumo = {
          id: data.id,
          nome: data.name,
          tipos: data.types.map((t) => t.type.name),
          altura: data.height,
          peso: data.weight,
        };

        return pokeresumo;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
