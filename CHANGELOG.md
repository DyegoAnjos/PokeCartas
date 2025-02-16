# Changelog 🕗
## 1- Alterações no script_album.js
### Atualização do tratamento do input de pesquisa:
   * Foi ajustada a forma de sanitizar e converter o valor do input.
   * Agora, em vez de usar um índice numérico (dadosParaEnviar[0]) para atualizar o parâmetro, utiliza-se a propriedade nomeada: dadosParaEnviar.idPokemon = pokemon.id;
  Isso garante que o PHP receba o parâmetro esperado ($_POST['idPokemon']).
### Melhoria no fluxo assíncrono da pesquisa:
  * A função de callback associada ao botão de pesquisa (botaoPesquisarPokemon) foi transformada em uma função assíncrona (async), permitindo o uso do await para aguardar a resolução de fetchPokemon.
  * Essa mudança evita que o código continue sua execução antes de obter o resultado da API, garantindo que os dados enviados no POST estejam atualizados.
  * Tratamento da resposta da requisição:
  * Foi implementada a verificação se a resposta da API é um array e, caso a pesquisa não retorne Pokémon, o álbum é recarregado chamando CarregarTodosPokemon().

## 2- Alterações em app/PesquisaPokemon.php  
### Validação e uso adequado do valor enviado via POST:
* O script espera receber a chave "idPokemon" e realiza a busca do Pokémon no álbum do usuário autenticado.
* As mudanças feitas no JS garantem que o parâmetro seja corretamente enviado; ou seja, nenhum ajuste no PHP foi necessário, mas o fluxo de dados foi corrigido via frontend.

## 3- Alterações em app/CadastrarUsuario.php 
### Fluxo de cadastro e criação do álbum:
  * Após verificar se o usuário não existe, o cadastro é realizado e o ID do novo usuário é capturado.
  * Em seguida, é criado um álbum para o usuário, e são inseridos Pokémon iniciais no álbum.
  * A lógica já estava implementada, mas a revisão garante a integridade da criação e referência dos dados.
## 4- Outras melhorias e acréscimos gerais 
### Uso adequado de expressões regulares:
  * Foram definidas expressões regulares para identificar e substituir caracteres especiais no input (ex.: /[._%+@]/g).
  * A sintaxe e os delimitadores foram ajustados para garantir que sejam reconhecidos todos os caracteres indesejados.
### Padronização e consistência do código:
 * Melhor organização dos métodos assíncronos e do tratamento de erros (uso de try/catch com console.error e propagação do erro quando necessário).
 * Comentários e nomes de variáveis ajustados para facilitar a manutenção e entendimento do fluxo de execução.

## Resumo do Impacto das Mudanças 
* O fluxo de pesquisa de Pokémon agora aguarda a resposta da API (função fetchPokemon), garantindo que o valor do idPokemon seja corretamente atribuído antes de enviar os dados via POST.
* A passagem de parâmetros para PHP ficou mais consistente, reduzindo possíveis erros de mapeamento de dados.
* As melhorias na estrutura do código JavaScript tornam o tratamento de erros mais robusto e o fluxo assíncrono mais intuitivo para futuras manutenções.
