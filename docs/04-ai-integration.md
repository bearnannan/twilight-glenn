# Phase 4: Gemini AI Integration

## Goal
Integrate Google Gemini API to assist users in managing projects.
**Feature:** "Magic Generate" button for Action Items. Check project title and progress, then suggest relevant tasks.

## User Review Required
> [!IMPORTANT]
> **API Key Required**: You need a `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/).
> This key must be added to `.env.local` (for verify) and Netlify (for production).

## Proposed Changes

### 1. Dependencies [NEW]
- Install `primary` SDK: `@google/generative-ai`

### 2. Backend (API Proxy) [NEW]
- Create `src/app/api/gemini/route.ts`
- **Security**: Server-side only. Hides API Key.
- **Logic**: Receives `{ title, progress, currentItems }` -> Returns JSON `{ suggestedItems: string[] }`.

### 3. UI Implementation [MODIFY]
- **File**: `src/components/Dashboard/EditProjectModal.tsx`
- **Changes**:
    - Add "✨ AI Suggest" button next to "Add Item".
    - When clicked, call `/api/gemini`.
    - Append suggested items to the list.
    - Show "Generating..." loading state.

## Verification Plan
### Automated Tests
- Test API Route via Browser: `http://localhost:3000/api/gemini?text=test` (Mock query)

### Manual Verification
1.  Open Edit Modal.
2.  Click "✨ AI Suggest".
3.  Verify that realistic construction tasks appear (e.g., "Inspect foundation", "Order cement").
4.  Verify that new items can be edited/deleted.
