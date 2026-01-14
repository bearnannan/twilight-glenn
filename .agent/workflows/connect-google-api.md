---
description: สั่งให้ AI เขียนโค้ดเชื่อมต่อ Google Maps/Places โดยใช้เทคนิค Proxy (ปลอดภัย 100%)
---

Context: User needs to integrate Google Maps or External APIs safely on Next.js + Netlify.
Task: Generate code using the **Proxy Pattern**.

Steps to generate:
1. **Server-Side Code (`src/app/api/proxy/route.ts`):**
   - Use `NextResponse`.
   - Access Key via `process.env.API_KEY` (Server-side).
   - Implement Error Handling (try/catch).
2. **Client-Side Code (`src/components/Map.tsx`):**
   - Fetch data from `/api/proxy`.
   - Handle loading state.
3. **Explanation (in Thai):**
   - Explain simply: "Why did we separate the code into 2 files?" (Security lesson).