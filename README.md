# EchoGPT redesign

This project explores how EchoGPT's website, chat workspace, and Chrome extension could feel like parts of one product. It includes a marketing page and working frontend demos for the chat and extension screens.

## Run locally

You’ll need Node.js and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite (port `8443` by default). To build and preview the production version:

```bash
npm run build
npm run preview
```

## What’s included

- A responsive landing page with product previews, feature and model sections, FAQ, calls to action, and footer links.
- A chat workspace with four selectable model profiles, prompt suggestions, conversation history, and message controls.
- Light and dark themes, plus settings for the default model and chat preferences.
- A Chrome extension screen showing a compact chat workflow, quick actions, history, and settings.
- Demo sign-in and sign-up pages.
- EchoGPT and provider logo assets in `public/`.

## Built with

React 19, TypeScript, Vite, and Tailwind CSS 4. The interface uses project CSS and reusable React components for branding, provider logos, and icons. Browser `localStorage` keeps demo preferences and chat history between reloads.

## Notes about the demo

- This project is a frontend redesign concept. It has no backend.
- Sign-in and sign-up are local demo flows; they do not create or access an EchoGPT account.
- The GPT, Claude, Gemini, and DeepSeek choices are sample profiles. Replies are generated locally and are not requests to provider APIs.
- The extension page is a preview inside this website. It is not an installable Chrome extension. The store link opens the existing listing.
- Links labeled for the live product go to EchoGPT’s existing website or Chrome Web Store page.

## Pages

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Demo sign-in |
| `/signup` | Demo sign-up |
| `/chat` | Chat workspace |
| `/settings` | Workspace settings |
| `/extension` | Extension preview |

## Source layout

```text
public/                 Logos and static assets
src/components/auth/    Sign-in and sign-up
src/components/chat/    Chat workspace
src/components/extension/ Extension preview
src/components/landing/ Landing page and product previews
src/components/settings/Workspace settings
src/components/ui/     Shared brand and icon components
src/lib/                Demo data and product links
src/styles/             Page and component styles
```
