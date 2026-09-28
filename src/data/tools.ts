import { ToolItem, CategoryMeta, ToolCategory } from '../types';

export const CATEGORIES_DATA: CategoryMeta[] = [
  {
    id: 'ai',
    label: 'AI Core',
    description: 'Conversational reasoning, long-form drafting, and intelligent agents',
    iconName: 'Sparkles',
    accentColor: 'indigo',
    itemCount: 3,
  },
  {
    id: 'study',
    label: 'Study & Academic',
    description: 'Homework breakdown, formula solver, and English comprehension',
    iconName: 'GraduationCap',
    accentColor: 'blue',
    itemCount: 3,
  },
  {
    id: 'create',
    label: 'Creative Studio',
    description: 'Generative imagery, prompt engineering, and storytelling',
    iconName: 'Palette',
    accentColor: 'purple',
    itemCount: 3,
  },
  {
    id: 'productivity',
    label: 'Productivity',
    description: 'Multi-language translator, file analyzer, and text summarization',
    iconName: 'Zap',
    accentColor: 'emerald',
    itemCount: 3,
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'Code synthesis, runtime error debugger, and logic explainer',
    iconName: 'Terminal',
    accentColor: 'amber',
    itemCount: 3,
  },
];

export const TOOLS_DATA: ToolItem[] = [
  // --- AI ---
  {
    id: 'ai-chat',
    name: 'AI Chat',
    category: 'ai',
    categoryLabel: 'AI · Conversational Intelligence',
    description: 'Real-time intelligent conversational engine with multi-turn context retention.',
    longDescription: 'Engage in natural, nuanced dialogue across complex topics, brainstorm ideas, draft outlines, and explore multi-step problem solving with state-of-the-art conversational AI.',
    iconName: 'MessageSquare',
    targetNavTab: 'ai-chat',
    tags: ['chat', 'reasoning', 'dialogue', 'brainstorm', 'gpt', 'gemini'],
    samplePrompts: [
      'Compare asynchronous event loops in Node.js vs Python asyncio.',
      'Brainstorm 5 innovative feature ideas for an AI productivity app.',
      'Help me plan a 7-day study curriculum for advanced calculus.',
    ],
    features: [
      'Multi-turn contextual awareness',
      'System persona customization',
      'Exportable conversation transcripts',
      'Code syntax highlighting and markdown rendering',
    ],
    inputSpecs: [
      {
        id: 'message',
        label: 'Initial Message / Question',
        type: 'textarea',
        placeholder: 'Ask anything or provide context...',
        defaultValue: 'Summarize the core architectural benefits of micro-frontends vs monolithic single-page apps.',
      },
      {
        id: 'tone',
        label: 'Conversation Persona / Tone',
        type: 'select',
        options: ['Analytical & Concise', 'Creative & Descriptive', 'Friendly Mentor', 'Direct Technical Senior Engineer'],
        defaultValue: 'Analytical & Concise',
      },
    ],
    defaultMockOutput: `### Conversational Synthesis
Micro-frontends decompose a monolithic frontend into smaller, independently deliverable feature domains:

1. **Independent Deployability**: Teams ship checkout, catalog, and profile updates independently without coordinating release locks.
2. **Autonomous Tech Stacks**: Enables gradual migration of legacy frameworks without high-risk total rewrites.
3. **Fault Isolation**: A script error in a secondary widget does not crash the core application shell.

**Trade-off Note**: Requires robust shared design tokens and contract testing to prevent bundle duplication and visual drift.`,
  },
  {
    id: 'ai-writer',
    name: 'AI Writer',
    category: 'ai',
    categoryLabel: 'AI · Editorial & Copywriting',
    description: 'Long-form essay, article, copywriting, and professional draft generator.',
    longDescription: 'Transform brief bullet points or high-level concepts into polished essays, thought-leadership blog posts, press releases, or marketing landing page copy.',
    iconName: 'PenTool',
    targetNavTab: 'writer',
    tags: ['writing', 'essay', 'copywriting', 'blog', 'draft', 'article'],
    samplePrompts: [
      'Write an executive briefing on the future of renewable energy grid storage.',
      'Draft a high-conversion landing page headline and feature list for SaaS.',
      'Create an argumentative essay defending open-source software in healthcare.',
    ],
    features: [
      'Customizable tone, length, and reading grade level',
      'SEO keyword density suggestions',
      'Automated table of contents generation',
      'One-click format export (Markdown, Plaintext, HTML)',
    ],
    inputSpecs: [
      {
        id: 'topic',
        label: 'Writing Topic or Brief',
        type: 'textarea',
        placeholder: 'What would you like to write about?',
        defaultValue: 'The strategic advantages of adopting continuous integration in modern SaaS development teams.',
      },
      {
        id: 'format',
        label: 'Document Format',
        type: 'select',
        options: ['Executive Summary', 'Long-form Blog Article', 'Persuasive Essay', 'Technical Whitepaper Outline'],
        defaultValue: 'Executive Summary',
      },
    ],
    defaultMockOutput: `# Executive Briefing: Strategic CI/CD Adoption

## Executive Summary
Modern software engineering organizations face compounding velocity bottlenecks when manual integration cycles delay feedback loops. Implementing continuous integration (CI) reduces deployment risk and increases velocity.

### Strategic Outcomes:
- **Mean Time to Recovery (MTTR)** decreases by up to 60% through automated regression gates.
- **Developer Throughput** improves as branch divergence is resolved continuously rather than during release week crunches.
- **Quality Assurance**: Every pull request undergoes automated linting, test suites, and preview builds before merging.`,
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    category: 'ai',
    categoryLabel: 'AI · Executive Productivity Agent',
    description: 'Contextual task assistant, daily planner, and intelligent workflow agent.',
    longDescription: 'Organize chaotic schedules, structure action items from meeting notes, decompose large projects into manageable sprints, and automate routine planning.',
    iconName: 'Bot',
    targetNavTab: 'ai-chat',
    tags: ['assistant', 'planner', 'schedule', 'tasks', 'organization', 'workflow'],
    samplePrompts: [
      'Turn these messy meeting notes into a prioritized action matrix with assignees.',
      'Build a structured 4-hour focused deep work schedule for tomorrow morning.',
      'Draft an email politely rescheduling a team sync due to a deadline conflict.',
    ],
    features: [
      'Eisenhower Matrix categorization (Urgent vs Important)',
      'Calendar block time-estimation',
      'Meeting transcript action extraction',
      'Follow-up reminder generation',
    ],
    inputSpecs: [
      {
        id: 'tasks',
        label: 'Tasks, Notes, or Goals to Organize',
        type: 'textarea',
        placeholder: 'Paste notes or describe your day goals...',
        defaultValue: 'Prepare Q3 roadmap slides, review PR #142, send email to vendor, update team on API migration schedule.',
      },
      {
        id: 'priorityMode',
        label: 'Optimization Strategy',
        type: 'select',
        options: ['Deep Work (Eat That Frog)', 'Time Blocking (Pomodoro)', 'Eisenhower Matrix', 'Quick Wins First'],
        defaultValue: 'Deep Work (Eat That Frog)',
      },
    ],
    defaultMockOutput: `### Optimized Daily Execution Plan

**Focus Block 1: Deep Strategic Work (09:00 - 11:00)**
- [ ] Prepare Q3 roadmap slides (High impact, executive visibility)

**Focus Block 2: Engineering Review (11:15 - 12:00)**
- [ ] Code review for PR #142 (Prevents unblocking colleagues)

**Focus Block 3: Asynchronous Operations (13:30 - 14:30)**
- [ ] Draft & send vendor agreement query
- [ ] Post weekly Slack announcement regarding API migration schedule`,
  },

  // --- Study ---
  {
    id: 'homework-helper',
    name: 'Homework Helper',
    category: 'study',
    categoryLabel: 'Study · Concept & Homework Tutor',
    description: 'Step-by-step problem breakdown, concept explanations, and citations.',
    longDescription: 'Get pedagogical guidance that explains the foundational principles behind tough homework questions instead of just giving answers.',
    iconName: 'BookOpen',
    targetNavTab: 'study',
    tags: ['homework', 'study', 'tutor', 'explanation', 'school', 'concepts'],
    samplePrompts: [
      'Explain photosynthesis light-dependent reactions for a high school biology test.',
      'What caused the fall of the Roman Republic according to modern historians?',
      'Help me understand how supply and demand curves shift when taxes are introduced.',
    ],
    features: [
      'Socratic explanation mode (prompts critical thinking)',
      'Key terms and glossary generation',
      'Self-check quiz questions with answer keys',
      'Source citation suggestions',
    ],
    inputSpecs: [
      {
        id: 'question',
        label: 'Homework Question or Topic',
        type: 'textarea',
        placeholder: 'Enter your assignment question...',
        defaultValue: 'Explain why water has a high specific heat capacity and how this impacts Earths climate.',
      },
      {
        id: 'academicLevel',
        label: 'Academic Level',
        type: 'select',
        options: ['Middle School', 'High School (AP/IB)', 'Undergraduate College', 'General Conceptual'],
        defaultValue: 'High School (AP/IB)',
      },
    ],
    defaultMockOutput: `### Concept Breakdown: Water's Specific Heat Capacity

1. **Molecular Mechanism**:
   Water ($H_2O$) molecules form extensive networks of **hydrogen bonds**. When thermal energy is added, a substantial portion is absorbed breaking these hydrogen bonds before kinetic motion (temperature) increases.

2. **Thermodynamic Principle**:
   Specific heat capacity is the energy required to raise $1\\text{ g}$ of a substance by $1^\\circ\\text{C}$. Water's value is approximately $4.184\\text{ J/(g}\\cdot^\\circ\\text{C)}$, remarkably high compared to metals (e.g., iron at $0.45\\text{ J/(g}\\cdot^\\circ\\text{C)}$).

3. **Climate & Ecological Impact**:
   - **Thermal Buffering**: Oceans absorb solar radiation during summer with minimal temperature swings, releasing heat slowly during winter.
   - **Maritime vs Continental Climates**: Coastal cities (e.g., San Francisco) have mild temperature bands, whereas inland cities experience wide extremes.`,
  },
  {
    id: 'math-solver',
    name: 'Math Solver',
    category: 'study',
    categoryLabel: 'Study · Step-by-Step Mathematics',
    description: 'Algebra, calculus, geometry, and formula step-by-step solver with proofs.',
    longDescription: 'Solve complex equations with detailed intermediate algebraic manipulation, trigonometric identities, and calculus derivations with clean mathematical notation.',
    iconName: 'Calculator',
    targetNavTab: 'study',
    tags: ['math', 'calculus', 'algebra', 'geometry', 'equation', 'solver'],
    samplePrompts: [
      'Find the derivative of f(x) = (3x^2 + 5) / (2x - 1) using quotient rule.',
      'Solve the system: 2x + 3y = 12 and 4x - y = 5.',
      'Calculate the volume of a sphere with radius r = 7 cm.',
    ],
    features: [
      'Step-by-step intermediate equation breakdowns',
      'Derivative and integral calculus assistance',
      'LaTeX / formatted math output',
      'Graphical intuition and verification tips',
    ],
    inputSpecs: [
      {
        id: 'equation',
        label: 'Equation or Mathematical Problem',
        type: 'textarea',
        placeholder: 'Enter equation, e.g. 2x^2 + 5x - 3 = 0',
        defaultValue: 'Solve for x: 2x^2 + 5x - 3 = 0 using the quadratic formula.',
      },
      {
        id: 'detailLevel',
        label: 'Solution Depth',
        type: 'select',
        options: ['Full Step-by-Step with Explanation', 'Quick Formulaic Steps', 'Proof & Verification Only'],
        defaultValue: 'Full Step-by-Step with Explanation',
      },
    ],
    defaultMockOutput: `### Step-by-Step Solution: Quadratic Equation
**Equation**: $2x^2 + 5x - 3 = 0$

**Step 1: Identify coefficients**
- $a = 2$, $b = 5$, $c = -3$

**Step 2: Calculate the discriminant ($\\Delta = b^2 - 4ac$)**
$$\\Delta = (5)^2 - 4(2)(-3) = 25 - (-24) = 49$$
Since $\\Delta = 49 > 0$, there are two distinct real roots. Notice $\\sqrt{49} = 7$.

**Step 3: Apply the Quadratic Formula**
$$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{-5 \\pm 7}{2(2)} = \\frac{-5 \\pm 7}{4}$$

- **Root 1 ($+$)**: $x_1 = \\frac{-5 + 7}{4} = \\frac{2}{4} = \\frac{1}{2}$
- **Root 2 ($-$)**: $x_2 = \\frac{-5 - 7}{4} = \\frac{-12}{4} = -3$

**Final Solution**: $x = \\frac{1}{2}$ or $x = -3$`,
  },
  {
    id: 'english-helper',
    name: 'English Helper',
    category: 'study',
    categoryLabel: 'Study · Grammar, Lexicon & Essay Polish',
    description: 'Grammar verification, vocabulary enhancer, essay critique, and reading comprehension.',
    longDescription: 'Enhance your writing clarity, catch passive voice overuse, expand lexical variety, and receive structural critique on thesis statements and transitions.',
    iconName: 'SpellCheck',
    targetNavTab: 'study',
    tags: ['english', 'grammar', 'proofread', 'vocabulary', 'writing', 'essay'],
    samplePrompts: [
      'Proofread my admissions statement and strengthen the transition sentences.',
      'Provide 5 higher-register synonyms for "shows" and "proves" in academic writing.',
      'Check this paragraph for dangling modifiers and passive voice.',
    ],
    features: [
      'Grammar, punctuation, and syntax diagnostics',
      'Elevated academic vocabulary alternatives',
      'Thesis statement clarity scoring',
      'Readability level calculation (Flesch-Kincaid)',
    ],
    inputSpecs: [
      {
        id: 'text',
        label: 'Text to Review or Enhance',
        type: 'textarea',
        placeholder: 'Paste your paragraph or essay excerpt...',
        defaultValue: 'The study was conducted by researchers who showed that sleep deprivation has a big effect on students memory and it makes them perform bad on tests.',
      },
      {
        id: 'focus',
        label: 'Enhancement Focus',
        type: 'select',
        options: ['Academic Rigor & Conciseness', 'Grammar & Syntax Correction', 'Creative & Engaging Flow'],
        defaultValue: 'Academic Rigor & Conciseness',
      },
    ],
    defaultMockOutput: `### Editorial Critique & Revisions

**Identified Areas for Improvement**:
1. *Passive phrasing*: "The study was conducted by researchers who showed..." $\\rightarrow$ Active subject.
2. *Imprecise colloquialisms*: "big effect" $\\rightarrow$ "pronounced adverse impact".
3. *Grammatical error*: "perform bad" $\\rightarrow$ adverbial "perform poorly".

**Polished Academic Revision**:
> "Researchers demonstrated that acute sleep deprivation significantly impairs students' cognitive retention, precipitating measurable declines in examination performance."`,
  },

  // --- Create ---
  {
    id: 'image-tools',
    name: 'Image Tools',
    category: 'create',
    categoryLabel: 'Create · Generative Visual Studio',
    description: 'Generative image studio, variations, aspect-ratio reframing, and visual assets.',
    longDescription: 'Craft stunning visual concept art, product mockups, game textures, and web illustration assets with customizable prompt engineering styles.',
    iconName: 'Image',
    targetNavTab: 'image-tools',
    tags: ['image', 'art', 'generation', 'visual', 'graphics', 'design', 'photo'],
    samplePrompts: [
      'Minimalist architectural rendering of a glass pavilion surrounded by pine forest.',
      'Studio product photograph of stainless steel espresso tamper on slate counter.',
      'Futuristic dashboard UI wireframe card with dark glassmorphic styling.',
    ],
    features: [
      'Aspect ratio presets (16:9, 4:3, 1:1, 9:16)',
      'Style modifiers (Studio Photo, Isometric, 3D Render, Oil Painting)',
      'Negative prompt filtering',
      'Batch variations generator',
    ],
    inputSpecs: [
      {
        id: 'prompt',
        label: 'Visual Concept Description',
        type: 'textarea',
        placeholder: 'Describe subject, lighting, angle, mood, and textures...',
        defaultValue: 'Sleek brushed titanium mechanical keyboard on dark walnut desk, ambient moody blue studio rim lighting, 8k commercial product photo.',
      },
      {
        id: 'aspectRatio',
        label: 'Aspect Ratio',
        type: 'select',
        options: ['16:9 (Landscape / Hero)', '1:1 (Square / Avatar)', '4:3 (Editorial / Grid)', '9:16 (Vertical Mobile)'],
        defaultValue: '16:9 (Landscape / Hero)',
      },
    ],
    defaultMockOutput: `### Generative Visual Spec Configured
- **Subject**: Brushed titanium mechanical keyboard on dark walnut desk
- **Lighting Atmosphere**: Ambient moody blue studio rim lighting (contrast ratio 3.8:1)
- **Geometry**: 16:9 Landscape Aspect Ratio (1920x1080 rendered canvas)
- **Texture Profile**: Micro-brushed metallic sheen with diffused keycap reflections

*Phase 1 Foundation: Render pipeline canvas calibrated. Connected to generator backend in Phase 2.*`,
  },
  {
    id: 'prompt-generator',
    name: 'Prompt Generator',
    category: 'create',
    categoryLabel: 'Create · Prompt Engineering Lab',
    description: 'Engineered system prompts, roleplay definitions, and few-shot templates.',
    longDescription: 'Design bulletproof prompts with clear roles, constraints, input/output delimiters, edge-case guardrails, and few-shot examples for LLM models.',
    iconName: 'Sparkle',
    targetNavTab: 'image-tools',
    tags: ['prompt', 'llm', 'system-prompt', 'engineering', 'templates', 'guardrails'],
    samplePrompts: [
      'Generate a system prompt for a strict JSON API extraction bot.',
      'Create a roleplay prompt for an empathetic customer service trainer.',
      'Draft a few-shot prompt for classifying sentiment in user feedback reviews.',
    ],
    features: [
      'Few-shot demonstration scaffolding',
      'Chain-of-Thought (CoT) reasoning triggers',
      'Output schema enforcement (JSON / Markdown / XML)',
      'Hallucination prevention guardrail rules',
    ],
    inputSpecs: [
      {
        id: 'goal',
        label: 'Prompt Objective / Desired Output',
        type: 'textarea',
        placeholder: 'What should the prompt instruct the AI to do?',
        defaultValue: 'A specialized SQL performance auditor that reviews slow PostgreSQL queries and returns indexed schema recommendations.',
      },
      {
        id: 'outputFormat',
        label: 'Enforced Output Format',
        type: 'select',
        options: ['Strict JSON Schema', 'Markdown with Callout Boxes', 'Delimited XML Tags'],
        defaultValue: 'Markdown with Callout Boxes',
      },
    ],
    defaultMockOutput: `### Production-Ready System Prompt

\`\`\`markdown
# Role & Operational Objective
You are a Principal Database Administrator specializing in PostgreSQL query optimization, execution plan (EXPLAIN ANALYZE) interpretation, and index architecture.

# Instructions
1. Analyze the provided query for non-sargable predicates, full table scans, and join imbalances.
2. Provide explicit rewritten SQL queries using CTEs or composite indexes where beneficial.
3. Quantify expected index footprint vs write latency trade-offs.

# Guardrails
- NEVER suggest dropping constraints or disabling foreign keys.
- If execution statistics are missing, explicitly note assumptions regarding table cardinalities.
\`\`\``,
  },
  {
    id: 'story-generator',
    name: 'Story Generator',
    category: 'create',
    categoryLabel: 'Create · Narrative & Fiction Engine',
    description: 'Narrative fiction, scene outline, world-building, and character arc builder.',
    longDescription: 'Develop captivating stories with compelling character arcs, deep world-building lore, plot pacing outlines, and evocative descriptive prose.',
    iconName: 'Feather',
    targetNavTab: 'writer',
    tags: ['story', 'fiction', 'novel', 'creative', 'character', 'narrative'],
    samplePrompts: [
      'Outline a sci-fi mystery set on a deep-sea research station that lost contact.',
      'Write a tense dialogue scene between two rival architects in a cyberpunk city.',
      'Develop a backstory and flaw for an idealistic cartographer exploring forgotten lands.',
    ],
    features: [
      'Three-act and hero journey story structure outlines',
      'Character motivation, flaw, and dilemma generators',
      'Sensory description enhancer',
      'Scene pacing and cliffhanger hooks',
    ],
    inputSpecs: [
      {
        id: 'premise',
        label: 'Story Premise or Core Conflict',
        type: 'textarea',
        placeholder: 'Describe your idea, character, or setting...',
        defaultValue: 'An archivist working in the last physical library in a hyper-digitalized metropolis discovers an annotated manuscript that predicts tomorrow morning events.',
      },
      {
        id: 'genre',
        label: 'Genre & Atmosphere',
        type: 'select',
        options: ['Sci-Fi Mystery / Noir', 'High Fantasy', 'Historical Fiction', 'Psychological Thriller'],
        defaultValue: 'Sci-Fi Mystery / Noir',
      },
    ],
    defaultMockOutput: `### Scene Outline: "The Scribe's Invariant"

**Atmosphere**: Rain-streaked vaporlamps over bronze file cabinets; smell of oxidized cellulose and server coolant.

**The Inciting Discovery**:
Silas brushed archival talc from the vellum spine of Folio 409. In the margins, written in faded iron-gall ink that had clearly dried sixty years before his birth, was the exact flight manifest of the orbital shuttle that had crashed outside his district twenty minutes ago.

**Character Core**:
- **Silas Vance**: Third-generation archivist. Meticulous, hesitant, legally blind without optical filters.
- **The Core Conflict**: The next margin note bears tomorrow's date—and lists his own name alongside a municipal quarantine order.`,
  },

  // --- Productivity ---
  {
    id: 'translator',
    name: 'Translator',
    category: 'productivity',
    categoryLabel: 'Productivity · Multilingual Engine',
    description: 'Natural multi-language translator with dialect nuances and tone adjustment.',
    longDescription: 'Translate text between 50+ languages with contextual accuracy, preserving idioms, formality nuances, technical jargon, and cultural resonance.',
    iconName: 'Languages',
    targetNavTab: 'translator',
    tags: ['translate', 'language', 'spanish', 'french', 'japanese', 'german', 'mandarin'],
    samplePrompts: [
      'Translate this technical software contract from English to Japanese with business formality (Keigo).',
      'Convert marketing tagline into colloquial Spanish for Latin American audiences.',
      'Translate French customer support email into clear, empathetic English.',
    ],
    features: [
      'Formality tone toggle (Formal / Business / Casual)',
      'Side-by-side comparative inspection',
      'Grammatical explanation of subtle dialect choices',
      'Phonetic romanization support (Pinyin, Romaji)',
    ],
    inputSpecs: [
      {
        id: 'sourceText',
        label: 'Source Text to Translate',
        type: 'textarea',
        placeholder: 'Paste text in any language...',
        defaultValue: 'We are thrilled to welcome our new partners to the ecosystem and look forward to building scalable AI solutions together.',
      },
      {
        id: 'targetLanguage',
        label: 'Target Language',
        type: 'select',
        options: ['Spanish (Español)', 'Japanese (日本語)', 'French (Français)', 'German (Deutsch)', 'Mandarin (中文)', 'Portuguese (Português)'],
        defaultValue: 'Japanese (日本語)',
      },
    ],
    defaultMockOutput: `### Translated Output (Japanese / Business Keigo)

**翻訳 (Translation)**:
> 「エコシステムに新たなパートナーの皆様をお迎えできることを大変光栄に存じます。共に拡張性の高いAIソリューションを構築していけますことを心より楽しみにしております。」

**Cultural & Grammatical Notes**:
- Used humble honorific **「お迎えできることを大変光栄に存じます」** to convey respectful executive hospitality suitable for corporate partnerships.
- Adapted "scalable AI solutions" into **「拡張性の高いAIソリューション」** to match standard Japanese tech terminology.`,
  },
  {
    id: 'file-tools',
    name: 'File Tools',
    category: 'productivity',
    categoryLabel: 'Productivity · Document & Data Extraction',
    description: 'Document parsing, PDF analyzer, data extraction, and format conversions.',
    longDescription: 'Extract structured tables from PDFs, analyze text files, convert unstructured notes into JSON/CSV datasets, and parse tabular documents seamlessly.',
    iconName: 'FolderArchive',
    targetNavTab: 'files',
    tags: ['files', 'pdf', 'csv', 'documents', 'convert', 'extract', 'parse'],
    samplePrompts: [
      'Extract all financial line items and dates from this invoice text into CSV format.',
      'Parse messy meeting notes into structured JSON with attendees and action deadlines.',
      'Summarize key compliance clauses in this 10-page terms of service draft.',
    ],
    features: [
      'JSON, CSV, Markdown, and TXT parsing',
      'Table extraction and column normalization',
      'Redaction of PII (Personally Identifiable Information)',
      'Token count and document size analytics',
    ],
    inputSpecs: [
      {
        id: 'content',
        label: 'File Content or Document Text',
        type: 'textarea',
        placeholder: 'Paste raw document content, CSV, or invoice text...',
        defaultValue: 'Invoice #8492 - Acme Corp - Date: 2026-09-15 - Subtotal: $1,450.00 - Tax: $116.00 - Total Due: $1,566.00 - Paid: No',
      },
      {
        id: 'conversionTarget',
        label: 'Target Data Structure',
        type: 'select',
        options: ['Normalized JSON Object', 'Delimited CSV Matrix', 'Clean Markdown Summary Table'],
        defaultValue: 'Normalized JSON Object',
      },
    ],
    defaultMockOutput: `\`\`\`json
{
  "documentType": "Invoice",
  "invoiceId": "8492",
  "clientName": "Acme Corp",
  "issueDate": "2026-09-15",
  "financials": {
    "currency": "USD",
    "subtotal": 1450.00,
    "tax": 116.00,
    "totalDue": 1566.00,
    "isPaid": false
  },
  "parsedAt": "2026-09-27T23:26:00Z"
}
\`\`\``,
  },
  {
    id: 'summarizer',
    name: 'Summarizer',
    category: 'productivity',
    categoryLabel: 'Productivity · TL;DR Synthesis',
    description: 'Key takeaway extractor, executive bullet points, and TL;DR synthesis.',
    longDescription: 'Condense multi-page articles, research publications, transcripts, or email chains into bite-sized executive takeaways without sacrificing critical nuances.',
    iconName: 'AlignLeft',
    targetNavTab: 'files',
    tags: ['summary', 'tldr', 'condense', 'notes', 'executive', 'bullets'],
    samplePrompts: [
      'Provide a 3-bullet executive summary and 5 key action items from this report.',
      'Summarize this complex scientific research paper for a non-technical stakeholder.',
      'Create a 60-second TL;DR of this lengthy podcast transcript.',
    ],
    features: [
      'Custom length options (1 paragraph, 3 bullet points, full briefing)',
      'Key statistics and metric callouts',
      'Identified risks and unknowns section',
      'Actionable decision checklist',
    ],
    inputSpecs: [
      {
        id: 'sourceArticle',
        label: 'Article, Transcript, or Document Text',
        type: 'textarea',
        placeholder: 'Paste the long text to summarize...',
        defaultValue: 'Global cloud infrastructure expenditure expanded by 18% in fiscal year 2025, propelled largely by enterprise investments in specialized hardware accelerators for model fine-tuning. However, chief information officers surveyed reported that only 34% of pilot projects had reached full production deployment, citing security compliance hurdles and unpredictable inferencing cost models.',
      },
      {
        id: 'summaryLength',
        label: 'Summary Granularity',
        type: 'select',
        options: ['Executive 3-Bullet TL;DR', 'Comprehensive Analytical Briefing', 'One-Sentence Core Takeaway'],
        defaultValue: 'Executive 3-Bullet TL;DR',
      },
    ],
    defaultMockOutput: `### Executive TL;DR Summary

- **Market Growth**: Cloud infrastructure spending surged 18% in FY2025, heavily catalyzed by AI model fine-tuning investments.
- **Production Chasm**: Despite high capital allocation, only 34% of enterprise AI pilots have achieved full production rollouts.
- **Primary Bottlenecks**: Deployment velocity remains constrained by enterprise compliance governance and fluctuating inferencing expense volatility.`,
  },

  // --- Developer ---
  {
    id: 'code-assistant',
    name: 'Code Assistant',
    category: 'developer',
    categoryLabel: 'Developer · Polyglot Code Synthesis',
    description: 'Multi-language code generator, boilerplate scaffolding, and refactoring.',
    longDescription: 'Generate idiomatic, type-safe functions, REST endpoints, database schemas, and unit tests across TypeScript, Python, Go, Rust, and SQL with best practices.',
    iconName: 'Code',
    targetNavTab: 'coding',
    tags: ['code', 'typescript', 'react', 'python', 'developer', 'scaffold', 'api'],
    samplePrompts: [
      'Write a generic debounce hook in React with TypeScript and automatic unmount cleanup.',
      'Generate a rate-limiting middleware in Express with in-memory token bucket.',
      'Write an idempotent SQL migration adding a UUID primary key to users table.',
    ],
    features: [
      'Strict TypeScript and modern ES syntax',
      'Built-in error handling and edge-case guards',
      'Jest / Vitest unit test generation',
      'Time and space complexity analysis (Big-O)',
    ],
    inputSpecs: [
      {
        id: 'prompt',
        label: 'Coding Task / Specification',
        type: 'textarea',
        placeholder: 'Describe what function or module you need...',
        defaultValue: 'Create a custom React hook `useDebounce` that accepts a value and delay in milliseconds with TypeScript types.',
      },
      {
        id: 'targetLanguage',
        label: 'Language / Framework',
        type: 'select',
        options: ['TypeScript (React)', 'Python 3 (FastAPI)', 'Go (Standard Lib)', 'Rust (Tokio)', 'PostgreSQL / SQL'],
        defaultValue: 'TypeScript (React)',
      },
    ],
    defaultMockOutput: `\`\`\`typescript
import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 * Delays updating state until the specified interval has elapsed since the last change.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timeout on value or delay change to cancel intermediate timers
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\``,
  },
  {
    id: 'debugger',
    name: 'Debugger',
    category: 'developer',
    categoryLabel: 'Developer · Runtime Diagnostics & Bug Fixes',
    description: 'Runtime error diagnosis, stack trace analyst, and security vulnerability patcher.',
    longDescription: 'Paste confusing console errors, unhandled promise rejections, or memory leak profiles to receive exact root-cause analysis and drop-in code fixes.',
    iconName: 'Bug',
    targetNavTab: 'coding',
    tags: ['debug', 'error', 'stacktrace', 'fix', 'trace', 'exception', 'patch'],
    samplePrompts: [
      'Fix "TypeError: Cannot read properties of undefined (reading map)" in React.',
      'Diagnose deadlock in Go channels when using unbuffered worker pool.',
      'Solve CORS header missing error on preflight OPTIONS request.',
    ],
    features: [
      'Root-cause pinpointing in stack traces',
      'Side-by-side Before/After code diffs',
      'Edge-case regression avoidance notes',
      'Memory and lifecycle hazard warnings',
    ],
    inputSpecs: [
      {
        id: 'errorLog',
        label: 'Error Message, Stack Trace, or Broken Code',
        type: 'textarea',
        placeholder: 'Paste error stack trace and relevant code snippet...',
        defaultValue: 'Uncaught TypeError: Cannot read properties of undefined (reading "map") at UserList.tsx:14',
      },
      {
        id: 'runtimeEnv',
        label: 'Runtime Environment',
        type: 'select',
        options: ['Browser / React 19', 'Node.js / Express', 'Python / Django', 'Next.js App Router'],
        defaultValue: 'Browser / React 19',
      },
    ],
    defaultMockOutput: `### Root Cause Analysis: Undefined Array Access

**Cause**: The \`users\` state or prop is initializing as \`undefined\` during the component's initial render cycle before the asynchronous fetch completes. Calling \`.map()\` directly on undefined triggers the runtime TypeError.

### Recommended Fix (Defensive Optional Chaining & Defaulting):

\`\`\`tsx
// ❌ BEFORE (Unsafe direct map):
return (
  <ul>
    {users.map(user => <li key={user.id}>{user.name}</li>)}
  </ul>
);

// ✅ AFTER (Safe fallback with optional chaining or empty array default):
return (
  <ul>
    {(users ?? []).map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);
\`\`\`

**Best Practice**: Ensure your \`useState<User[]>([])\` initializes with an empty array \`[]\` rather than \`undefined\`.`,
  },
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    category: 'developer',
    categoryLabel: 'Developer · Algorithm & Architecture Deconstruct',
    description: 'Complex algorithm demystifier, docstring generator, and architecture mapper.',
    longDescription: 'Deconstruct dense regular expressions, complex recursive algorithms, mathematical shader routines, or unfamiliar open-source code into plain language explanations.',
    iconName: 'FileCode',
    targetNavTab: 'coding',
    tags: ['explain', 'code', 'regex', 'algorithm', 'architecture', 'docs', 'comments'],
    samplePrompts: [
      'Explain how the QuickSort partition algorithm works with pointers.',
      'Deconstruct this complex regular expression: ^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
      'Explain the difference between optimistic concurrency control and pessimistic locking.',
    ],
    features: [
      'Plain-English architectural breakdown',
      'Visual ASCII step-by-step state diagrams',
      'Algorithmic time complexity (O(n)) proofs',
      'JSDoc / Python Docstring generation',
    ],
    inputSpecs: [
      {
        id: 'codeSnippet',
        label: 'Code or Algorithm to Explain',
        type: 'textarea',
        placeholder: 'Paste code, regex, or algorithm...',
        defaultValue: 'const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn(...args); cache.set(key, result); return result; }; };',
      },
      {
        id: 'explanationStyle',
        label: 'Explanation Depth',
        type: 'select',
        options: ['Line-by-Line Breakdown', 'High-Level Architectural Summary', 'Performance & Edge-Case Audit'],
        defaultValue: 'Line-by-Line Breakdown',
      },
    ],
    defaultMockOutput: `### Code Breakdown: Higher-Order Memoization Function

This function is a **Closure-Based Cache Wrapper** designed to optimize pure computational functions:

1. **Closure State (\`const cache = new Map()\`)**:
   Creates an isolated lookup table in the outer function scope that persists across multiple calls.
2. **Spread Parameter Capture (\`(...args)\`)**:
   Returns an anonymous wrapper that accepts any number of arguments.
3. **Serialization Key (\`JSON.stringify(args)\`)**:
   Converts argument arrays into unique string hashes for Map indexing.
4. **Cache Check & Return**:
   Returns cached values in $O(1)$ time if present, bypassing repeated computation.

**Engineering Note**: Using \`JSON.stringify\` can cause memory overhead on large objects and fails with circular references or function arguments. Consider a \`WeakMap\` or specialized key generator for production scale.`,
  },
];

export const SAMPLE_HERO_QUERIES = [
  'Help me solve a quadratic equation step by step',
  'Write an executive briefing on renewable energy',
  'Debug a TypeError in my React state map function',
  'Translate English business proposal to Japanese',
  'Create an image prompt for a futuristic workspace',
  'Turn meeting notes into prioritized action items',
];
