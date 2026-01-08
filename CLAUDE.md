# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

White Coat Capital is a mobile-first Progressive Web App (PWA) for physician financing, built with Next.js 16 and React 19. The app serves two user types: physicians seeking funding and investors looking to deploy capital.

## Commands

```bash
npm install --legacy-peer-deps  # Install dependencies (--legacy-peer-deps required)
npm run dev                      # Start development server at localhost:3000
npm run build                    # Production build
npm run lint                     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Styling**: Tailwind CSS v4 with `tw-animate-css`
- **Forms**: react-hook-form + zod for validation
- **Charts**: Recharts

### Path Alias
Use `@/*` to import from project root (configured in tsconfig.json).

### Key Directories
- `app/` - Next.js App Router pages
- `components/` - React components
  - `components/ui/` - Reusable UI primitives (shadcn/ui style)
- `lib/utils.ts` - Utility functions including `cn()` for className merging
- `hooks/` - Custom React hooks
- `public/` - Static assets, PWA manifest, and service worker

### PWA Setup
- Service worker registered in `app/layout.tsx` via inline script
- Manifest at `public/manifest.json`
- Install prompt component at `app/pwa-install-prompt.tsx`

### Layout Structure
- Root layout (`app/layout.tsx`) includes bottom navigation for mobile, PWA install prompt, and Vercel Analytics
- Mobile: Bottom navigation bar (hidden on md+)
- Desktop: Top navigation (hidden on mobile)
- Content area has `pb-20` on mobile for bottom nav clearance

### User Flows
- `/physician` - Physician questionnaire and funding proposals
- `/investor` - Investor dashboard and portfolio management
- `/dashboard` - Main user dashboard
- `/tools/[slug]` - Dynamic wealth tools pages
- `/community` - Community forum
