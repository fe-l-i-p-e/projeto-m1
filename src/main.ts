import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { PokeBusca } from './services/PokeApiService';
import { savePokemon } from './services/SalvarPokemon';

async function main(): Promise<void> {
  const interfaceConsole = createInterface({ input: stdin, output: stdout });

  try {
    console.log('\n________________________\n ');
    console.log('BUSCA DE POKÉMONS   ');
    console.log('\n________________________\n ');

    const respostaOperacao = await interfaceConsole.question(
      'Digite o nome ou ID do Pokémon que deseja buscar na pokédex:\n',
    );

    const Pokemon = await PokeBusca(respostaOperacao);

    if (!Pokemon) {
      console.log('Pokémon não encontrado.');
      return;
    }

    const respostaGravar = await interfaceConsole.question(
      `O pokémon "${Pokemon.nome}". Deseja registra-lo em sua pokédex(Digite: S ou N):\n`,
    );

    if (
      respostaGravar.trim().toUpperCase() !== 'S' &&
      respostaGravar.trim().toUpperCase() !== 'N'
    ) {
      console.log(
        'Você informou uma opção inválida. Operação será finalizada.',
      );
      return;
    }

    await savePokemon(Pokemon);
  } catch (_error: any) {
    console.log('\nFalha ao realizar o processo:');
  } finally {
    interfaceConsole.close();
  }
}

void main();
