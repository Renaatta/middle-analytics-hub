# 📊 Enterprise Analytics HUB

A high-performance, white-label analytics dashboard built to demonstrate Middle+ frontend architecture and modern React patterns.

## 🚀 Tech Stack

* **Framework:** Next.js 16 (Turbopack)
* **Architecture:** Hybrid Routing (App Router + Pages Router)
* **State Management:** Zustand (Client state) + React Query (Server state / Cache)
* **Styling:** CSS Modules, CSS Variables (Theming), Container Queries (`@container`)
* **Language:** TypeScript

## 🧠 Architectural Highlights

This project intentionally combines different rendering strategies to optimize performance and state safety:

1.  **Hybrid Rendering (`/pricing`):**
    * Uses **App Router** with **ISR** (Incremental Static Regeneration).
    * Implements the **Hydration Boundary** pattern: queries are prefetched on the Node.js server, dehydrated into HTML, and hydrated on the client for zero-layout-shift FCP.
2.  **Isolated SPA Engine (`/dashboard`):**
    * Uses **Pages Router** with strictly disabled SSR via `next/dynamic`.
    * Prevents **Hydration Mismatch** when working with browser-specific APIs and client-side global stores (Zustand).
    * Implements dynamic data polling with React Query.

## 🛠️ Advanced React Patterns Implemented

* **Fault Tolerance:** Custom class-based `ErrorBoundary` to isolate UI widget crashes without dropping the whole page.
* **Higher-Order Components (HOC):** `withAuth` pattern for route protection and simulated security gateways.
* **Render Props:** `MouseTracker` component for sharing UI coordinates with decoupled tooltip components.
* **Modern Responsiveness:** Uses `@container` queries for widgets to adapt based on their parent grid slots rather than global `@media` viewports.

## ⚙️ Getting Started

1. Install dependencies:
   ```bash
   npm install
2. Run the development server:
   npm run dev
3. Open http://localhost:3000/dashboard to view the client-side dashboard engine, or /pricing to see the ISR marketing page.
