# NEXTJUDGE Roadmap

**Decision date:** 2026-11-27  
**Rule:** This is a target roadmap. Only the static prototype listed in the repository is currently implemented.

## Phase 0 — Preserve and validate the prototype
- Keep the existing bilingual static problem explorer working.
- Clearly label it as a demo: no login, server execution, judging, or AI.
- Use it to validate navigation, problem detail, and editor UX.
- Do not add pretend submission or AI results.

**Exit:** prototype remains stable; user feedback is captured.

## Phase 1 — Platform foundation
- Monorepo and CI.
- Next.js web app and NestJS modular-monolith API.
- PostgreSQL/Prisma, authentication, roles, audit logs.
- Problem and problem-version domain.
- Product analytics with privacy-conscious event design.

**Exit:** authenticated preview, migrations, health checks, role tests.

## Phase 2 — Core solve and judge
- Problem authoring and review.
- Monaco editor and draft sync.
- Custom input execution.
- Judge adapter, queue, isolated workers, normalized verdicts.
- Submission history and observability.

**Exit:** supported language submissions are reproducibly judged; hidden tests remain private; worker isolation and limits are verified.

## Phase 3 — AI Coach MVP (first differentiation)
- Progressive hints.
- Concept explanations.
- Code review and complexity discussion.
- Feedback on AI usefulness.
- Small reviewed evaluation set and prompt versioning.
- Quotas, token/cost logs, rate limits, privacy controls.

**Exit:** quality evaluation passes agreed thresholds; no hidden-test leakage; cost per active learner is measured; judge verdicts remain authoritative.

## Phase 4 — Learning intelligence
- Skill map and mastery evidence.
- Personalized learning path.
- Targeted problem recommendations.
- Independent re-solve checks.
- Learning dashboard.

**Exit:** users can see why a problem is recommended and progress is based on evidence, not AI guesses alone.

## Phase 5 — Competition
- Contest lifecycle and policy configuration.
- Scoreboard and rating history.
- Post-contest review and optional AI assistance where rules permit.

**Exit:** end-to-end contest passes integrity and reliability tests.

## Phase 6 — Education workflows
- Classrooms, assignments, teacher dashboards.
- Cohort-level learning reports.
- Organization permissions and privacy boundaries.
- Institution pilot.

**Exit:** real educator workflow validated in pilot.

## Phase 7 — Assessment and global expansion
- Employer assessments after security and reliability validation.
- English content quality and localization.
- Regional judge capacity, billing, support, and compliance.

**Exit:** operational, legal, load, incident-response, and backup-restore gates pass.

## Priority rule

AI Coach is the first differentiator, but it does not replace the foundational judge. Build reliable solve/judge primitives first, then deliver the AI MVP immediately after the first end-to-end judge flow. Keep contests and enterprise features behind that learning loop.

## Release gates

- Tests, lint, type-check, and build pass.
- Judge execution is isolated from web/API secrets and production systems.
- Hidden test data never reaches the client or AI provider.
- AI output is labeled, rate-limited, evaluated, and cost-accounted.
- Privacy, retention, age-appropriate controls, and user support are reviewed.
- No launch claim exceeds the implemented and verified feature set.
