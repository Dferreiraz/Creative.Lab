/**
 * Reddit Tech Insights - Dashboard Application Logic
 * Gerenciamento de estado, dados, filtros, gráficos dinâmicos e persistência de temas.
 */

// ==========================================
// 1. Dados Base do Reddit (Extraídos)
// ==========================================
const initialData = {
  n8n: [
    {
      id: "1vukm6c",
      rank: 1,
      title: "Building an Autonomous Multi-Agent System (Hermes + MCP + n8n): Where should I start?",
      author: "Academic-Swan-9191",
      subreddit: "r/n8n",
      score: 35,
      ups: 35,
      comments: 14,
      upvote_ratio: 0.92,
      engagement: 60.6,
      url: "https://www.reddit.com/r/n8n/comments/1vukm6c/building_an_autonomous_multiagent_system_hermes/",
      summary: "Estudante de Ciência da Computação / IA expõe seu plano de construir times autônomos de agentes (Dev Web, Monitoramento Tecnológico e Marketing) orquestrados pelo n8n, utilizando Anthropic Claude via MCP (Model Context Protocol), Hermes e Hetzner VPS + Postgres.",
      tags: ["Agentes IA", "MCP", "Arquitetura", "Claude"]
    },
    {
      id: "1vubecg",
      rank: 2,
      title: "Classify contracts and track renewals in n8n – Google Drive to Sheets pipeline [Workflow Included]",
      author: "easybits_ai",
      subreddit: "r/n8n",
      score: 18,
      ups: 18,
      comments: 6,
      upvote_ratio: 1.0,
      engagement: 32.0,
      url: "https://www.reddit.com/r/n8n/comments/1vubecg/classify_contracts_and_track_renewals_in_n8n/",
      summary: "Workflow completo no n8n que monitora pastas no Google Drive, extrai datas de contratos, classifica categorias (SaaS, Serviços, Aluguéis) e calcula prazos de cancelamento antes de renovações automáticas, registrando no Google Sheets.",
      tags: ["Contratos", "Google Sheets", "IA Extratora", "Workflows"]
    },
    {
      id: "1vtxpcd",
      rank: 3,
      title: "Can I use Claude to create automation if I am running self-host via Docker?",
      author: "Vedant_Rana",
      subreddit: "r/n8n",
      score: 15,
      ups: 15,
      comments: 18,
      upvote_ratio: 0.86,
      engagement: 46.3,
      url: "https://www.reddit.com/r/n8n/comments/1vtxpcd/can_i_use_claude_to_create_automation_if_i_am/",
      summary: "Discussão na comunidade sobre a integração do Anthropic Claude com instâncias self-hosted do n8n via Docker para gerar e gerenciar fluxos de automação através de conversas e assistentes.",
      tags: ["Claude", "Docker", "Self-Hosted", "Dúvida Técnica"]
    },
    {
      id: "1vukelc",
      rank: 4,
      title: "Semrush starts at $139 a month. I built a free template that logs weekly Bing keyword rankings into Google Sheets",
      author: "ApifyEnthusiast1",
      subreddit: "r/n8n",
      score: 9,
      ups: 9,
      comments: 6,
      upvote_ratio: 1.0,
      engagement: 23.0,
      url: "https://www.reddit.com/r/n8n/comments/1vukelc/semrush_starts_at_139_a_month_i_built_a_free/",
      summary: "O autor compartilha um template gratuito para n8n que consulta posições de palavras-chave no Bing usando a API do Apify, comparando a oscilação de posições (+3, -6) e quantidade de anúncios concorrentes em uma planilha.",
      tags: ["SEO", "Bing", "Apify", "Google Sheets"]
    },
    {
      id: "1vur5d9",
      rank: 5,
      title: "I created a workflow that creates viral clips from YouTube videos using an open-source alternative API to OpusClip",
      author: "mutonbini",
      subreddit: "r/n8n",
      score: 9,
      ups: 9,
      comments: 2,
      upvote_ratio: 0.69,
      engagement: 15.45,
      url: "https://www.reddit.com/r/n8n/comments/1vur5d9/i_have_created_a_workflow_that_creates_viral/",
      summary: "Fluxo automatizado no n8n conectado à API open-source openshorts (com +3k estrelas no GitHub) que converte vídeos longos do YouTube em shorts virais, envia para aprovação via Telegram e agenda postagens automáticas.",
      tags: ["Open Source", "Cortes Vídeo", "Telegram", "Social"]
    }
  ],
  automacao: [
    {
      id: "1vt4d59",
      rank: 1,
      title: "Meu primeiro homelab (Servidor de Automação & Auto-hospedagem)",
      author: "alessandrojean",
      subreddit: "r/autohospedagem",
      score: 215,
      ups: 215,
      comments: 40,
      upvote_ratio: 1.0,
      engagement: 280.0,
      url: "https://www.reddit.com/r/autohospedagem/comments/1vt4d59/meu_primeiro_homelab/",
      summary: "Projeto brasileiro de grande sucesso onde o autor reaproveitou um PC antigo (Core i5-7400, 8GB RAM) instalando Fedora Server e Docker para hospedar serviços próprios e rotinas de automação doméstica.",
      tags: ["Homelab", "Docker", "Fedora Server", "Brasil"]
    },
    {
      id: "1vunl8r",
      rank: 2,
      title: "Does automating knowledge kill knowledge? (Automatizar conhecimento destrói o aprendizado?)",
      author: "Past-Ad2067",
      subreddit: "r/automation",
      score: 8,
      ups: 8,
      comments: 9,
      upvote_ratio: 1.0,
      engagement: 26.5,
      url: "https://www.reddit.com/r/automation/comments/1vunl8r/does_automating_knowledge_kill_knowledge/",
      summary: "Reflexão profunda sobre a automatização da busca de dados e resumos de IA para o Notion. O autor percebeu que ao automatizar a leitura e cópia, parou de reter informações na memória prática.",
      tags: ["Produtividade", "Notion", "IA", "Reflexão"]
    },
    {
      id: "1vvayrv",
      rank: 3,
      title: "Built a full CA firms Automation Suite on n8n with 5 use cases, one workflow and zero human follow-up",
      author: "_no__regrets_",
      subreddit: "r/automation",
      score: 3,
      ups: 3,
      comments: 3,
      upvote_ratio: 1.0,
      engagement: 12.5,
      url: "https://www.reddit.com/r/automation/comments/1vvayrv/built_a_full_ca_firms_automation_suite_on_n8n/",
      summary: "Suíte comercial completa para escritórios de contabilidade integrando n8n, Groq (Llama-3.3 70B), WhatsApp Cloud API e Telegram para gerenciar qualificação de leads, dúvidas frequentes e cobranças de tributos.",
      tags: ["Atendimento", "WhatsApp API", "Llama 3.3", "Groq"]
    },
    {
      id: "1vupzdw",
      rank: 4,
      title: "Running automation's state db on scale-to-zero Postgres?",
      author: "pretzels90210",
      subreddit: "r/automation",
      score: 2,
      ups: 2,
      comments: 5,
      upvote_ratio: 1.0,
      engagement: 14.5,
      url: "https://www.reddit.com/r/automation/comments/1vupzdw/running_automations_state_db_on_scaletozero/",
      summary: "Discussão técnica sobre como otimizar custos de bancos de dados para automações agendadas que rodam apenas alguns segundos por dia, utilizando instâncias PostgreSQL serverless com suporte a scale-to-zero.",
      tags: ["Postgres", "Serverless", "Scale-to-Zero", "Infra"]
    },
    {
      id: "1vrwjyu",
      rank: 5,
      title: "Automation code to use on Drive (Código de automação em Python para Google Drive)",
      author: "Front_Paper8305",
      subreddit: "r/PythonLearning",
      score: 8,
      ups: 8,
      comments: 3,
      upvote_ratio: 0.91,
      engagement: 17.05,
      url: "https://www.reddit.com/r/PythonLearning/comments/1vrwjyu/automation_code_to_use_on_drive_in_testing_phase/",
      summary: "Código em Python para automação de tarefas no Google Drive, com rotinas de verificação, organização e expurgo programático de fotos e mídias antigas.",
      tags: ["Python", "Google Drive", "Script", "Manutenção"]
    }
  ]
};

// ==========================================
// 2. Application State
// ==========================================
let currentTab = 'all'; // 'all' | 'n8n' | 'automacao'
let searchQuery = '';
let sortBy = 'engagement'; // 'engagement' | 'score' | 'comments'
let postsData = JSON.parse(JSON.stringify(initialData));
let trendChartInstance = null;

// ==========================================
// 3. Lifecycle Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initTabs();
  initSearch();
  initSort();
  initRefresh();
  initCharts();
  renderApp();
});

// ==========================================
// 4. Light / Dark Mode & Theme Persistence
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('reddit_insights_theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('reddit_insights_theme', newTheme);
  updateChartsTheme();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }
}

// ==========================================
// 5. Sidebar & Mobile Drawer
// ==========================================
function initSidebar() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close on clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 860 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }
}

// ==========================================
// 6. Tabs, Search & Filtering
// ==========================================
function initTabs() {
  const tabPills = document.querySelectorAll('.tab-pill');
  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tabPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentTab = pill.getAttribute('data-tab');
      renderApp();
      updateChartsData();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const globalSearchInput = document.getElementById('globalSearchInput');

  const handleSearch = (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchInput && e.target !== searchInput) searchInput.value = e.target.value;
    if (globalSearchInput && e.target !== globalSearchInput) globalSearchInput.value = e.target.value;
    renderPosts();
  };

  if (searchInput) searchInput.addEventListener('input', handleSearch);
  if (globalSearchInput) globalSearchInput.addEventListener('input', handleSearch);
}

function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderPosts();
    });
  }
}

function initRefresh() {
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.classList.add('loading');
      try {
        await fetchLiveRedditData();
      } catch (err) {
        console.warn("Live fetch notice:", err);
      } finally {
        setTimeout(() => {
          refreshBtn.classList.remove('loading');
          renderApp();
          updateChartsData();
        }, 600);
      }
    });
  }
}

// ==========================================
// 7. Live Reddit Extraction Helper
// ==========================================
async function fetchLiveRedditData() {
  try {
    const res = await fetch('https://www.reddit.com/r/n8n/new.json?limit=25');
    if (res.ok) {
      const data = await res.json();
      const extracted = (data.data?.children || []).map((c, idx) => {
        const d = c.data;
        const score = d.score || 0;
        const comments = d.num_comments || 0;
        const ratio = d.upvote_ratio || 1.0;
        const engagement = Number((score + (comments * 1.5) + (ratio * 5)).toFixed(2));
        return {
          id: d.id,
          rank: idx + 1,
          title: d.title,
          author: d.author,
          subreddit: d.subreddit_name_prefixed,
          score: score,
          ups: d.ups || score,
          comments: comments,
          upvote_ratio: ratio,
          engagement: engagement,
          url: `https://www.reddit.com${d.permalink}`,
          summary: d.selftext ? (d.selftext.slice(0, 240) + "...") : "Post com conteúdo visual e discussão na comunidade.",
          tags: ["Live Reddit", d.subreddit_name_prefixed]
        };
      });
      extracted.sort((a, b) => b.engagement - a.engagement);
      postsData.n8n = extracted.slice(0, 5).map((item, i) => ({ ...item, rank: i + 1 }));
    }
  } catch (e) {
    console.info("Fallback para dados extraídos locais devido a CORS/RateLimit do navegador.");
  }
}

// ==========================================
// 8. Aggregate Data Helpers
// ==========================================
function getCurrentFilteredList() {
  let list = [];
  if (currentTab === 'all') {
    list = [...postsData.n8n, ...postsData.automacao];
  } else {
    list = [...(postsData[currentTab] || [])];
  }

  if (searchQuery) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(searchQuery) ||
      p.summary.toLowerCase().includes(searchQuery) ||
      p.author.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery))
    );
  }

  list.sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'comments') return b.comments - a.comments;
    return b.engagement - a.engagement;
  });

  return list;
}

// ==========================================
// 9. Metrics & KPI Rendering
// ==========================================
function updateMetrics() {
  const allPosts = [...postsData.n8n, ...postsData.automacao];
  const list = currentTab === 'all' ? allPosts : (postsData[currentTab] || []);

  const totalPostsEl = document.getElementById('kpiTotalPosts');
  const totalCommentsEl = document.getElementById('kpiTotalComments');
  const avgEngagementEl = document.getElementById('kpiAvgEngagement');
  const topScoreEl = document.getElementById('kpiTopScore');

  const totalPosts = list.length;
  const totalComments = list.reduce((acc, p) => acc + (p.comments || 0), 0);
  const avgEngagement = totalPosts > 0 ? (list.reduce((acc, p) => acc + p.engagement, 0) / totalPosts).toFixed(1) : '0.0';
  const maxScore = totalPosts > 0 ? Math.max(...list.map(p => p.ups || p.score || 0)) : 0;

  if (totalPostsEl) totalPostsEl.textContent = totalPosts;
  if (totalCommentsEl) totalCommentsEl.textContent = totalComments;
  if (avgEngagementEl) avgEngagementEl.textContent = avgEngagement;
  if (topScoreEl) topScoreEl.textContent = `▲ ${maxScore}`;

  // Update Tab Badges
  const countAllEl = document.getElementById('tabCountAll');
  const countN8nEl = document.getElementById('tabCountN8n');
  const countAutoEl = document.getElementById('tabCountAuto');

  if (countAllEl) countAllEl.textContent = allPosts.length;
  if (countN8nEl) countN8nEl.textContent = postsData.n8n.length;
  if (countAutoEl) countAutoEl.textContent = postsData.automacao.length;
}

// ==========================================
// 10. Posts Feed Rendering
// ==========================================
function renderPosts() {
  const container = document.getElementById('postsContainer');
  if (!container) return;

  const list = getCurrentFilteredList();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3>Nenhum post encontrado</h3>
        <p>Tente ajustar os termos de busca ou selecionar outra categoria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(post => {
    const isN8n = post.subreddit.includes('n8n') || (postsData.n8n.some(p => p.id === post.id));
    const cardClass = isN8n ? 'n8n-card' : 'auto-card';
    const rankClass = post.rank === 1 ? 'rank-1' : post.rank === 2 ? 'rank-2' : post.rank === 3 ? 'rank-3' : 'rank-other';
    const ratioPercent = Math.round(post.upvote_ratio * 100);

    return `
      <article class="post-card ${cardClass}">
        <div class="post-header">
          <div class="post-meta-badges">
            <span class="rank-badge ${rankClass}">#${post.rank}</span>
            <span class="sub-badge">${post.subreddit}</span>
            <span class="author-text">por u/${post.author}</span>
          </div>
        </div>

        <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="post-title">
          ${post.title}
        </a>

        <p class="post-body">${post.summary}</p>

        <div class="post-tags">
          ${post.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
        </div>

        <div class="post-footer">
          <div class="metrics-pill-group">
            <div class="metric-pill score" title="Upvotes">
              ▲ ${post.ups} upvotes
            </div>
            <div class="metric-pill comments" title="Comentários">
              💬 ${post.comments} coment.
            </div>
            <div class="metric-pill ratio" title="Taxa de Aprovação">
              👍 ${ratioPercent}% aprovação
            </div>
            <div class="metric-pill engagement" title="Índice de Engajamento">
              🔥 ${post.engagement} engajamento
            </div>
          </div>

          <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="btn-open-reddit">
            <span>Ver no Reddit</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================
// 11. Charts Setup & Theme Sync
// ==========================================
function initCharts() {
  const ctx = document.getElementById('trendChart');
  if (!ctx || typeof Chart === 'undefined') return;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const textColor = isLight ? '#64748B' : '#94A3B8';
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)';

  const activeList = getCurrentFilteredList().slice(0, 6);
  const labels = activeList.map((p, idx) => `#${idx + 1} ${p.author.slice(0, 10)}`);
  const engagementData = activeList.map(p => p.engagement);
  const upvotesData = activeList.map(p => p.ups);

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Índice de Engajamento',
          data: engagementData,
          borderColor: '#00F2FE',
          backgroundColor: 'rgba(0, 242, 254, 0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00F2FE',
          pointBorderColor: '#FFFFFF',
          pointRadius: 5,
          borderWidth: 3
        },
        {
          label: 'Upvotes',
          data: upvotesData,
          borderColor: '#FF5C00',
          backgroundColor: 'rgba(255, 92, 0, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#FF5C00',
          pointBorderColor: '#FFFFFF',
          pointRadius: 5,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: { family: 'Inter', size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { family: 'Outfit', size: 13 },
          bodyFont: { family: 'Inter', size: 12 },
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
        }
      }
    }
  });
}

function updateChartsData() {
  if (!trendChartInstance) return;
  const activeList = getCurrentFilteredList().slice(0, 6);
  trendChartInstance.data.labels = activeList.map((p, idx) => `#${idx + 1} ${p.author.slice(0, 10)}`);
  trendChartInstance.data.datasets[0].data = activeList.map(p => p.engagement);
  trendChartInstance.data.datasets[1].data = activeList.map(p => p.ups);
  trendChartInstance.update();
}

function updateChartsTheme() {
  if (!trendChartInstance) return;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const textColor = isLight ? '#64748B' : '#94A3B8';
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)';

  if (trendChartInstance.options.scales.x) {
    trendChartInstance.options.scales.x.grid.color = gridColor;
    trendChartInstance.options.scales.x.ticks.color = textColor;
  }
  if (trendChartInstance.options.scales.y) {
    trendChartInstance.options.scales.y.grid.color = gridColor;
    trendChartInstance.options.scales.y.ticks.color = textColor;
  }
  if (trendChartInstance.options.plugins.legend) {
    trendChartInstance.options.plugins.legend.labels.color = textColor;
  }
  trendChartInstance.update();
}

// ==========================================
// 12. Main Render Pipeline
// ==========================================
function renderApp() {
  updateMetrics();
  renderPosts();
}
