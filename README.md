# AI HUB 360

Everything AI. One powerful workspace. Chat, learn, create, translate, code and work smarter in one place.

AI HUB 360 is a production-quality modular SaaS foundation built with React, TypeScript, and Tailwind CSS. It provides a centralized cognitive workstation designed to scale from 15 foundational tools into an expansive ecosystem of AI utilities across studying, writing, translation, coding, images, files, and everyday productivity.

---

## 🚀 Key Features (Phase 1 Foundation)

### 1. Unified Cognitive Navigation
- **Desktop Sidebar**:
  - `Home`: Main workspace dashboard with intelligent prompt router and domain catalog
  - `AI Chat`: Conversational intelligence & multi-turn reasoning suite
  - `Study`: Homework breakdown, step-by-step calculus/math solver, and English grammar critique
  - `Writer`: Long-form essays, executive briefings, and narrative fiction
  - `Translator`: Contextual multi-language localization with formal honorific support
  - `Image Tools`: Generative prompt engineering and visual studio framing
  - `Coding`: Polyglot code synthesis, runtime error debugger, and algorithmic deconstructor
  - `Files`: Document parsing, PDF data extraction, and executive TL;DR summarizer
  - `Favorites`: Pinned quick-access tools with local persistence
  - `History`: Audit trail of queries, tool launches, and workspace interactions
  - `Settings`: Full theme, language, and interface customization
- **Mobile-First Ergonomics**:
  - Single-handed bottom navigation bar ($\le 15\%$ viewport height)
  - Quick-access touch drawer with 44px+ hit targets
  - Fluid responsiveness across 320px, 768px, 1024px, and 1440px desktop baselines

### 2. Intelligent Tool Router & Global Search
- **"Ask Anything" Hero Input**: Natural language keyword analyzer automatically matches intent to the optimal tool (e.g. typing a quadratic equation routes directly to Math Solver; typing an error trace routes to Debugger).
- **Instant Search**: Fast client-side tool search by title, category, description, and keywords (`⌘K` / `Ctrl+K` global keyboard shortcut).
- **Segmented Domain Filters**: Category controls with real-time tool counts.

### 3. Interactive Tool Workspace Sandbox
- **Zero Dead Clicks**: Every tool card features an "Open" button launching a dedicated parameter modal.
- **Contract Schemas**: Standardized `inputSpecs` defining parameter types (text, textarea, select) and sample prompts.
- **Sandbox Simulation**: Test execution environment generating realistic output with one-click clipboard copying.
- **Clear Roadmap Signaling**: Unambiguously informs users of Phase 1 workspace status and Phase 2 live model hookups.

### 4. Enterprise Architecture & Data Layer
- **Local Persistence**: Zero-backend requirement for Phase 1. Tool favorites, activity logs, theme mode, and interface preferences automatically persist via `localStorage`.
- **Anti-Slop Design Constitution**: Strict zero-pill metadata discipline, typographic hierarchy (`Plus Jakarta Sans` + `JetBrains Mono`), 60-30-10 color allocation, and single-elevation cards.
- **Dark & Light Modes**: Real-time theme toggling with system color-scheme listener.

---

## 📁 Project Structure

```
├── src/
│   ├── assets/             # Visual assets & avatars
│   ├── components/         # Reusable presentation components
│   │   ├── CategoryFilter.tsx  # Interactive domain filter tabs
│   │   ├── HeroSection.tsx     # Hero header & smart prompt input box
│   │   ├── MobileNav.tsx       # Thumb-friendly bottom nav & drawer
│   │   ├── Navbar.tsx          # Top bar with search, theme & profile
│   │   ├── Sidebar.tsx         # Desktop primary navigation
│   │   ├── Toast.tsx           # Feedback notifications
│   │   ├── ToolCard.tsx        # Standardized tool card with actions
│   │   └── ToolModal.tsx       # Interactive sandbox execution dialog
│   ├── context/
│   │   └── AppContext.tsx      # Global state (theme, favorites, history, settings)
│   ├── data/
│   │   └── tools.ts            # Centralized tool registry & category metadata
│   ├── types/
│   │   └── index.ts            # Core TypeScript interfaces & contracts
│   ├── views/
│   │   ├── CategoryView.tsx    # Dedicated domain suite view
│   │   ├── FavoritesView.tsx   # Pinned favorites collection
│   │   ├── HistoryView.tsx     # Chronological activity log
│   │   ├── HomeView.tsx        # Main dashboard view
│   │   └── SettingsView.tsx    # Appearance, language & data management
│   ├── App.tsx             # Root workspace container
│   ├── index.css           # Tailwind CSS v4 & custom typography
│   └── main.tsx            # Application entrypoint
├── metadata.json           # Studio metadata and capabilities
├── package.json            # Dependencies & scripts
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 🛠️ Adding New Tools (Phase 2 Extension Guide)

To register a new tool in AI HUB 360, add a single entry to `TOOLS_DATA` in `src/data/tools.ts`:

```typescript
{
  id: 'my-new-tool',
  name: 'My New Tool',
  category: 'ai', // 'ai' | 'study' | 'create' | 'productivity' | 'developer'
  categoryLabel: 'AI · Sub-category',
  description: 'Short one-line synopsis',
  longDescription: 'Detailed architectural overview of capabilities',
  iconName: 'Sparkles', // Any Lucide icon
  tags: ['search', 'keywords'],
  samplePrompts: ['Example prompt 1', 'Example prompt 2'],
  features: ['Feature 1', 'Feature 2'],
  inputSpecs: [
    {
      id: 'inputParam',
      label: 'Parameter Name',
      type: 'textarea',
      placeholder: 'Enter content...',
      defaultValue: 'Default sample data'
    }
  ],
  defaultMockOutput: 'Generated markdown or code output'
}
```

The tool will automatically appear in search, category filters, counts, favorites, and workspace modals without modifying any UI components.

---

## 💻 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & JetBrains Mono
- **Build**: Vite 8
