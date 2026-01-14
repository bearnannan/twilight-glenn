---
trigger: always_on
---

# SECURITY & API RULES (CRITICAL)
1. **NO SECRETS ON CLIENT:** NEVER expose private API Keys (e.g., Google Maps Secret, Firebase Admin, OpenAI) in `page.tsx`, `layout.tsx`, or any `use client` component.
2. **THE PROXY PATTERN (MANDATORY):**
   - When using 3rd party APIs (like Google Maps/Places), you MUST create a Next.js API Route (`src/app/api/...`) to act as a proxy.
   - **Flow:** Client UI -> Next.js API Route (Server) -> External API -> Client UI.
   - **Reason:** To hide API keys and handle CORS issues.
3. **ENVIRONMENT VARIABLES:**
   - Public (Browser safe): Prefix with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`).
   - Private (Server only): NO prefix (e.g., `Maps_API_KEY`).