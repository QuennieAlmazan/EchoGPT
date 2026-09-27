import { useState, type FormEvent } from "react";
import { Icon } from "../ui/Icon";
import { Logo, Provider } from "../ui/Brand";
import { ECHOGPT_APP } from "../../lib/links";

export function ModelSelect({ small = false }: { small?: boolean }) {
  return (
    <button className={`model-select ${small ? "model-select-small" : ""}`} type="button">
      <Provider name="OpenAI" tone="var(--mint)" size="small" />
      <span><strong>GPT-4o</strong>{!small && <small>OpenAI</small>}</span>
      <Icon name="chevron" size={14} />
    </button>
  );
}

function PromptBox({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`prompt-box ${compact ? "prompt-compact" : ""}`}>
      <p>Ask EchoGPT anything...</p>
      <div className="prompt-tools">
        <div>
          <button className="icon-button" aria-label="Attach file"><Icon name="attachment" size={17} /></button>
          {!compact && <button className="tool-chip" type="button"><Icon name="sparkles" size={14} /> Enhance</button>}
        </div>
        <button className="send-button" aria-label="Send prompt"><Icon name="arrow" size={17} /></button>
      </div>
    </div>
  );
}

function ChatArea({ preview = false }: { preview?: boolean }) {
  return (
    <div className={`chat-area ${preview ? "chat-preview" : ""}`}>
      <div className="chat-topbar">
        <div>
          <p className="eyebrow-inline">Current chat</p>
          <strong>Product launch strategy</strong>
        </div>
        <ModelSelect small={preview} />
      </div>
      <div className="messages">
        <div className="message message-user">
          <span className="avatar avatar-user"><Icon name="user" size={14} /></span>
          <div>
            <strong>You</strong>
            <p>Help me create a focused launch strategy for a new productivity app aimed at design teams.</p>
          </div>
        </div>
        <div className="message message-ai">
          <span className="avatar avatar-ai"><Icon name="sparkles" size={15} /></span>
          <div>
            <div className="message-heading"><strong>EchoGPT</strong><span>GPT-4o</span></div>
            <p>Here’s a focused launch plan built around one core promise: <em>less coordination, more creative momentum.</em></p>
            <div className="answer-grid">
              <div><span>01</span><p><strong>Position</strong> around removing workflow friction.</p></div>
              <div><span>02</span><p><strong>Activate</strong> with early design partners.</p></div>
              {!preview && <div><span>03</span><p><strong>Launch</strong> through team-led stories.</p></div>}
            </div>
            <div className="message-actions">
              <button aria-label="Copy answer"><Icon name="copy" size={14} /></button>
              <button aria-label="Try another model"><Icon name="switch" size={14} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-composer"><PromptBox compact={preview} /><small>EchoGPT can make mistakes. Check important information.</small></div>
    </div>
  );
}

export function WebAppScreen({ preview = false }: { preview?: boolean }) {
  return (
    <div className={`app-shell ${preview ? "app-shell-preview" : ""}`}>
      <aside className="app-sidebar">
        <div className="sidebar-logo"><Logo compact={preview} /></div>
        <button className="new-chat" type="button"><Icon name="plus" size={16} />{!preview && "New chat"}<kbd>⌘K</kbd></button>
        <div className="sidebar-section">
          <span>Today</span>
          <button className="history-item active"><Icon name="message" size={15} /> Product launch strategy</button>
          <button className="history-item"><Icon name="message" size={15} /> Website copy ideas</button>
          {!preview && <button className="history-item"><Icon name="message" size={15} /> Q2 research summary</button>}
        </div>
        {!preview && <div className="sidebar-section"><span>Previous 7 days</span><button className="history-item"><Icon name="message" size={15} /> Onboarding improvements</button><button className="history-item"><Icon name="message" size={15} /> Competitor analysis</button></div>}
        <div className="sidebar-footer">
          <button><Icon name="settings" size={16} />{!preview && "Settings"}</button>
          <button><span className="mini-avatar">AM</span>{!preview && <span>Alex Morgan<small>Pro workspace</small></span>}</button>
        </div>
      </aside>
      <ChatArea preview={preview} />
    </div>
  );
}

const quickActions = ["Summarize page", "Improve writing", "Explain simply"];

export function ReferenceWebApp() {
  const [prompt, setPrompt] = useState("");
  const [sent, setSent] = useState("");
  const suggestions = ["Tell me an interesting fun fact", "Explain quantum computing in simple terms", "Recommend 5 great sci-fi movies", "How can I improve my English speaking skills?"];
  return <div className="workspace-shell reference-workspace">
    <aside className="workspace-sidebar">
      <a className="workspace-brand" href="#product"><span className="brand-symbol">✳</span> Echo<span>GPT</span></a>
      <button className="workspace-new" type="button" onClick={() => { setSent(""); setPrompt(""); }}><span>＋</span> New chat</button>
      <label className="conversation-search"><span>⌕</span><input placeholder="Search conversations" aria-label="Search conversations"/></label>
      <div className="sidebar-group"><div className="sidebar-heading">Favorites</div><p className="sidebar-empty">Your favorites appear here.</p></div>
      <div className="sidebar-group recent-group"><div className="sidebar-heading">Recent conversations</div><button className={`conversation-row conversation-select ${!sent ? "is-active" : ""}`} onClick={() => setSent("")}>◷　New conversation</button></div>
      <div className="sidebar-footer"><a href="#product">⚙　Settings</a><div className="profile-row"><span className="profile-avatar">A</span><span className="profile-name">Demo workspace<small>Redesign preview</small></span></div></div>
    </aside>
    <main className="workspace-main">
      <header className="workspace-header"><div className="workspace-breadcrumb"><span>Workspace</span><b>/</b><strong>{sent ? sent.slice(0, 28) : "New conversation"}</strong></div><div className="header-controls"><button className="model-current model-compact" type="button"><i>G</i><span>GPT<small>OpenAI</small></span><b>⌄</b></button><a className="header-settings" href="#product" aria-label="Settings">⚙</a></div></header>
      <div className="chat-scroll">
        {!sent ? <section className="chat-empty"><div className="empty-icon">✳</div><p className="workspace-eyebrow">YOUR AI WORKSPACE</p><h1>How can EchoGPT<br/><span>help you today?</span></h1><p className="empty-copy">One conversation. The model that fits. A little more room to think.</p><div className="starter-grid">{suggestions.map((item, index) => <button key={item} onClick={() => setPrompt(item)}><i>{["✧", "✎", "▤", "✦"][index]}</i><span>{["Explain a concept simply", "Help me write something", "Summarize text or notes", "Brainstorm fresh ideas"][index]}</span><b>↗</b></button>)}</div><div className="demo-note">✦ <span>Interactive redesign preview · responses are simulated</span></div></section> : <section className="message-list"><article className="chat-message user"><div className="message-avatar">A</div><div className="message-body"><div className="message-meta"><b>You</b></div><div className="message-text"><p>{sent}</p></div></div></article><article className="chat-message assistant"><div className="message-avatar"><span>✳</span></div><div className="message-body"><div className="message-meta"><b>GPT</b></div><div className="message-text"><p>This is a simulated EchoGPT redesign preview. Choose a model and explore the workspace layout.</p></div></div></article></section>}
      </div>
      <div className="composer-dock"><form className="chat-composer" onSubmit={event => { event.preventDefault(); if (prompt.trim()) { setSent(prompt.trim()); setPrompt(""); } }}><div className="composer-top"><button className="model-current" type="button"><i>G</i><span>GPT<small>OpenAI</small></span><b>⌄</b></button><div className="composer-tools"><button type="button" disabled aria-label="Attachments are a preview only">＋</button><span>{prompt.length}/4000</span></div></div><textarea rows={2} maxLength={4000} value={prompt} onChange={event => setPrompt(event.target.value)} placeholder="Message EchoGPT..." aria-label="Write your message"/><div className="composer-bottom"><span>Enter to send · Shift + Enter for a new line</span><button type="submit" disabled={!prompt.trim()} aria-label="Send message">↑</button></div></form><p className="composer-disclaimer">Frontend redesign preview · not connected to live AI</p></div>
    </main>
  </div>;
}

export function ReferenceExtension() {
  const [tab, setTab] = useState("Chat");
  const [prompt, setPrompt] = useState("");
  const [sent, setSent] = useState("");
  const [model, setModel] = useState("EchoGPT");
  const tabs = ["Chat", "Write", "Read", "Translate", "Image", "Video", "Compare", "MCP", "History", "Settings"];
  const suggestions = ["Tell me an interesting fun fact", "Explain quantum computing in simple terms", "Recommend 5 great sci-fi movies", "How can I improve my English speaking skills?"];
  const quickActions = ["Summarize this page", "Improve my writing", "Explain this simply"];
  const startNewChat = () => { setTab("Chat"); setSent(""); setPrompt(""); };
  const submitPrompt = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (prompt.trim()) { setSent(prompt.trim()); setPrompt(""); setTab("Chat"); } };
  const icons = ["▢", "✎", "▤", "T", "▧", "▣", "◫", "♧", "◷", "⚙"];
  return <div className="extension-reference"><div className="extension-title"><span>✳</span> EchoGPT - Multi-AI Chat Sidebar <b>⌁　×</b></div><div className="extension-body"><main><header><h3>{tab === "History" ? "Conversation history" : tab === "Settings" ? "Settings" : tab}</h3><button onClick={startNewChat}>＋ New Chat</button><button className="extension-history-shortcut" onClick={() => setTab("History")} aria-label="Conversation history">◷</button></header>
    {tab === "Settings" ? <div className="extension-page"><h2>Make EchoGPT yours</h2><p>Manage how your assistant works in the browser.</p><label>Default AI model<select value={model} onChange={e => setModel(e.target.value)}><option>EchoGPT</option><option>GPT-4o</option><option>Claude</option><option>Gemini</option></select></label><label className="extension-toggle"><span><b>Use page context</b><small>Include webpage content when you ask for help.</small></span><input type="checkbox" defaultChecked /></label><label className="extension-toggle"><span><b>Save conversation history</b><small>Keep chats available in this browser.</small></span><input type="checkbox" defaultChecked /></label><button className="extension-save" onClick={() => setTab("Chat")}>Done</button></div> : tab === "History" ? <div className="extension-page"><h2>Recent conversations</h2><p>Your chats are saved here for quick access.</p>{[sent || "Explain quantum computing", "Ideas for my next project", "Summarize a research article"].map((item, i) => <button className="extension-history-item" key={`${item}-${i}`} onClick={() => { setPrompt(item); setTab("Chat"); }}><span>◷</span><b>{item}</b><small>{i === 0 ? "Just now" : `${i + 1} hours ago`}</small></button>)}</div> : <><div className="extension-content"><small>Hi, good afternoon</small><h2>{tab === "Chat" ? "How can I help you?" : `${tab} with EchoGPT`}</h2><div className="extension-actions">{["Write", "Translate", "Read page", "Image", "Video", "Compare", "MCP"].map((x, i) => <button key={x} onClick={() => { setTab(x); setPrompt(x === "Read page" ? "Summarize this page: " : `${x}: `); }}><i>{["✎", "文", "▤", "▧", "▣", "⇄", "♧"][i]}</i>{x}</button>)}</div>{sent && <div className="extension-reply"><b>You</b><p>{sent}</p><small>{model} response preview · Sign in to get an answer</small></div>}<div className="extension-prompts"><span className="extension-quick-label">QUICK STARTERS</span>{suggestions.map(x => <button key={x} onClick={() => setPrompt(x)}>{x}</button>)}<span className="extension-quick-label">QUICK ACTIONS</span><div className="extension-quick-actions">{quickActions.map((x, i) => <button key={x} onClick={() => setPrompt(["Summarize this page: ", "Improve this text: ", "Explain this simply: "][i])}>{x}</button>)}</div></div></div><form className="extension-input" onSubmit={submitPrompt}><div><select aria-label="Choose AI model" value={model} onChange={e => setModel(e.target.value)}><option>EchoGPT</option><option>GPT-4o</option><option>Claude</option><option>Gemini</option></select><span>✂　⌁　▤　@　✦</span></div><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Ask a question..."/><button type="submit" aria-label="Send prompt">➤</button><small>Enter to send · Shift+Enter new line</small></form></>}
    </main><nav>{tabs.map((x, i) => <button key={x} className={tab === x ? "selected" : ""} onClick={() => setTab(x)}><span>{icons[i]}</span>{x}</button>)}<a className="extension-upgrade" href={ECHOGPT_APP} target="_blank" rel="noreferrer"><span>♧</span>Upgrade</a></nav></div></div>;
}

export function ExtensionScreen() {
  return (
    <div className="extension-stage">
      <div className="browser-page" aria-hidden="true">
        <div className="browser-bar"><i /><i /><i /><span /></div>
        <div className="browser-content"><div className="skeleton wide" /><div className="skeleton medium" /><div className="skeleton-card" /><div className="skeleton-card" /></div>
      </div>
      <div className="extension-popup">
        <div className="extension-head">
          <Logo />
          <div><button className="icon-button" aria-label="History"><Icon name="history" size={17} /></button><button className="icon-button" aria-label="Settings"><Icon name="settings" size={17} /></button></div>
        </div>
        <div className="extension-welcome">
          <span className="mini-orbit"><Icon name="sparkles" size={19} /></span>
          <h3>How can I help?</h3>
          <p>Ask anything without leaving this page.</p>
        </div>
        <ModelSelect />
        <PromptBox compact />
        <div className="quick-actions">
          <span>Quick actions</span>
          {quickActions.map((action, index) => <button key={action}><Icon name={index === 0 ? "message" : index === 1 ? "sparkles" : "bolt"} size={15} />{action}<Icon name="chevron" size={14} /></button>)}
        </div>
        <div className="recent-row"><span><Icon name="history" size={14} /> Recent conversations</span><button>View all</button></div>
      </div>
    </div>
  );
}
