# NEXTJUDGE AI Coach — Product Specification

**Status:** Proposed MVP specification. No AI Coach is implemented in the current repository.

## 1. Objective

Help users become better independent problem solvers. AI should explain, guide, and diagnose—not replace the user's thinking or the official judge.

## 2. MVP capabilities

### Progressive hint ladder
1. **Nudge:** identify a relevant concept or ask a guiding question.
2. **Approach:** explain a possible strategy without giving full code.
3. **Pseudocode:** outline the algorithm and key invariants.
4. **Solution review:** only when explicitly requested, discuss a complete approach or submitted code.

Users can choose to request the next level. Do not automatically reveal a full solution after one failed attempt.

### Explain
- Explain a concept in beginner-friendly language.
- Connect the concept to the current problem.
- State assumptions and distinguish general guidance from problem-specific facts.

### Review
- Review the user's submitted or pasted code.
- Identify likely correctness issues, edge cases, complexity, and readability concerns.
- Reference the user's code locations where possible.
- Never claim the code passed tests unless the judge reports that result.

### Recommend
- Recommend a small set of follow-up problems.
- Explain which skill each recommendation practices.
- Use observed performance and explicit user goals; allow users to correct the inferred level.

## 3. Inputs and boundaries

Permitted inputs, subject to privacy notice and user controls:
- Public problem statement and constraints.
- User's own source code and language.
- User-visible compiler messages and normalized judge verdict.
- User-selected learning goal and prior skill evidence.

Never send:
- Hidden test input/output.
- Private problem-setter materials not approved for AI processing.
- Production secrets, credentials, or unrelated personal data.
- Other users' private submissions or personal records.

AI output is advisory. The official judge remains the source of truth for execution results.

## 4. UX requirements

- Make hint depth explicit and user-controlled.
- Clearly label AI-generated content.
- Show loading, retry, and service-unavailable states.
- Provide helpful / not helpful feedback.
- Let users report incorrect, unsafe, or revealing responses.
- Offer a way to clear AI conversation history and explain retention.
- Do not interrupt the editor or replace user code automatically.
- Preserve keyboard navigation and responsive layouts.

## 5. Contest policy

- Practice mode: AI Coach can be enabled according to the user's plan and quota.
- Rated contest: AI assistance is off by default unless contest rules explicitly allow it.
- Practice contest: organizer may configure permitted assistance.
- Store the contest's assistance policy with contest metadata and audit relevant access.
- Never silently change assistance rules after a contest starts.

## 6. Technical design

Start inside the NestJS modular monolith as an AI domain module with provider adapters. Add an asynchronous worker for requests that need longer processing. Do not introduce a standalone AI microservice until measured scale or isolation needs justify it.

Required components:
- Provider interface and model routing.
- Prompt/template versioning.
- Context builder with strict data allowlist.
- User-level quotas and rate limits.
- Token and cost accounting.
- Output schema validation and safety checks.
- Evaluation dataset of original, licensed problems.
- Feedback and incident reporting.

## 7. Quality evaluation

Evaluate each prompt/model version against a reviewed set:
- Hint usefulness without answer leakage.
- Technical correctness.
- Alignment with official problem constraints.
- Appropriate uncertainty.
- Code-review issue precision.
- Complexity analysis correctness.
- Latency and cost.

Run regression evaluation before prompt or model changes. Keep human review for high-impact changes.

## 8. Privacy and safety

- Explain when source code is sent to an external AI provider.
- Minimize payloads and redact secrets where feasible.
- Define retention and deletion periods before launch.
- Do not train external or internal models on user code by default.
- Restrict staff access and log administrative access.
- Apply age-appropriate protections and guardian/legal review where required.
- Do not expose student-level analytics to classmates or public profiles.

## 9. Monetization guardrails

No unlimited AI plan before cost distribution is measured. Start with a capped included quota, usage visibility, and optional additional credits only after pricing and consumer-law review. Keep basic problem solving and official judging separate from paid AI allowances.
