# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.3 website built with TypeScript, using the App Router architecture. The project is configured with:
- **React 19.1.0** with the latest features
- **Tailwind CSS v4** for styling with custom design tokens
- **Turbopack** for fast development and builds
- **TypeScript 5** with strict configuration
- **ESLint** with Next.js recommended rules

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack (http://localhost:3000)
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

### TypeScript
```bash
npx tsc --noEmit     # Type check without emitting files
npx tsc --noEmit --watch  # Type check in watch mode
```

## Architecture & Structure

### App Router Structure
This project uses Next.js App Router with the following key architectural patterns:

- **`src/app/`** - App Router pages and layouts
- **`src/app/layout.tsx`** - Root layout with font configuration and metadata
- **`src/app/page.tsx`** - Homepage component
- **`src/app/globals.css`** - Global styles with Tailwind CSS v4 and CSS custom properties

### Font Management
The project uses Next.js font optimization with:
- **Geist Sans** (`--font-geist-sans`) - Primary font family
- **Geist Mono** (`--font-geist-mono`) - Monospace font
- Both fonts are configured as CSS custom properties and applied via Tailwind classes

### Styling Approach
- **Tailwind CSS v4** with `@import "tailwindcss"` syntax
- **Design tokens** defined via CSS custom properties in `:root`
- **Theme inline** configuration for consistent color and font variables
- **Dark mode** support via `prefers-color-scheme` media query
- **Responsive design** with mobile-first approach using Tailwind breakpoints

### TypeScript Configuration
- **Strict mode** enabled for better type safety
- **Path mapping** configured with `@/*` alias pointing to `src/*`
- **Next.js plugin** integrated for optimal TypeScript support
- **Bundler module resolution** for modern import/export handling

## Development Patterns

### Component Development
When creating new components:
- Place React components in `src/app/` for pages or create a `src/components/` directory for reusable components
- Use TypeScript with proper typing for props and component interfaces
- Apply Tailwind classes using the established design token system
- Leverage Next.js Image component for optimized images

### Styling Guidelines
- Use CSS custom properties defined in `globals.css` for consistent theming
- Prefer Tailwind utility classes over custom CSS
- Maintain responsive design patterns with `sm:`, `md:`, `lg:` breakpoints
- Use the `dark:` modifier for dark mode variations

### Performance Optimization
- Next.js Image component is already configured for optimal performance
- Turbopack is enabled for faster development and production builds
- Font optimization is handled through Next.js font system
- Static assets are served from the `public/` directory

### Code Quality
- ESLint is configured with Next.js and TypeScript rules
- Use `npm run lint` before committing changes
- TypeScript strict mode enforces type safety
- Import/export patterns follow ES modules with bundler resolution

## Key Files to Know

- **`next.config.ts`** - Next.js configuration (currently minimal)
- **`tsconfig.json`** - TypeScript configuration with path mapping
- **`eslint.config.mjs`** - ESLint configuration using flat config format
- **`postcss.config.mjs`** - PostCSS configuration for Tailwind CSS v4
- **`src/app/globals.css`** - Global styles and design system tokens