# PY/ACADEMY — Product Requirements

## Original problem statement
Create a website where students can learn Python basic → advanced, practice learned topics, build projects, face challenges, pass exams (must pass to unlock next topic), and earn a certificate after completing all tracks. No backend — localStorage for tracking. Curriculum should cover everything needed to become a data scientist / AI-ML engineer.

## User choices
- Scope: Python (basic → advanced) + Data Science + AI/ML Engineering (all three)
- Code execution: Pyodide (real in-browser Python)
- Exam format: MCQ + code-output prediction + fill-in-the-blank, 70% to pass
- Certificate: PDF with student name
- Design: chosen by agent (Swiss Neo-Brutalist light theme, Cabinet Grotesk + IBM Plex Mono, #0055FF signal blue + #FFD700 accent, sharp edges, exposed grid)

## Architecture
Frontend-only React SPA (no backend calls). React Router for navigation. Tailwind + shadcn/ui. State persisted in `localStorage` under key `py_academy_v1`. Pyodide loaded from CDN in `public/index.html`. PDF certificate generated client-side via `jspdf`.

## Personas
- **Self-starter learner** wanting free, linear Python-to-AI path with practice and proof.
- **Student** wanting a portfolio-worthy certificate after demonstrated mastery.

## Core requirements (static)
1. Sequential curriculum with gating (70% exam pass unlocks next topic).
2. Inline Pyodide playground on every lesson page.
3. Mixed-format exam (MCQ / output / fill) with instant grading & retry.
4. Free-form coding playground.
5. Guided projects per track with mark-done tracking.
6. Downloadable PDF certificate after all topics passed.
7. Progress dashboard: streak, avg score, completion %.

## Implemented (2026-02)
- Routes: `/`, `/dashboard`, `/curriculum`, `/learn/:topicId`, `/exam/:topicId`, `/playground`, `/projects`, `/certificate`.
- 4 tracks / 23 topics: Python Basics (7), Python Advanced (6), Data Science (5), AI/ML (5).
- 5-question exam per topic → 115 questions total.
- 9 guided projects across tracks.
- PDF certificate generator (jspdf) with student name, scores, issue date, cert ID.
- Dashboard with dynamic stats (progress bar, streak, avg score, per-track progress).
- Neo-brutalist UI: Cabinet Grotesk + IBM Plex Mono, black borders, blue/yellow accents, marquee banner, data-testids across all interactive elements.
- Tested end-to-end via testing_agent_v3: happy path (land → pass exam → unlock next) confirmed working; Pyodide loads in 2–5s.

## Backlog
### P1
- Add 5 more topics to reach 28 (file I/O, testing/packaging, pandas advanced, supervised/unsupervised dive, prompt engineering) for fuller DS/AI coverage.
- Syntax highlighting inside the Pyodide editor (e.g., CodeMirror / Monaco).
- Auto-preload numpy + pandas micropip for Data Science lessons.

### P2
- Timer on exams + question shuffle.
- Leaderboard (localStorage-only, anonymous scores).
- Shareable certificate link (URL-encoded state) for LinkedIn.
- Dark mode toggle while keeping brutalist palette.
- More challenge problems (coding katas) with automated stdout matching.

## Next tasks
- Gather user feedback from initial release.
- Expand curriculum to 28 topics per above.
- Add interactive coding-challenge page with auto-graded test cases.
