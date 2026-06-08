import { createInterface, Interface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { PokeBusca } from '../services/PokeApiService';
import { savePokemon } from '../services/SalvarPokemon';
import { showAll, showOne, exibirPokemon } from '../services/searchPokedex';

export class TerminalController {
  private interfaceConsole: Interface;

  constructor() {
    this.interfaceConsole = createInterface({ input: stdin, output: stdout });
  }

  async iniciar(): Promise<void> {
    try {
      console.log('\n________________________\n');
      console.log('   BUSCA DE POKÉMONS   ');
      console.log('________________________\n');

      const respostaOperacao = await this.interfaceConsole.question(
        'Digite o nome ou ID do Pokémon que deseja buscar:\n',
      );

      const pokemon = await PokeBusca(respostaOperacao);

      if (!pokemon) {
        console.log('Pokémon não encontrado.');
        return;
      }

      const respostaGravar = await this.interfaceConsole.question(
        `Você encontrou um "${pokemon.nome}" selvagem! Deseja capturá-lo? (S/N):\n`,
      );

      const resposta = respostaGravar.trim().toUpperCase();

      if (resposta !== 'S' && resposta !== 'N') {
        console.log('Opção inválida. Operação finalizada.');
        return;
      }

      if (resposta === 'S') {
        await savePokemon(pokemon);
      }

      // ── Consulta à Pokédex ──────────────────────────────────────
      const respostaProcurar = await this.interfaceConsole.question(
        '\nDeseja consultar sua Pokédex? (S/N):\n',
      );

      if (respostaProcurar.trim().toUpperCase() !== 'S') {
        console.log('Até a próxima, treinador!');
        return;
      }

      const respostaMostrar = await this.interfaceConsole.question(
        'Deseja buscar um Pokémon específico? (S = específico / N = mostrar todos):\n',
      );

      if (respostaMostrar.trim().toUpperCase() === 'S') {
        // ── Busca específica ──────────────────────────────────────
        const respostaPoke = await this.interfaceConsole.question(
          'Digite o nome ou ID do Pokémon:\n',
        );

        const encontrado = await showOne(respostaPoke);

        if (!encontrado) {
          console.log('Pokémon não encontrado na sua Pokédex.');
        } else {
          exibirPokemon(encontrado);
        }
      } else {
        // ── Mostrar todos ─────────────────────────────────────────
        const todos = await showAll();

        if (todos.length === 0) {
          console.log('Sua Pokédex está vazia.');
        } else {
          console.log(`\n══ SUA POKÉDEX (${todos.length} capturado(s)) ══`);
          todos.forEach(exibirPokemon);
        }
      }
    } catch (_error) {
      console.log('\nFalha ao realizar o processo.');
    } finally {
      this.interfaceConsole.close();
    }
  }
}