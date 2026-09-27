import { useEffect, useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import ChatApp from "./components/chat/ChatApp";
import ExtensionPage from "./components/extension/ExtensionPage";
import LandingPage from "./components/landing/LandingPage";
import SettingsPage from "./components/settings/SettingsPage";
import { DEFAULT_PREFERENCES, readStored } from "./lib/demo";

export default function App() {
  const [route, setRoute] = useState(() => window.location.pathname);
  useEffect(() => { document.documentElement.dataset.theme = readStored("echogpt-demo-preferences", DEFAULT_PREFERENCES).theme; }, []);
  useEffect(() => { const titles: Record<string, string> = { "/": "EchoGPT | One workspace. Every AI.", "/login": "Sign in | EchoGPT", "/signup": "Create account | EchoGPT", "/chat": "Chat workspace | EchoGPT", "/settings": "Settings | EchoGPT", "/extension": "Chrome extension concept | EchoGPT" }; document.title = titles[route] ?? titles["/"]; }, [route]);
  useEffect(() => {
    const pop = () => setRoute(window.location.pathname);
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.origin !== window.location.origin) return;
      // Let the browser handle same-page section links so their hash and scroll target stay in sync.
      if (anchor.hash && anchor.pathname === window.location.pathname) return;
      const path = anchor.pathname;
      if (!["/", "/login", "/signup", "/chat", "/settings", "/extension"].includes(path)) return;
      event.preventDefault(); window.history.pushState({}, "", path + anchor.hash); setRoute(path);
      window.setTimeout(() => { const targetId = decodeURIComponent(anchor.hash.slice(1)); const destination = targetId ? document.getElementById(targetId) : null; if (destination) destination.scrollIntoView({ behavior: "smooth" }); else window.scrollTo(0, 0); }, 0);
    };
    window.addEventListener("popstate", pop); document.addEventListener("click", click);
    return () => { window.removeEventListener("popstate", pop); document.removeEventListener("click", click); };
  }, []);
  useEffect(() => { const hash = decodeURIComponent(window.location.hash.slice(1)); if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 30); }, [route]);
  if (route === "/login") return <AuthPage mode="login"/>;
  if (route === "/signup") return <AuthPage mode="signup"/>;
  if (route === "/chat") return <ChatApp/>;
  if (route === "/settings") return <SettingsPage/>;
  if (route === "/extension") return <ExtensionPage/>;
  return <LandingPage/>;
}
