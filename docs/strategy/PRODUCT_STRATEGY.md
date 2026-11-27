# NEXTJUDGE Product Strategy

**Decision date:** 2026-11-27  
**Status:** User-confirmed strategic direction; implementation not yet complete.

## 1. Strategic decision

- **Positioning: HYBRID.** Combine online judging, coding interview practice, competitive programming, structured learning, and education workflows.
- **Primary competitive advantage: AI-FIRST.** AI should make the platform measurably better at helping a learner understand, improve, and choose what to practice next.
- **Product promise:** Do not only tell users whether code is correct. Help them understand why, learn the missing concept, and make the next attempt more effective.

Core pillars:
- **SOLVE:** original problems, editor, execution, judging, submission history.
- **LEARN:** AI Coach, concept explanations, skill diagnosis, personalized practice paths.
- **COMPETE:** contests, ratings, rankings, team/school events.
- **ASSESS:** coding assessments and interview practice.
- **EDUCATE:** classrooms, assignments, teacher dashboards, learning reports.

## 2. Market context and competitive response

Baekjoon Online Judge officially announced that it reopened on 2026-11-20 under Day1Company. Its official notice says the prior paid services ended and the service is centered on free access. It also says existing member information, submission records, problems, and judging data were transferred.

Official source: https://www.acmicpc.net/board/view/166446

Strategic implications:
1. Basic problem browsing and judging are table stakes, not a sufficient differentiator.
2. Avoid a problem-count arms race against a mature platform with an established community and historical records.
3. Do not copy Baekjoon or other platforms' statements, test data, solutions, or editorial content without an explicit license.
4. Build a complementary reason to use NEXTJUDGE: learning diagnosis, AI guidance, structured progression, and institution workflows.
5. Keep core solving and public competition accessible; monetize differentiated assistance and operational value rather than access to every basic problem.

## 3. Target users and jobs-to-be-done

| Segment | Job | NEXTJUDGE value |
|---|---|---|
| Beginner | Understand fundamentals and avoid getting stuck | Guided hints, concept explanations, easy progression |
| School/university learner | Build skills and track progress | Skill map, practice plans, contests |
| Interview candidate | Prepare for timed assessments | Interview sets, code review, complexity feedback |
| Competitive programmer | Improve speed and problem-solving breadth | Contests, ratings, post-contest review |
| Educator | Assign, monitor, and explain learning | Classroom, assignments, cohort analytics |
| Hiring/engineering team | Assess relevant skills consistently | Assessment workflows and structured reports |

## 4. Differentiated learning loop

**Solve → Diagnose → Coach → Practice → Reassess → Compete**

1. Solve: user attempts a problem and receives an official judge verdict.
2. Diagnose: system identifies likely knowledge gaps from permitted submission and learning signals.
3. Coach: AI provides progressive hints, concept explanations, and code feedback.
4. Practice: user receives a small number of targeted follow-up problems.
5. Reassess: mastery is updated only from evidence such as independent attempts and successful solutions.
6. Compete: contests give users a way to apply skills under time constraints.

## 5. AI-first product requirements

### AI Coach MVP
- Progressive hints: concept nudge → approach direction → pseudocode-level guidance.
- Concept explanation tied to the current problem's learning objectives.
- Code review for correctness risks, readability, and edge cases.
- Time and space complexity discussion with assumptions stated.
- Error diagnosis based on user-visible compiler output and official verdict metadata.
- Follow-up problem recommendations based on demonstrated skill gaps.
- User feedback on whether a hint was useful.

### AI Coach non-goals
- AI must not fabricate an official verdict or override the judge.
- AI must not reveal hidden test cases or hidden expected outputs.
- AI should not automatically provide a complete solution as the default first response.
- AI must not be used to make high-stakes hiring decisions without human review and a validated assessment process.
- AI assistance should be disabled or governed by explicit contest rules during rated contests.

## 6. Product sequencing

1. Preserve and improve the existing static demo as a UI prototype.
2. Build foundation: auth, problem domain, versioned content, API, and telemetry.
3. Deliver reliable custom-run and official judging with isolated workers.
4. Add AI Coach MVP against a small, reviewed set of original problems.
5. Add learning paths, skill diagnosis, and personalized recommendations.
6. Add contests, ratings, and post-contest AI review.
7. Add classroom workflows, then enterprise assessments after trust and reliability gates pass.

## 7. Product principles

- AI supports learning; the learner remains the author of the solution.
- Explain uncertainty; do not present model guesses as verified facts.
- Every AI feature must have an observable quality metric and a cost budget.
- User code and learning history are private by default.
- Minimize personal data, especially for school-age users.
- Core platform functionality must remain useful when AI is unavailable.
- Separate shipped features from planned features in UI and documentation.

## 8. Success criteria

The primary outcome is **weekly meaningful learning sessions**, not raw logins or AI message count. A meaningful session includes an actual attempt, learning interaction, or completed practice activity. Track independent solve rate after hints, return-to-solve rate, skill progression, and AI cost per successful learning session.
