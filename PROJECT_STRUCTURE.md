## Development Workflow (Senior Engineer Standard)

**Always follow this workflow** when working on any task:

### 1. Planning Phase
- Understand the requirement and reference the Stitch UI design (if available).
- Review `PROJECT_STRUCTURE.md` to determine exact file locations.
- Identify needed: Prisma models, Zod schemas, components, Server Actions, state management (Zustand / TanStack Query), and Clerk role checks.
- Plan data flow: Server Components for initial data, TanStack Query for client-side interactivity.

### 2. Implementation Phase
- Create or update files **strictly** following the folder structure.
- Build UI with shadcn/ui + Tailwind v4, matching Stitch design exactly.
- Use React Hook Form + Zod for all forms.
- Add Framer Motion for micro-interactions and smooth transitions.
- Implement proper loading states, error handling, and accessibility.
- Ensure full dark mode support via `next-themes`.
- Protect routes with Clerk (middleware + layout-level checks).

### 3. Review & Polish Phase
- Verify TypeScript strict compliance and type safety.
- Test responsiveness on mobile + desktop.
- Optimize performance (Server Components, memoization, proper caching).
- Add clear comments for complex logic.
- Ensure code is reusable and maintainable.

### 4. Testing & Deployment Phase
- Run `npm run dev` and thoroughly test the feature.
- Check admin vs client role separation.
- Commit with a clear, descriptive message.
- Push to Git and test on Vercel preview.
- Document any new patterns or decisions.

**Best Practices**:
- Work feature by feature (e.g., complete Admin Dashboard before moving to Product Detail).
- Use v0.dev for rapid UI generation, then refine manually or with AI.
- Always run `prisma generate` after schema changes.
- Keep AI sessions focused: one feature or component at a time.