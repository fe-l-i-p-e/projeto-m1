import { createInterface, Interface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { PokeBusca } from '../services/PokeApiService';
import { savePokemon } from '../services/SalvarPokemon';
export class TerminalController {
  private interfaceConsole: Interface;

  constructor() {
    this.interfaceConsole = createInterface({ input: stdin, output: stdout });
  }

  async iniciar(): Promise<void> {
    try {
      console.log('\n________________________\n ');
      console.log('BUSCA DE POKÉMONS   ');
      console.log('\n________________________\n ');

      const respostaOperacao = await this.interfaceConsole.question(
        'Digite o nome ou ID do Pokémon que deseja buscar na pokédex:\n',
      );

      const pokemon = await PokeBusca(respostaOperacao);

      if (!pokemon) {
        console.log('Pokémon não encontrado.');
        return;
      }

      const respostaGravar = await this.interfaceConsole.question(
        `Você encontrou um "${pokemon.nome}" selvagem. Deseja capturá-lo(Digite: S ou N):\n`,
      );

      const resposta = respostaGravar.trim().toUpperCase();

      if (resposta !== 'S' && resposta !== 'N') {
        console.log(
          'Você informou uma opção inválida. Operação será finalizada.',
        );
        return;
      }

      if (resposta === 'S') {
        await savePokemon(pokemon);
      }
    } catch (_error: any) {
      console.log('\nFalha ao realizar o processo:');
    } finally {
      this.interfaceConsole.close();
    }
  }
}
