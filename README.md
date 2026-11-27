# NEXTJUDGE

**Solve · Learn · Compete** — an AI-first hybrid programming platform for problem solving, structured learning, coding assessment, and competitive programming.

> **Current repository status:** this repository currently contains a bilingual static problem-explorer prototype. It does not provide accounts, a backend API, code execution, official judging, submissions, AI coaching, or persistent server-side user data. The strategy and architecture documents below describe the intended product, not shipped functionality.

## Product direction

- **Positioning:** Hybrid — online judge + coding assessment + competitive programming + learning platform.
- **Primary differentiator:** AI-first learning assistance that helps users understand mistakes, build concepts, and choose the next useful practice.
- **Core loop:** Solve → Diagnose → Coach → Practice → Reassess → Compete.
- **Initial market:** South Korea. **Long-term market:** global.

## Competitive strategy

Baekjoon Online Judge reopened on 2026-11-20 under Day1Company and announced free-service-centered operation. NEXTJUDGE will not compete primarily on raw problem count or by cloning an established judge. It will differentiate through a connected learning experience, explainable AI coaching, personal skill progression, and education workflows.

Official notice: https://www.acmicpc.net/board/view/166446

## Repository contents

- `index.html`, `app.js`, `problems.js`, `styles.css`, `demo.css`: current static demo.
- `docs/strategy/PRODUCT_STRATEGY.md`: product positioning, user journeys, and AI-first differentiation.
- `docs/strategy/AI_COACH_SPEC.md`: AI Coach MVP, safety, evaluation, and data boundaries.
- `docs/strategy/BUSINESS_STRATEGY.md`: customer segments, monetization hypotheses, and go-to-market.
- `docs/strategy/ROADMAP.md`: phased implementation and release gates.

## Intended architecture

The target architecture is a TypeScript monorepo with a Next.js web app, NestJS modular-monolith API, PostgreSQL/Prisma, Redis/BullMQ, and isolated judge workers. AI should initially be an API module/provider-adapter with asynchronous jobs where needed—not a premature standalone microservice. See the strategy docs before implementation.

## Development principles

1. Preserve the current static demo until the replacement web application reaches feature parity.
2. Keep product decisions, proposals, and implemented features explicitly distinguished.
3. Never execute untrusted submissions inside the web or API process.
4. Never expose hidden test cases to clients or AI providers.
5. Do not copy third-party problem statements, test data, or editorial content without permission.
6. Treat AI output as learning assistance, never as an official judge verdict.
7. Measure AI quality and per-user cost before expanding paid quotas.

## Status

| Area | Status |
|---|---|
| Bilingual static problem explorer | Prototype in repository |
| Backend, authentication, database | Not implemented |
| Official code execution and judging | Not implemented |
| AI Coach | Strategy/specification only |
| Contests, ratings, rankings | Strategy/specification only |
| Education and enterprise workflows | Strategy/specification only |

See [Product Strategy](docs/strategy/PRODUCT_STRATEGY.md), [AI Coach Spec](docs/strategy/AI_COACH_SPEC.md), [Business Strategy](docs/strategy/BUSINESS_STRATEGY.md), and [Roadmap](docs/strategy/ROADMAP.md).
