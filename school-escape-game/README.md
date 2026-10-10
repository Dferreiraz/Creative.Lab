# 🎮 School Escape Game

Jogo 2D interativo desenvolvido com **HTML5 Canvas e JavaScript Vanilla** desenvolvido durante o curso Inteligência Artificial Generativa com Google Antigravity no SENAI Suiço-brasileira. O projeto simula um ambiente de fuga no qual o jogador precisa explorar o cenário, coletar itens essenciais e evitar inimigos para alcançar o objetivo final.

Desenvolvido durante o curso de **Inteligências Artificiais Generativas com Google Antigravity**, utilizando Inteligência Artificial como ferramenta de apoio à prototipagem da lógica do jogo e à geração de assets.

## 🎯 Mecânicas do Jogo

- **Objetivo:** coletar todas as chaves espalhadas pelo mapa e chegar à saída sem perder todas as vidas.
- **Controles:** utilize as setas do teclado ou as teclas `W`, `A`, `S` e `D` para movimentar o personagem.
- **Inimigos:** patrulham o ambiente. Ao entrar em contato com eles, o jogador perde uma vida e retorna à posição inicial.
- **Itens coletáveis:** as chaves são necessárias para destravar a porta de saída e concluir o nível.
- **Sistema de vidas:** gerencie suas vidas para evitar o Game Over e completar a missão.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** estrutura da página e utilização da Canvas API para renderização 2D.
- **CSS3:** estilização da interface e organização do layout.
- **JavaScript Vanilla (ES6+):** lógica do jogo, movimentação, colisões, eventos e gerenciamento de estado.
- **HTML5 Canvas API:** renderização de personagens, inimigos, itens e elementos do cenário.
- **Google Antigravity:** ferramenta de apoio ao desenvolvimento com Inteligência Artificial Generativa.

## 🧠 Conceitos Praticados

- **HTML5 Canvas API:** renderização de gráficos 2D diretamente no navegador, sem depender de engines externas.
- **Game Loop:** utilização de `requestAnimationFrame()` para atualizar o estado do jogo e renderizar os frames.
- **Detecção de colisão:** implementação de lógica matemática baseada em AABB (*Axis-Aligned Bounding Box*) para identificar interações entre o jogador, os itens e os inimigos.
- **Gerenciamento de estado:** controle de vidas, chaves coletadas e transições entre os estados de jogo, derrota e vitória.
- **Captura de eventos:** processamento de inputs do teclado para permitir a movimentação do personagem.
- **Lógica de inimigos:** implementação de comportamentos básicos de patrulhamento e interação com o jogador.
- **Organização de código:** separação das responsabilidades em diferentes arquivos JavaScript.

## 📂 Estrutura do Projeto

```text
school-escape-game/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── game.js
│   ├── player.js
│   ├── enemies.js
│   └── items.js
└── assets/
    └── img/
        └── ...
```

**Responsabilidades dos arquivos:**

| Arquivo | Descrição |
|---|---|
| `index.html` | Estrutura da página e inicialização do jogo. |
| `css/styles.css` | Estilização da interface e layout responsivo. |
| `js/game.js` | Loop principal e gerenciamento do estado do jogo. |
| `js/player.js` | Movimentação e renderização do jogador. |
| `js/enemies.js` | Comportamento e lógica dos inimigos. |
| `js/items.js` | Lógica de coleta e renderização dos itens. |
| `assets/img/` | Sprites, texturas e imagens utilizadas no jogo. |

## 🚀 Como Executar

### Pré-requisitos

- Navegador moderno, como Google Chrome, Microsoft Edge ou Firefox.
- Visual Studio Code (recomendado).
- Extensão **Live Server** para executar o projeto em um servidor local.

### Passo a passo

1. Clone o repositório ou abra a pasta do projeto.
2. Abra a pasta `school-escape-game/` no Visual Studio Code.
3. Instale a extensão **Live Server**, caso ainda não esteja instalada.
4. Clique com o botão direito no arquivo `index.html`.
5. Selecione **Open with Live Server**.
6. O jogo será aberto no navegador.

> **Observação:** também é possível abrir o arquivo `index.html` diretamente no navegador. Entretanto, utilizar o Live Server é recomendado para evitar possíveis problemas com o carregamento de recursos locais e as políticas de segurança do navegador.

## 👨‍💻 Autor

**Davi Ferreira**

Projeto desenvolvido para praticar conceitos de desenvolvimento web, lógica de programação e criação de jogos 2D com o apoio de Inteligência Artificial Generativa.

---

<p align="center">
  Desenvolvido com 🎮, ☕ e Inteligência Artificial.
</p>