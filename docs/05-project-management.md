# Phase 5: Project Management (Add/Delete)

## Goal
Allow users to fully manage the project list by adding new projects and deleting existing ones.

## Proposed Changes

### 1. Database Logic [MODIFY]
- **File**: `src/services/projectService.ts`
- **Add Function**: `addProject(data: Omit<Project, 'id'>)`
    - Generates a new ID (timestamp or auto-id).
    - Saves to Firestore.
- **Add Function**: `deleteProject(id: string | number)`
    - Deletes document from Firestore.

### 2. UI Implementation [MODIFY]
- **File**: `src/components/Dashboard/Sidebar.tsx`
    - Add a **"+ New Project"** button at the top (header).
- **File**: `src/components/Dashboard/ProjectCard.tsx`
    - Add a **"Trash"** (Delete) button, visible on hover (like Edit).
    - Add `onDelete` prop.
- **File**: `src/components/Dashboard/EditProjectModal.tsx`
    - Update to support **"Create Mode"**.
    - If `project` prop is null/undefined, treat as new project.
    - Change "Save" button to "Create" when in create mode.

### 3. Integration [MODIFY]
- **File**: `src/components/Dashboard/DashboardClient.tsx`
    - Add `handleAddProject` logic.
    - Add `handleDeleteProject` logic with confirmation dialog.
    - connecting UI callbacks.

## Verification Plan
### Manual Verification
1.  **Add**: Click "+", fill form, save. New project should appear in list and map immediately.
2.  **Delete**: Hover on card, click "Trash", confirm. Project should disappear from list and map.
3.  **Persistence**: Refresh page to ensure changes are saved to Firestore.
