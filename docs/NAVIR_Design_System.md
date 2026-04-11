# NAVIR Interno — Documentação do Design System

## 1. Paleta de Cores (CSS Variables HSL)

| Token | HSL | Uso |
|---|---|---|
| `--background` | 220 25% 97% | Fundo geral das páginas |
| `--foreground` | 215 50% 10% | Texto principal |
| `--primary` | 215 80% 16% | Azul-marinho escuro (botões, títulos) |
| `--primary-foreground` | 0 0% 100% | Texto sobre primary (branco) |
| `--secondary` | 207 90% 54% | Azul vibrante (CTAs, links, destaques) |
| `--secondary-foreground` | 0 0% 100% | Texto sobre secondary (branco) |
| `--accent` | 195 100% 45% | Ciano (destaques, ícones de área) |
| `--accent-foreground` | 0 0% 100% | Texto sobre accent (branco) |
| `--muted` | 210 20% 93% | Fundos sutis, áreas inativas |
| `--muted-foreground` | 215 15% 45% | Texto secundário / labels |
| `--destructive` | 0 84% 60% | Vermelho (erros, exclusão) |
| `--card` | 0 0% 100% | Fundo dos cards (branco) |
| `--border` | 214 25% 88% | Bordas e divisores |
| `--ring` | 207 90% 54% | Anel de foco (acessibilidade) |

### Cores adicionais (tokens semânticos)
| Token | HSL | Uso |
|---|---|---|
| `--navy-dark` | 215 80% 10% | Gradiente sidebar (mais escuro) |
| `--navy` | 215 80% 16% | Sidebar / header |
| `--navy-light` | 215 60% 25% | Gradiente sidebar (mais claro) |
| `--blue` | 207 90% 54% | Azul principal |
| `--blue-light` | 207 90% 65% | Hover de botões azuis |
| `--cyan` | 195 100% 45% | Destaques e ícones |
| `--cyan-light` | 195 100% 60% | Variante mais clara do ciano |
| `--success` | 142 70% 45% | Verde (status aprovado, ativo) |
| `--warning` | 38 92% 50% | Amarelo (alertas, pendente) |

### Sidebar
| Token | HSL | Uso |
|---|---|---|
| `--sidebar-background` | 215 80% 12% | Fundo da sidebar |
| `--sidebar-foreground` | 210 20% 90% | Texto da sidebar |
| `--sidebar-primary` | 207 90% 54% | Item ativo na sidebar |
| `--sidebar-accent` | 215 60% 20% | Hover de item na sidebar |
| `--sidebar-border` | 215 50% 20% | Borda da sidebar |

---

## 2. Tipografia

| Família | Fonte | Uso |
|---|---|---|
| **Heading** | [Orbitron](https://fonts.google.com/specimen/Orbitron) (400–900) | Títulos h1–h6, logotipos, métricas |
| **Body** | [Inter](https://fonts.google.com/specimen/Inter) (300–900) | Textos, labels, botões, formulários |

Carregadas via Google Fonts CDN no `index.css`.

Classes Tailwind: `font-heading` (Orbitron), `font-body` (Inter).

---

## 3. Gradientes

| Classe | Definição | Uso |
|---|---|---|
| `.bg-navy-gradient` | `linear-gradient(135deg, navy-dark → navy → navy-light)` | Fundo da tela de login, headers |
| `.bg-blue-gradient` | `linear-gradient(135deg, blue → cyan)` | Cards de destaque, badges premium |

---

## 4. Animações

| Nome | Tipo | Descrição |
|---|---|---|
| `triangle-pop` | CSS @keyframes | Confetti de triângulos ao salvar/cadastrar. Triângulos disparam do ponto de clique com rotação e escala para 0. |
| `float-triangle` | CSS @keyframes | Triângulos flutuantes no background (subindo e descendo com rotação). |
| `fade-in` | Tailwind animation | Entrada suave com translateY (10px → 0) + opacity. |
| `slide-in-left` | Tailwind animation | Sidebar deslizando da esquerda. |
| `accordion-down/up` | Tailwind animation | Abertura e fechamento de acordeões (Radix). |

### Confetti de Triângulos (`useTriangleConfetti`)
Hook customizado que cria 18 elementos `div` com formato de triângulo CSS (`border-left/right/bottom`), posicionados no ponto do clique, com animação de dispersão radial aleatória. Cores: azul, ciano, navy. Duração: 0.8s.

### Triângulos Flutuantes (`FloatingTriangles`)
Componente que renderiza N triângulos CSS posicionados aleatoriamente com animação infinita de flutuação. Usado como fundo decorativo na tela de login.

---

## 5. Componentes de UI

### Efeitos em Cards
| Classe | Efeito |
|---|---|
| `.metric-card` | Hover: translateY(-4px) + box-shadow azul (0 12px 40px) |
| `.status-dot` | Indicador circular de 8px para status |

### Raio de Borda
`--radius: 0.75rem` (12px), com variantes `lg`, `md` (10px), `sm` (8px).

---

## 6. Imagens e Assets

| Arquivo | Descrição | Uso |
|---|---|---|
| `logo-navir.png` | Logo principal do NAVIR (fundo transparente) | Login, sidebar |
| `nova-logo.png` | Logo alternativa do NAVIR | Disponível para uso |
| `startando-navir.png` | Logo do projeto "Startando com o NAVIR" | Referência de design |
| `mob4ai.png` | Logo do projeto MOB4AI | Card de projeto de exemplo |
| `area-robotica.png` | Ícone da área de Robótica | Dashboard (seção áreas) |
| `area-ia.png` | Ícone da área de Inteligência Artificial | Dashboard (seção áreas) |
| `area-visao.png` | Ícone da área de Visão Computacional | Dashboard (seção áreas) |
| `area-automacao.png` | Ícone da área de IoT/Automação | Dashboard (seção áreas) |

As imagens de referência estão no link: [Imagens de Referência site NAVIR](https://drive.google.com/drive/folders/1fd7Maa8b-2N9olCmS6vkGQRN860hHraK?usp=sharing)

Todas as imagens ficam em `src/assets/` do frontend e são importadas como módulos ES6.

---

## 7. Frameworks e Bibliotecas

### Core
| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 18.3 | Biblioteca de UI |
| **TypeScript** | 5.x | Tipagem estática |
| **Vite** | 5.x | Bundler e dev server |

### Estilização
| Tecnologia | Uso |
|---|---|
| **Tailwind CSS** v3 | Utility-first CSS com tokens semânticos |
| **tailwindcss-animate** | Plugin de animações para Tailwind |
| **@tailwindcss/typography** | Plugin de tipografia (prosa) |

### Componentes UI (shadcn/ui + Radix)
| Biblioteca | Componentes |
|---|---|
| **shadcn/ui** | Button, Card, Input, Label, Select, Tabs, Badge, Dialog, Sheet, Table, Tooltip, Toast, Progress, Avatar, Checkbox, etc. |
| **Radix UI** | Primitivos acessíveis (Accordion, Dialog, Dropdown, Popover, Tabs, Select, etc.) |
| **Lucide React** | Ícones vetoriais (LayoutDashboard, Users, Wifi, Fingerprint, FileText, etc.) |

### Roteamento e Estado
| Biblioteca | Uso |
|---|---|
| **React Router DOM** v6 | Roteamento SPA com rotas protegidas |
| **@tanstack/react-query** v5 | Gerenciamento de estado assíncrono |
| **React Context** | Autenticação e estado global (AuthContext) |

### Formulários e Validação
| Biblioteca | Uso |
|---|---|
| **React Hook Form** | Gerenciamento de formulários |
| **@hookform/resolvers** | Integração com Zod |
| **Zod** | Validação de esquemas |

### Outros
| Biblioteca | Uso |
|---|---|
| **Sonner** | Notificações toast elegantes |
| **Recharts** | Gráficos e visualizações |
| **date-fns** | Manipulação de datas |
| **class-variance-authority** | Variantes de componentes |
| **clsx / tailwind-merge** | Merge de classes CSS |
| **Vaul** | Drawer mobile |
| **Embla Carousel** | Carrossel |
| **React Resizable Panels** | Painéis redimensionáveis |

---

## 8. Estrutura de Layout

### Login
- Fundo: gradiente navy (`bg-navy-gradient`)
- Triângulos flutuantes decorativos
- Card central branco com logo, formulário e animação `fade-in`

### App (autenticado)
- **Sidebar** fixa à esquerda (fundo `sidebar-background`, ~240px)
  - Logo NAVIR no topo
  - Links de navegação com ícones Lucide
  - Indicador de item ativo (fundo `sidebar-accent`)
  - Botão de logout no rodapé
- **Área principal** à direita com padding e fundo `background`

### Dashboard
- Grid de cards de métricas com hover elevado (`.metric-card`)
- Seção de áreas do laboratório com ícones personalizados
- Cards com bordas arredondadas e sombra suave

---

## 9. Padrões de Design

- **Tokens semânticos**: Todas as cores são referenciadas via CSS variables HSL, nunca cores hardcoded
- **Acessibilidade**: Anel de foco via `--ring`, componentes Radix com ARIA
- **Responsividade**: Container centrado com max-width 1400px e padding 2rem
- **Animações**: Transições suaves (0.3s ease) em hovers e interações
- **Feedback visual**: Confetti de triângulos em ações de salvar/cadastrar (via `useTriangleConfetti`)
- **Consistência**: shadcn/ui como base de todos os componentes, customizados via design tokens
