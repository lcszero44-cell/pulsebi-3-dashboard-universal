# PulseBI 3.0 — Plataforma Executiva Universal (Plug & Play)

> **Transforme qualquer planilha bagunçada em um painel gerencial completo em segundos** — sem banco de dados na nuvem, sem mensalidades, 100% local e privado.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/lcszero44-cell/pulsebi-3-dashboard-universal?style=social)](https://github.com/lcszero44-cell/pulsebi-3-dashboard-universal/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/lcszero44-cell/pulsebi-3-dashboard-universal?style=social)](https://github.com/lcszero44-cell/pulsebi-3-dashboard-universal/network/members)

---

## 🎯 Visão Geral

O **PulseBI 3.0** é uma plataforma executiva **universal, plug & play** que transforma qualquer planilha (`.xlsx`, `.xls`, `.csv`, `.json`), dados colados (`Ctrl+C` / `Ctrl+V`) ou link público do **Google Sheets** em um painel gerencial completo em segundos.

Aponta **metas, faturamento, gargalos e planos de ação** automaticamente — sem exigir banco de dados na nuvem, sem mensalidades, sem cadastro, sem instalação complexa. **Abre no navegador e funciona.**

### ✨ O que faz de diferente?

| Tradicional | PulseBI 3.0 |
|-------------|-------------|
| Requer servidor, banco, deploy | **Arquivo único `.html` — abre e roda** |
| Dados saem da empresa | **100% local — zero dados saem do seu navegador** |
| Mensalidades recorrentes | **Grátis, open source, seu para sempre** |
| Dias para configurar | **Segundos: arraste a planilha e pronto** |
| Um painel para cada necessidade | **Universal: adapta-se a qualquer segmento** |

---

## 🔒 Privacidade & Segurança Total

> **Seus dados nunca saem do seu computador.**

- ✅ **Zero servidor** — roda 100% no navegador (client-side/offline)
- ✅ **Zero telemetria** — nada é enviado, coletado ou rastreado
- ✅ **Zero cadastro** — não precisa de conta, e-mail ou login
- ✅ **Funciona offline** — após abrir uma vez, roda sem internet
- ✅ **Código aberto** — você audita cada linha no GitHub

Ideal para dados sensíveis: faturamento, folha de pagamento, pacientes, alunos, estoque, contratos.

---

## 🏢 Para Quais Segmentos Serve (Universal)

O PulseBI 3.0 **não é nichado** — ele detecta colunas automaticamente (Datas, Moedas, Números, Categorias) e funciona para **qualquer negócio que tenha dados em planilhas**:

| Segmento | Exemplos de Uso |
|----------|-----------------|
| 🍻 **Distribuidoras & Bebidas** | Vendas por rota/venedor, ruptura de SKU, meta vs. realizado, inadimplência por cliente |
| 💪 **Academias & Estúdios Fitness** | Frequência de alunos, renovação de planos, ticket médio, churn, aulas mais lotadas |
| 🏥 **Clínicas & Hospitais** | Atendimentos por convênio/médico, tempo de espera, glosas, faturamento por procedimento |
| 📡 **Provedores de Internet (ISP)** | Ativações vs. cancelamentos, churn por plano/região, ticket médio, SLA, inadimplência |
| 🔧 **Oficinas Mecânicas** | OS por técnico, peças mais usadas, tempo médio, faturamento por serviço, retorno de clientes |
| 👗 **Lojas de Roupas & Comércio** | Vendas por coleção/grade, estoque parado, curva ABC, sazonalidade, meta por vendedor |
| 🍽️ **Restaurantes & Food Service** | Pratos mais vendidos, ticket médio por período, custo de mercadoria (CMV), horários de pico |
| 📦 **Logística & Entregas** | Entregas no prazo vs. atraso, volume por rota/motorista, avarias, custo por km |
| 📋 **Separação/Picking & Estoque** | Produtividade por separador, rupturas, tempo médio de picking, acurácia de inventário |
| 👥 **RH & Pessoal** | Headcount, turnover, horas extras, absenteísmo, folha por centro de custo, férias vencidas |

> **Qualquer planilha com cabeçalho na primeira linha funciona.** O PulseBI lê, detecta tipos e monta o painel.

---

## ⚡ Principais Funcionalidades

### 📥 Entrada de Dados Flexível
- **Arraste e solte** múltiplos arquivos `.xlsx`, `.xls`, `.csv`, `.json` de uma vez
- **Ctrl+V direto** — cole tabela do Excel/Sheets/CSV no navegador
- **Link do Google Sheets** — cole o link público (`Qualquer pessoa com o link pode visualizar`)
- **Modelos prontos** — teste instantâneo com dados de exemplo (Distribuidora de Bebidas)

### 📊 KPIs Animados com Sparklines
- **Faturamento Total**, **Quantidade**, **Ticket Médio**, **Registros**, **Atingimento de Meta**
- Mini-gráficos de tendência (sparkline) em cada card
- Indicador visual de tendência (↑ alta, ↓ queda, → estável)
- Filtro por período: Todo, Mês Atual, Semana Atual, Personalizado

### 📈 Gráficos Executivos (Chart.js)
| Gráfico | Descrição |
|---------|-----------|
| **Meta vs. Realizado** | Barras mensais (realizado) + linha tracejada (meta) |
| **Meta Semanal** | Linha das últimas 12 semanas (realizado vs. meta) |
| **Comparativo Períodos (YoY)** | Barras agrupadas: Ano Atual vs. Ano Anterior por categoria |

### 💡 Insights Automáticos (IA Leve Local)
O PulseBI **analisa seus dados e aponta**:
- 🏆 **Líderes** — Top vendedor/produto/cliente com % de participação
- 📉 **Queda de ritmo** — Compara últimas 4 semanas vs. 4 anteriores (alerta se cair >20%)
- 📦 **Ruptura/Estoque parado** — Produtos sem venda nos últimos 30 dias
- 👥 **Clientes inativos** — Sem compra há >60 dias
- 🎯 **Meta não atingida** — Gap exato em valor e %
- ✅ **Meta superada** — Valor excedente

> Cada insight tem **botão de ação** que filtra a tabela automaticamente.

### 📋 Planilha Interativa (Edição Rápida)
- **Duplo clique / Enter** em qualquer célula para editar
- **Ctrl+Z** para desfazer última edição (histórico ilimitado)
- **Busca em tempo real** em toda a tabela
- **Exclusão de linhas** com confirmação
- **Exportação** para `.xlsx` e `.csv` (dados editados inclusos)

### 📄 Relatório Executivo & Diagnóstico
Gere um **HTML completo** pronto para **imprimir como PDF (Ctrl+P)** com:
- ✅ KPIs principais
- ✅ Gráficos (placeholder para captura)
- ✅ Insights automáticos
- ✅ Tabela de dados (primeiras 100 linhas)
- ✅ **Plano de Ação Imediato** — gerado automaticamente baseado nos insights

### 🖼️ Card Visual (PNG) para Redes/WhatsApp
Um clique gera um **card 1080x1350px** (formato Instagram/Stories/WhatsApp) com:
- Logo e nome da empresa
- 3 KPIs principais (Faturamento, Meta, Atingimento)
- Top 4 insights com cores semafóricas
- Rodapé "Gerado pelo PulseBI 3.0"

### 📱 Integração WhatsApp Nativa
- **Copiar Resumo** — texto formatado com Markdown do WhatsApp (KPIs + Insights + Plano de Ação)
- **Abrir no WhatsApp** — abre `wa.me` com mensagem pré-preenchida pronta para enviar

### 🎨 Personalização de Marca
- **Nome da empresa** — aparece no cabeçalho, título da aba, relatórios e cards
- **Logo** — URL pública ou Base64 (aparece no header, relatórios HTML e card PNG)
- Salvo no `localStorage` — persiste entre sessões

### 🌈 4 Temas Visuais Profissionais
| Tema | Cores | Ideal para |
|------|-------|------------|
| **🌊 Navy (Padrão)** | Azul escuro + Ciano | Uso geral, corporativo, noturno |
| **💜 Roxo Neon** | Roxo profundo + Magenta | Apresentações, modo escuro vibrante |
| **💚 Esmeralda BI** | Verde escuro + Esmeralda | Financeiro, crescimento, sustentabilidade |
| **☀️ Claro Corporativo** | Branco + Azul claro | Impressão, projeção, acessibilidade |

### 📺 Modo TV (Tela Cheia)
- **F11** ou botão na barra — remove header, maximiza gráficos e tabela
- Ideal para **dashboards em TV de escritório / sala de guerra**

### 👁️ Monitoramento de Pasta Local (Experimental)
- Configure uma pasta observada — novos arquivos `.xlsx/.csv` caem no PulseBI automaticamente
- *(Requer servidor local simples — veja seção de desenvolvedores)*

---

## 🚀 Como Instalar e Usar no Seu Computador

### Opção 1 — Sem Código / Sem Instalar Nada (Mais Rápida — Qualquer Pessoa)

> **Funciona no Windows, Mac, Linux — Chrome, Edge, Brave, Firefox**

1. **Baixe o projeto**
   - Clique no botão verde **Code** ▸ **Download ZIP** aqui no GitHub
   - Extraia a pasta no seu computador (Desktop, Documentos, onde preferir)

2. **Abra o PulseBI**
   - **Windows:** Dê dois cliques em `Abrir_PulseBI_Local.bat` **OU** em `PulseBI_3.0_Universal.html`
   - **Mac/Linux:** Dê dois cliques em `PulseBI_3.0_Universal.html` (abre no navegador padrão)

3. **Pronto!** O painel abre direto no navegador.
   - Arraste sua planilha (.xlsx, .csv, .json) na área pontilhada
   - Ou clique em **"Testar com Dados de Exemplo"** para ver funcionando
   - Ou cole dados com **Ctrl+V** / use link do **Google Sheets**

> ⚠️ **Nota sobre arquivos locais:** Alguns navegadores bloqueiam leitura de arquivos locais via `file://` por segurança. Se der erro ao carregar planilhas, use a **Opção 2** (servidor local) ou habilite `--allow-file-access-from-files` no Chrome.

---

### Opção 2 — Com Código via Terminal / Git (Para Desenvolvedores)

```bash
# 1. Clone o repositório
git clone https://github.com/lcszero44-cell/pulsebi-3-dashboard-universal.git

# 2. Entre na pasta
cd pulsebi-3-dashboard-universal

# 3. Abra direto no navegador (funciona na maioria dos casos)
# Windows:
start PulseBI_3.0_Universal.html
# Mac:
open PulseBI_3.0_Universal.html
# Linux:
xdg-open PulseBI_3.0_Universal.html

# OU suba um servidor local simples (recomendado para evitar bloqueios CORS):
# Opção A: Node.js (npx serve)
npx serve .

# Opção B: Python 3
python -m http.server 8080

# Opção C: PHP
php -S localhost:8080

# Opção D: VS Code Live Server (extensão)
# Clique com botão direito no index.html ▸ "Open with Live Server"
```

> **Por que servidor local?** Remove restrições de `file://`, permite monitoramento de pasta, Google Sheets e melhor performance.

---

## 📁 Estrutura do Projeto

```
pulsebi-3-dashboard-universal/
├── PulseBI_3.0_Universal.html   # 🎯 ARQUIVO PRINCIPAL (160 KB) — abra este
├── index.html                    # Cópia idêntica (para GitHub Pages / servidores)
├── Abrir_PulseBI_Local.bat       # Atalho Windows (duplo clique)
├── LEIA-ME_LOCAL.txt             # Instruções rápidas offline
├── .gitignore                    # Ignora node_modules, dist, .env, zips, etc.
├── package.json                  # Metadados (npm)
├── vite.config.js                # Build Vite (opcional)
├── tailwind.config.js            # Temas Tailwind (referência)
├── postcss.config.js             # PostCSS (referência)
├── src/                          # Fonte modular (Vite/React - opcional)
├── public/                       # Assets estáticos (opcional)
├── dist/                         # Build de produção (ignorado no git)
└── node_modules/                 # Dependências (ignorado no git)
```

> **Para usar: só precisa do `PulseBI_3.0_Universal.html` (ou `index.html`).** Todo o resto é opcional para desenvolvimento.

---

## 🛠️ Tecnologias (Zero Dependências Locais)

Tudo roda via **CDN** — não precisa `npm install`:

| Biblioteca | Uso | Versão |
|------------|-----|--------|
| **Tailwind CSS** | Estilização utilitária via CDN | 3.4.17 |
| **Chart.js** | Gráficos responsivos (barra, linha) | 4.4.1 |
| **SheetJS (xlsx)** | Leitura/escrita Excel (.xlsx, .xls, .csv) | 0.18.5 |
| **Inter Font** | Tipografia via Google Fonts | — |
| **Vanilla JS (ES6+)** | Lógica toda nativa, sem framework | — |

> **Tamanho total transferido:** ~400 KB (cacheável pelo navegador). Após primeira carga, roda offline.

---

## 📋 Requisitos Mínimos

| Requisito | Versão |
|-----------|--------|
| Navegador moderno | Chrome 90+, Edge 90+, Firefox 88+, Safari 14+ |
| JavaScript | Habilitado (padrão) |
| Resolução | 1280×720+ (responsivo até mobile) |
| Memória | 50 MB+ livres (planilhas grandes) |

> **Não precisa:** Node.js, Python, Docker, banco de dados, servidor web, conta na nuvem.

---

## 🎓 Casos de Uso Rápidos

### "Tenho uma planilha de vendas do mês no Excel"
1. Arraste o `.xlsx` no PulseBI
2. Veja KPIs, gráficos meta vs. realizado, insights de queda/ruptura
3. Clique **"Gerar Card Visual (PNG)"** → poste no WhatsApp da diretoria

### "Quero monitorar churn da academia"
1. Cole dados de alunos (Nome, Plano, Data Vencimento, Status) via Ctrl+V
2. Insights mostram: "X clientes vencendo nos próximos 7 dias", "Y inativos >30 dias"
3. Clique no insight → tabela filtrada → ligue/whatsappeie cada um

### "Preciso de relatório mensal pro conselho"
1. Carregue planilha consolidada do mês
2. Ajuste nome da empresa e logo no botão **Marca**
3. **Gerar Relatório HTML** → Ctrl+P → Salvar como PDF
4. **Copiar Resumo WhatsApp** → envie no grupo com plano de ação

### "TV na sala de vendas mostra meta em tempo real"
1. Abra `PulseBI_3.0_Universal.html?demo=true` no navegador da TV
2. Pressione **F11** (Modo TV)
3. Deixe rodando — atualize a planilha e recarregue (F5) quando quiser

---

## 🔧 Dicas Avançadas

### Preparar sua planilha para melhores resultados
| Coluna | Formato recomendado | Exemplo |
|--------|---------------------|---------|
| **Data** | ISO `YYYY-MM-DD` ou `DD/MM/YYYY` | `2024-01-15` ou `15/01/2024` |
| **Moeda** | Número com 2 casas (PulseBI detecta R$) | `1250.00` ou `R$ 1.250,00` |
| **Número** | Ponto ou vírgula decimal | `50` ou `3,5` |
| **Categoria** | Texto consistente | `Vendas`, `Estoque`, `Financeiro` |
| **Meta** | Coluna numérica chamada "Meta", "Target" ou "Objetivo" | `1000` |

> **Dica:** Primeira linha **sempre** = cabeçalhos. Linhas vazias no final são ignoradas.

### Atalhos de Teclado
| Tecla | Ação |
|-------|------|
| `Ctrl+Z` | Desfazer última edição na tabela |
| `F11` | Alternar Modo TV (tela cheia) |
| `Escape` | Fechar modais (Marca, Google Sheets) |
| `Enter` (na célula) | Confirmar edição |
| `Escape` (na célula) | Cancelar edição |

### Parâmetros de URL
| Parâmetro | Efeito |
|-----------|--------|
| `?demo=true` | Carrega dados de exemplo automaticamente |
| `?theme=purple` | Define tema inicial (navy, purple, emerald, light) |

Exemplo: `PulseBI_3.0_Universal.html?demo=true&theme=emerald`

---

## 🐛 Solução de Problemas

| Problema | Causa | Solução |
|----------|-------|---------|
| "Erro ao ler arquivo" ao abrir `file://` | Bloqueio CORS do navegador | Use **Opção 2** (servidor local `npx serve .`) |
| Google Sheets não carrega | Planilha não está pública | Compartilhar ▸ "Qualquer pessoa com o link pode visualizar" |
| Colunas de data não detectadas | Formato não padrão | Use `YYYY-MM-DD` ou `DD/MM/YYYY` na fonte |
| Gráficos não aparecem | Chart.js bloqueado | Verifique conexão (CDN) ou use servidor local |
| PNG não baixa | Pop-up bloqueado | Permita pop-ups para o site / `file://` |
| Ctrl+V não cola | Permissão de clipboard | HTTPS ou `file://` com flag `--allow-file-access-from-files` |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! 

```bash
# 1. Fork o repo
# 2. Crie branch: git checkout -b feature/nova-funcionalidade
# 3. Commit: git commit -m 'feat: descrição clara'
# 4. Push: git push origin feature/nova-funcionalidade
# 5. Abra Pull Request
```

### Ideias para contribuir
- 🌍 Internacionalização (i18n) — EN/ES
- 📊 Novos tipos de gráfico (funil, radar, heatmap)
- 🔌 Conectores: API REST, SQL, Firebase, Supabase
- 🤖 IA local (Transformers.js) para previsão de série temporal
- ♿ Acessibilidade (WCAG 2.1 AA) — foco, ARIA, contraste
- 📱 PWA completo (Service Worker, manifest, instalável)

---

## 📄 Licença

**MIT License** — Use, modifique, distribua, comercialize livremente.

```
MIT License

Copyright (c) 2024 PulseBI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙋 Suporte & Comunidade

| Canal | Link |
|-------|------|
| 🐛 **Issues / Bugs** | [GitHub Issues](https://github.com/lcszero44-cell/pulsebi-3-dashboard-universal/issues) |
| 💡 **Feature Requests** | [GitHub Discussions](https://github.com/lcszero44-cell/pulsebi-3-dashboard-universal/discussions) |
| ⭐ **Dê uma estrela** | Ajuda o projeto a crescer! |

---

## 🎉 Agradecimentos

- **Chart.js** — Gráficos bonitos e performáticos
- **SheetJS** — Leitura Excel no navegador
- **Tailwind CSS** — Estilização sem build
- **Inter Font** — Tipografia limpa e legível
- **Comunidade Open Source** — Por tornar tudo isso possível

---

<div align="center">

**Feito com ❤️ para quem decide com dados — não com achismo.**

**[⬆ Voltar ao topo](#pulsebi-30--plataforma-executiva-universal-plug--play)**

</div>