# Cantina da Graça

O projeto Cantina da Graça é uma aplicação web desenvolvida para oferecer aos clientes uma experiência digital no processo de compra de produtos em uma cantina. Com um cardápio digital, os clientes podem visualizar, filtrar e pesquisar os produtos oferecidos, além de terem a facilidade de adicionar itens ao carrinho, ajustar as quantidades e finalizar suas compras sem a necessidade de fazer login. Por outro lado, os administradores têm acesso a um conjunto de ferramentas para gerenciar os produtos, categorias, estoque e pedidos, proporcionando um controle completo sobre o funcionamento da cantina.

**Este projeto está sendo utilizado na versão mobile.**

## Funcionalidades do Cliente

- **Cardápio Digital:** Visualize a lista de produtos oferecidos pela cantina.
- **Filtragem e Pesquisa:** Utilize filtros e pesquisas para encontrar os produtos desejados de forma rápida e eficiente.
- **Carrinho de Compras:** Adicione produtos ao carrinho, ajuste as quantidades, remova itens e finalize suas compras.
- **Finalização da Compra:** Após a finalização da compra, informe seu nome e aguarde o tempo estimado para se dirigir ao caixa e efetuar o pagamento.
- **Acompanhamento do Pedido:** Após o pagamento ser confirmado, acompanhe o status do seu pedido, sendo informado quando o produto estiver sendo preparado.

## Funcionalidades do Administrador

- **Gerenciamento de Produtos e Categorias:** Realize operações CRUD (Criar, Ler, Atualizar, Excluir) para administrar os produtos e suas respectivas categorias.
- **Controle de Estoque:** Mantenha o controle do estoque dos produtos, realizando ajustes conforme necessário.
- **Gerenciamento de Pedidos:** Visualize os pedidos recebidos, podendo alterar seus status para pendente, em andamento, concluído, entre outros.

## Tecnologias Utilizadas

- **Next.js:** Framework React para renderização do lado do servidor, proporcionando uma experiência de desenvolvimento moderna.
- **Typescript:** Adiciona tipagem estática ao JavaScript, proporcionando mais robustez ao código.
- **Styled-Components:** Biblioteca para estilização de componentes utilizando CSS-in-JS.
- **Material-UI:** Conjunto de componentes React com implementação do Material Design para uma interface moderna e responsiva.
- **Tanstack (ReactQuery):** Facilita o gerenciamento de estados e dados na aplicação, proporcionando uma experiência de desenvolvimento mais simples e eficiente.
- **Socket.io:** Biblioteca para comunicação em tempo real entre cliente e servidor, utilizada para atualizações dinâmicas nos pedidos.
- **Axios:** Cliente HTTP baseado em Promises para fazer requisições HTTP tanto do navegador quanto do Node.js.

## Como Executar o Projeto

1. Clone o repositório do projeto.
2. Instale as dependências utilizando npm ou yarn.
3. Execute o servidor de desenvolvimento com o comando `npm run dev` ou `yarn dev`.
4. Acesse a aplicação em seu navegador através do endereço local fornecido pelo servidor.

## Projeto em Produção

Este projeto está em produção e pode ser acessado através do seguinte link: [Cantina da Graça](https://cantinadagraca.vercel.app/).

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request com sugestões, correções ou novas funcionalidades para o projeto.

## Autores

- [Gustavo Taglianetti](https://github.com/GustavoTagli) - Desenvolvedor Frontend
- [Gustavo Taglianetti](https://github.com/GustavoTagli) - Desenvolvedor Backend

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
