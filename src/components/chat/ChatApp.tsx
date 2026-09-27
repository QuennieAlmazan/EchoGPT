import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { DEFAULT_PREFERENCES, MODELS, mockResponse, newConversation, readStored, type Conversation, type ModelId, type Preferences } from "../../lib/demo";

const STORAGE_KEY = "echogpt-demo-conversations";
const starterPrompts = ["Explain a concept simply", "Help me write something", "Summarize text or notes", "Brainstorm fresh ideas"];
const stamp = (time: number) => new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(time);
const modelLogo = (company: string) => ({ OpenAI: "/OPENAI.png", Anthropic: "/Anthropic.png", Google: "/Google.jpg", DeepSeek: "/Deepseek.png" }[company] ?? "/OPENAI.png");

function ModelMenu({ value, onChange, compact = false }: { value: ModelId; onChange: (model: ModelId) => void; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const current = MODELS.find(model => model.id === value) ?? MODELS[0];
  return <div className="model-menu-wrap"><button type="button" className={`model-current ${compact ? "model-compact" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu"><i className="model-logo"><img src={modelLogo(current.company)} alt="" /></i><span>{current.id}<small>{current.company}</small></span><b>⌄</b></button>{open && <div className="model-popover" role="menu" aria-label="Choose a model">{MODELS.map(model => <button type="button" key={model.id} role="menuitemradio" aria-checked={model.id === value} onClick={() => { onChange(model.id); setOpen(false); }}><i className="model-logo"><img src={modelLogo(model.company)} alt="" /></i><span><b>{model.id}</b><small>{model.description}</small></span><em>●</em></button>)}</div>}</div>;
}

export default function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const savedPreferences = readStored("echogpt-demo-preferences", DEFAULT_PREFERENCES);
    const saved = savedPreferences.autoSave && savedPreferences.saveHistory ? readStored<Conversation[]>(STORAGE_KEY, []) : [];
    return Array.isArray(saved) ? saved : [];
  });
  const [activeId, setActiveId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [preferences] = useState<Preferences>(() => readStored("echogpt-demo-preferences", DEFAULT_PREFERENCES));
  const [model, setModel] = useState<ModelId>(() => readStored<{ model: ModelId }>("echogpt-demo-model", { model: readStored("echogpt-demo-preferences", DEFAULT_PREFERENCES).defaultModel }).model);
  const [search, setSearch] = useState("");
  const [generating, setGenerating] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const searchField = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const active = conversations.find(conversation => conversation.id === activeId) ?? null;
  const visible = useMemo(() => conversations.filter(conversation => conversation.title.toLowerCase().includes(search.toLowerCase())), [conversations, search]);

  useEffect(() => { if (preferences.autoSave && preferences.saveHistory) localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations)); else localStorage.removeItem(STORAGE_KEY); }, [conversations, preferences.autoSave, preferences.saveHistory]);
  useEffect(() => { localStorage.setItem("echogpt-demo-model", JSON.stringify({ model })); }, [model]);
  useEffect(() => { document.documentElement.dataset.theme = preferences.theme; }, [preferences.theme]);
  useEffect(() => { if (!activeId && conversations.length) setActiveId(conversations[0].id); }, [activeId, conversations]);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [active?.messages.length, generating]);

  const updateConversation = (id: string, update: (conversation: Conversation) => Conversation) => setConversations(items => items.map(item => item.id === id ? update(item) : item));
  const startNew = () => { const conversation = newConversation(); setConversations(items => [conversation, ...items]); setActiveId(conversation.id); setPrompt(""); setDrawerOpen(false); };
  useEffect(() => {
    const shortcuts = (event: globalThis.KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) return;
      if (event.key.toLowerCase() === "k") { event.preventDefault(); startNew(); }
      if (event.key.toLowerCase() === "f") { event.preventDefault(); searchField.current?.focus(); }
    };
    window.addEventListener("keydown", shortcuts);
    return () => window.removeEventListener("keydown", shortcuts);
  }, [startNew]);
  const send = (text = prompt) => {
    const clean = text.trim(); if (!clean || generating) return;
    let targetId = activeId;
    if (!targetId || !conversations.some(item => item.id === targetId)) {
      const conversation = newConversation(); targetId = conversation.id; setActiveId(targetId); setConversations(items => [conversation, ...items]);
    }
    const userMessage = { id: `${Date.now()}-u`, role: "user" as const, content: clean, createdAt: Date.now() };
    const title = clean.length > 42 ? `${clean.slice(0, 42)}…` : clean;
    updateConversation(targetId, conversation => ({ ...conversation, title: conversation.messages.length ? conversation.title : title, updatedAt: Date.now(), messages: [...conversation.messages, userMessage] }));
    setPrompt(""); if (textarea.current) textarea.current.style.height = "auto"; setGenerating(true);
    window.setTimeout(() => {
      const response = { id: `${Date.now()}-a`, role: "assistant" as const, content: mockResponse(clean, model), model, createdAt: Date.now() };
      setConversations(items => items.map(item => item.id === targetId ? { ...item, updatedAt: Date.now(), messages: [...item.messages, response] } : item));
      setGenerating(false);
    }, 850);
  };
  const regenerate = () => {
    if (!active || generating) return;
    const lastUser = active.messages.filter(item => item.role === "user").slice(-1)[0];
    if (!lastUser) return;
    setGenerating(true);
    const previousAnswer = active.messages.filter(message => message.role === "assistant").slice(-1)[0];
    updateConversation(active.id, conversation => ({ ...conversation, messages: previousAnswer ? conversation.messages.filter(item => item.id !== previousAnswer.id) : conversation.messages }));
    window.setTimeout(() => {
      const response = { id: `${Date.now()}-a`, role: "assistant" as const, content: mockResponse(lastUser.content, model), model, createdAt: Date.now() };
      setConversations(items => items.map(item => item.id === active.id ? { ...item, updatedAt: Date.now(), messages: [...item.messages, response] } : item));
      setGenerating(false);
    }, 850);
  };
  const submit = (event: FormEvent) => { event.preventDefault(); send(); };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (preferences.enterToSend && event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } };
  const remove = (id: string) => { setConversations(items => items.filter(item => item.id !== id)); if (activeId === id) setActiveId(""); };
  const copy = async (id: string, content: string) => { try { await navigator.clipboard.writeText(content); setCopied(id); window.setTimeout(() => setCopied(""), 1400); } catch { setCopied("Copy unavailable"); } };
  const logout = () => { localStorage.removeItem("echogpt-demo-user"); window.location.href = "/login"; };

  return <div className="workspace-shell">
    {drawerOpen && <button className="drawer-scrim" aria-label="Close menu" onClick={() => setDrawerOpen(false)} />}
    <aside className={`workspace-sidebar ${drawerOpen ? "drawer-visible" : ""}`}>
      <a className="workspace-brand" href="/"><span className="brand-symbol">✳</span> Echo<span>GPT</span></a>
      <button className="workspace-new" onClick={startNew}><span>＋</span> New chat <kbd>⌘ K</kbd></button>
      <label className="conversation-search"><span>⌕</span><input ref={searchField} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search conversations" aria-label="Search conversations"/><kbd>⌘ F</kbd></label>
      <div className="sidebar-group"><div className="sidebar-heading">Favorites <span>☆</span></div>{visible.filter(item => item.favorite).map(item => <ConversationRow key={item.id} item={item} active={activeId === item.id} onSelect={() => { setActiveId(item.id); setDrawerOpen(false); }} onDelete={() => remove(item.id)} onRename={() => { const name = window.prompt("Rename conversation", item.title); if (name?.trim()) updateConversation(item.id, conversation => ({ ...conversation, title: name.trim() })); }} onFavorite={() => updateConversation(item.id, conversation => ({ ...conversation, favorite: !conversation.favorite }))} />)}</div>
      <div className="sidebar-group recent-group"><div className="sidebar-heading">Recent conversations <span>•••</span></div>{visible.filter(item => !item.favorite).length === 0 && <p className="sidebar-empty">Your conversations will appear here.</p>}{visible.filter(item => !item.favorite).map(item => <ConversationRow key={item.id} item={item} active={activeId === item.id} onSelect={() => { setActiveId(item.id); setDrawerOpen(false); }} onDelete={() => remove(item.id)} onRename={() => { const name = window.prompt("Rename conversation", item.title); if (name?.trim()) updateConversation(item.id, conversation => ({ ...conversation, title: name.trim() })); }} onFavorite={() => updateConversation(item.id, conversation => ({ ...conversation, favorite: !conversation.favorite }))} />)}</div>
      <div className="sidebar-footer"><a href="/settings"><span>⚙</span> Settings</a><div className="profile-row"><span className="profile-avatar">A</span><span className="profile-name">Demo workspace<small>Frontend preview</small></span><button aria-label="Log out" title="Log out" onClick={logout}>↗</button></div></div>
    </aside>
    <main className="workspace-main"><header className="workspace-header"><button className="mobile-drawer-trigger" onClick={() => setDrawerOpen(true)} aria-label="Open conversations">☰</button><div className="workspace-breadcrumb"><span>Workspace</span><b>/</b><strong>{active?.title ?? "New conversation"}</strong></div><div className="header-controls"><ModelMenu value={model} onChange={setModel} compact/><a href="/settings" className="header-settings" aria-label="Settings">⚙</a><button className="theme-toggle" onClick={() => { const next = preferences.theme === "light" ? "dark" : "light"; const updated = { ...preferences, theme: next }; localStorage.setItem("echogpt-demo-preferences", JSON.stringify(updated)); document.documentElement.dataset.theme = next; window.location.reload(); }} aria-label="Toggle theme">{preferences.theme === "light" ? "☾" : "☀"}</button></div></header>
      <div className="chat-scroll">{!active || active.messages.length === 0 ? <section className="chat-empty"><div className="empty-icon">✳</div><p className="workspace-eyebrow">YOUR AI WORKSPACE</p><h1>How can EchoGPT<br/><span>help you today?</span></h1><p className="empty-copy">One conversation. The model that fits. A little more room to think.</p><div className="starter-grid">{starterPrompts.map((starter, index) => <button key={starter} onClick={() => { setPrompt(["Explain quantum computing in beginner-friendly terms", "Write a warm follow-up email after a meeting", "Summarize the key points from my notes", "Brainstorm names for a neighborhood coffee shop"][index]); textarea.current?.focus(); }}><i>{["✧", "✎", "▤", "✦"][index]}</i><span>{starter}</span><b>↗</b></button>)}</div><div className="demo-note">✦ <span>Interactive demo · responses are simulated, no API key needed</span></div></section> : <section className="message-list" aria-live="polite">{active.messages.map(message => <article key={message.id} className={`chat-message ${message.role}`}><div className="message-avatar">{message.role === "user" ? "A" : <span>✳</span>}</div><div className="message-body"><div className="message-meta"><b>{message.role === "user" ? "You" : message.model ?? model}</b><time>{stamp(message.createdAt)}</time></div><MessageText content={message.content}/><div className="message-actions"><button onClick={() => copy(message.id, message.content)} aria-label="Copy message">{copied === message.id ? "✓ Copied" : "▢ Copy"}</button>{message.role === "assistant" && <><button onClick={regenerate} aria-label="Regenerate response">↻ Regenerate</button><button aria-label="Like response" onClick={() => updateConversation(active.id, item => ({ ...item, messages: item.messages.map(msg => msg.id === message.id ? { ...msg, reaction: msg.reaction === "like" ? undefined : "like" } : msg) }))} className={message.reaction === "like" ? "reaction-active" : ""}>♧</button><button aria-label="Dislike response" onClick={() => updateConversation(active.id, item => ({ ...item, messages: item.messages.map(msg => msg.id === message.id ? { ...msg, reaction: msg.reaction === "dislike" ? undefined : "dislike" } : msg) }))} className={message.reaction === "dislike" ? "reaction-active" : ""}>♧</button></>}</div></div></article>)}{generating && <div className="chat-message assistant"><div className="message-avatar"><span>✳</span></div><div className="generating-label"><span className="typing-dots"><i/><i/><i/></span> {model} is thinking</div></div>}<div ref={bottom}/></section>}</div>
      <div className="composer-dock"><form className="chat-composer" onSubmit={submit}><div className="composer-top"><ModelMenu value={model} onChange={setModel}/><div className="composer-tools"><button type="button" disabled aria-label="File attachments are not available in this demo" title="File attachments are not available in this demo">＋</button><button type="button" disabled aria-label="Voice input is not available in this demo" title="Voice input is not available in this demo">♩</button><span>{prompt.length}/4000</span></div></div><textarea ref={textarea} rows={1} maxLength={4000} value={prompt} onChange={event => { setPrompt(event.target.value); event.currentTarget.style.height = "auto"; event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 170)}px`; }} onKeyDown={keyDown} placeholder="Message EchoGPT..." aria-label="Write your message"/><div className="composer-bottom"><span>Enter to send · Shift + Enter for a new line</span><button type="submit" disabled={!prompt.trim() || generating} aria-label="Send message">{generating ? "…" : "↑"}</button></div></form><p className="composer-disclaimer">EchoGPT demo responses are simulated. Check important information.</p></div>
    </main>
  </div>;
}

function ConversationRow({ item, active, onSelect, onDelete, onRename, onFavorite }: { item: Conversation; active: boolean; onSelect: () => void; onDelete: () => void; onRename: () => void; onFavorite: () => void }) {
  return <div className={`conversation-row ${active ? "is-active" : ""}`}><button className="conversation-select" onClick={onSelect}><span>◷</span>{item.title}</button><div className="conversation-actions"><button aria-label={item.favorite ? "Remove favorite" : "Add favorite"} onClick={onFavorite}>{item.favorite ? "★" : "☆"}</button><button aria-label="Rename conversation" onClick={onRename}>✎</button><button aria-label="Delete conversation" onClick={onDelete}>×</button></div></div>;
}

function MessageText({ content }: { content: string }) {
  return <div className="message-text">{content.split("\n").map((line, index) => line.trim() ? <p key={`${index}-${line}`}>{line.split(/(\*\*.*?\*\*)/g).map((part, i) => part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part)}</p> : <br key={index}/>)}</div>;
}
