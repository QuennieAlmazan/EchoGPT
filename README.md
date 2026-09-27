# EchoGPT Redesign

## GitHub Repository

https://github.com/QuennieAlmazan/EchoGPT

## Live Demo

https://echo-gpt-omega.vercel.app/

## Concept

EchoGPT Redesign is a frontend concept for bringing the EchoGPT website, AI chat workspace, and Chrome extension preview into one consistent experience. The landing page introduces the product, while the chat and extension pages let visitors explore how the redesigned interfaces could work.

## How to Run

Requirements: Node.js and npm.

From the project root, install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Open the local URL shown by Vite. The project uses port `8443` by default.

To create and preview a production build:

```powershell
npm run build
npm run preview
```

## Main Features

- Responsive landing page with a hero, features, model profiles, product previews, reasons to choose EchoGPT, FAQ, calls to action, and footer.
- Redesigned chat workspace with prompt suggestions, four model profiles, message actions, and conversation history.
- Chrome extension concept with chat, quick actions, model selection, history, and settings views.
- Demo sign-in and sign-up screens with client-side validation.
- Light and dark appearance options.
- Conversation search, favorites, rename, delete, and browser-based persistence.
- EchoGPT and provider logos served from the `public/` folder.

## Benefits

The landing page explains the product before asking visitors to try it. The web workspace keeps conversations, model selection, and prompt entry together. The extension concept shows how quick writing and page-reading actions could be available without leaving a browser tab.

## Why This Design

The assignment asks for a redesign of both the EchoGPT web experience and extension concept, plus a landing page. This implementation gives those surfaces a shared violet identity while keeping their workflows distinct: the web app focuses on longer chats and history; the extension preview focuses on quick, browser-side tasks.

## Feature Status

| Assignment item | Status | Notes |
| --- | --- | --- |
| EchoGPT web app redesign | Implemented | Responsive chat workspace at `/chat`; local demo conversations and controls. |
| Single-page landing page | Implemented | Hero, features, AI models, previews, FAQ, CTA, and footer. |
| Chrome extension redesign concept | Implemented as preview | Interactive website preview at `/extension`; not a packaged Chrome extension. |
| Dark and light mode | Implemented | Appearance preference is saved in the browser. |
| Responsive layouts | Implemented | Landing, chat, settings, and extension views adapt to smaller screens. |
| Accessibility improvements | Implemented | Semantic forms, labels, named controls, keyboard focus styling, and skip link. |
| Live provider API responses | Not connected | Model options and responses are illustrative frontend demos. |
| Pricing and testimonials | Optional | Not included in this version. |

## Demo Notes and Assumptions

- This is an independent frontend assignment. It is not connected to EchoGPT accounts or services.
- Sign-in and sign-up are local demo flows. No account is created on a server.
- The model selector changes the selected profile, but does not call OpenAI, Anthropic, Google, DeepSeek, or EchoGPT APIs. Responses are generated locally for demonstration.
- Preferences and chat history use the current browser's `localStorage`.
- The extension route is a concept preview inside this site, not an installable Chrome extension. Its store link opens the existing EchoGPT listing.
- The `Live EchoGPT` and Chrome Web Store links point to the existing external products.

## Completed So Far

- Built the landing page and its desktop, tablet, and mobile layouts.
- Added product preview panels for the web app and extension.
- Implemented a local chat experience with model selection, suggestions, and conversation controls.
- Added demo login, sign-up, and settings pages.
- Added provider logos and updated Git attributes so the public images are stored as regular files for static hosting.
- Added dark and light appearance styles and shared UI components.
- Added this README with setup steps, feature status, and demo limitations.

## Tech Stack

### Frontend

- React 19
- TypeScript 5.7
- Vite 8
- Tailwind CSS 4
- CSS and inline SVG icons

### Browser Storage

`localStorage` stores demo preferences, the local sign-in state, and conversation history. There is no application database or backend API in this project.

## Folder Structure

```text
public/                       # EchoGPT and provider logo assets
src/
  App.tsx                     # Lightweight route handling
  main.tsx                    # React entry point
  components/
    auth/                     # Demo sign-in and sign-up
    chat/                     # Chat workspace and model selector
    extension/                # Extension concept page
    landing/                  # Landing page, content, and product previews
    settings/                 # Workspace settings
    ui/                       # Shared brand, provider, and icon components
  lib/                        # Demo models, response logic, and external links
  styles/                     # Landing, workspace, auth, settings, and preview CSS
README.md
package.json
vite.config.ts
```
