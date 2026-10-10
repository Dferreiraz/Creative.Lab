<h1 align="center">⚡ Reddit Tech Insights</h1>

<p align="center">
  <strong>Dashboard Analítico e Pipeline de Inteligência de Dados sobre Automação & IA no Reddit</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge" alt="Status Concluído">
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-Modern_Theme-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
</p>

<p align="center">
  <a href="#-descrição-do-entregável">Descrição</a> •
  <a href="#-sobre-o-projeto">Sobre o Projeto</a> •
  <a href="#️-funcionalidades">Funcionalidades</a> •
  <a href="#-layout">Layout</a> •
  <a href="#-como-executar-o-projeto">Como Executar</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-como-contribuir">Como Contribuir</a> •
  <a href="#-autor">Autor</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 📄 Descrição do Entregável

O **Reddit Tech Insights** é uma solução completa de extração, análise e visualização de inteligência de mercado focada em tópicos de tecnologia e automação no Reddit (com ênfase em ecossistemas de **n8n**, **Agentes de IA**, **Workflows**, **Docker** e **Automação de Processos**) desenvolvido durante o curso Inteligência Artificial Generativa com Google Antigravity no SENAI Suiço-brasileira.

O projeto entrega:
1. **Pipeline de Coleta em Python** que consome a API pública do Reddit, processa métricas de relevância e calcula índices compostos de engajamento da comunidade.
2. **Dashboard Web Interativo e Responsivo** com suporte nativo a **Dark Mode** e **Light Mode** persistentes, indicadores de progresso radial inspirados em dashboards modernos, gráficos analíticos interativos de tendências e sistema dinâmico de filtragem e busca.

---

## 💻 Sobre o Projeto

### 🎯 Objetivo do Projeto
Transformar o fluxo caótico de postagens em fóruns técnicos do Reddit em insights acionáveis, destacando tendências de arquitetura, templates de automação e discussões de maior impacto da comunidade sem ruído informacional.

### 🧩 O Problema que Resolve
Desenvolvedores, engenheiros de automação e gestores de tecnologia frequentemente perdem discussões valiosas ou soluções inovadoras publicadas no Reddit devido ao alto volume diário de postagens. O Reddit Tech Insights resolve esse desafio aplicando algoritmos de ranqueamento que priorizam conteúdo técnico com alto índice de aprovação e engajamento.

### ⚙️ Funcionamento Geral
1. **Extração de Dados (`python/reddit_extractor.py`)**: Realiza requisições estruturadas para os feeds públicos do Reddit, filtrando discussões recentes sobre *n8n* e *automação*.
2. **Algoritmo de Engajamento**: Aplica uma fórmula ponderada para calcular o índice de engajamento:
   $$\text{Engajamento} = \text{Score} + (\text{Comentários} \times 1.5) + (\text{Upvote Ratio} \times 5)$$
3. **Dashboard Frontend (`index.html`, `src/styles/`, `src/js/`)**: Apresenta os dados visualmente através de cards de métricas (KPIs), gráficos de curvas de engajamento com Chart.js, feed responsivo com links diretos e filtros instantâneos.

---

## ⚙️ Funcionalidades

- [x] **Dashboard Analítico Completo**: Visão unificada de métricas, gráficos e postagens ranqueadas.
- [x] **Cards de KPIs com Anéis Radiais**: Indicadores visuais de total de posts, total de comentários, média de engajamento e top score.
- [x] **Gráficos Analíticos Dinâmicos**: Curva de engajamento vs. upvotes desenvolvida com Chart.js e distribuição temática de tecnologias.
- [x] **Light Mode & Dark Mode**: Alternância de tema com paleta balanceada mantendo as cores de marca (Laranja n8n e Ciano Neon).
- [x] **Persistência de Tema**: Preferência de tema armazenada automaticamente no `localStorage` do navegador.
- [x] **Sidebar de Navegação Responsiva**: Barra lateral completa que se transforma em drawer deslizante para dispositivos móveis e tablets.
- [x] **Filtros e Busca em Tempo Real**: Filtro por categoria (Todos, n8n, Automação), busca por palavras-chave/autores e ordenação customizada (Engajamento, Upvotes, Comentários).
- [x] **Sincronização Live com Reddit API**: Botão funcional no header para recarregar dados diretamente dos servidores do Reddit com fallback inteligente.
- [x] **Script de Coleta em Python**: Extrator independente em Python com exportação JSON estruturada.

---

## 🎨 Layout e Estrutura Visual

A interface foi projetada com base nas melhores práticas de UI/UX para dashboards analíticos:
- **Tema Escuro (Padrão)**: Fundo escuro profundo (`#0B0F19`), cartões com efeito de vidro (*glassmorphism*), bordas sutis e destaques em gradientes vibrantes.
- **Tema Claro**: Fundo suave (`#F4F6FB`), superfícies limpas (`#FFFFFF`), mantendo o contraste e a legibilidade dos dados.
- **Hierarquia Visual**:
  - **Sidebar**: Identidade visual, navegação principal e indicador de status do pipeline.
  - **Header / Topbar**: Trilha de navegação (*breadcrumb*), pesquisa global, botão de tema e sincronização ao vivo.
  - **Grid de KPIs**: 4 cartões com indicadores circulares e destaques de tendências.
  - **Painel Analítico**: Gráfico de linha/área responsivo e barra de distribuição percentual das tecnologias.
  - **Feed de Publicações**: Cartões detalhados com pílulas de rank (`#1`, `#2`, etc.), tags temáticas, métricas e botão de redirecionamento direto para a thread no Reddit.

---

## 📁 Estrutura de Pastas

```text
reddit-tech-insights/
├── index.html                  # Página principal do dashboard
├── README.md                   # Documentação completa do projeto
├── src/
│   ├── styles/
│   │   └── styles.css          # Estilização completa, variáveis e temas
│   └── js/
│       └── app.js              # Lógica do dashboard, gráficos e persistência
└── python/
    ├── reddit_extractor.py     # Script extrator de dados do Reddit
    └── extracted_data.json     # Dataset gerado pela extração (gerado ao rodar)
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Navegador Web Moderno** (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, etc.).
- **Python 3.8+** instalado no sistema (apenas para executar o extrator).

---

### 1. Executando o Extrator Python (Opcional / Backend)

O extrator utiliza exclusivamente bibliotecas nativas da biblioteca padrão do Python (`urllib.request`, `json`, `time`, `os`), **não necessitando de instalação de pacotes externos via pip**.

1. Abra o terminal na pasta raiz do projeto:
```bash
python python/reddit_extractor.py
```

2. O script irá:
   - Coletar as postagens mais recentes de `r/n8n` e buscas de `automação`.
   - Calcular os índices de engajamento.
   - Exibir o ranking consolidado no console do terminal.
   - Salvar o arquivo estruturado `python/extracted_data.json`.

---

### 2. Executando o Dashboard Frontend

Por ser uma aplicação web vanilla (HTML5, CSS3, JavaScript):

1. **Opção A (Direta no Navegador)**:
   - Basta abrir o arquivo `index.html` com duplo clique no seu navegador preferido.

2. **Opção B (Via Live Server / Servidor Local)**:
   - Utilizando a extensão **Live Server** no VS Code / Antigravity IDE: clique com o botão direito em `index.html` e selecione **Open with Live Server**.
   - Ou via Python HTTP Server na raiz do projeto:
   ```bash
   python -m http.server 8080
   ```
   - Acesse `http://localhost:8080` no navegador.

---

## 🛠 Tecnologias

### Front-End
- **HTML5**: Estruturação semântica (`<aside>`, `<header>`, `<main>`, `<section>`, `<article>`).
- **CSS3**: Variáveis CSS, Glassmorphism, Flexbox, CSS Grid, Animações e Media Queries responsivas.
- **JavaScript (ES6+)**: Manipulação de DOM, Fetch API, LocalStorage e gerenciamento de estado.
- **Chart.js**: Biblioteca leve via CDN para renderização de gráficos interativos.
- **Google Fonts**: Tipografias modernas *Outfit* e *Inter*.

### Data & Scripting
- **Python 3**: Script de extração e tratamento dos dados.
- **Reddit JSON API**: Endpoint público para consulta de feeds técnicos.

---

## 💪 Como Contribuir

1. Faça um **Fork** deste repositório.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'feat: Adiciona novo card de análise de sentimento'
   ```
4. Faça o push para a branch:
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um **Pull Request**.

---

## 🦸 Autor

Desenvolvido por **Davi Ferreira**  
Estudos em Inteligência Artificial Generativa.

---

## 📝 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
