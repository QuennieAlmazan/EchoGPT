import { useState, type FormEvent } from "react";
import { MODELS, readStored, type ModelId } from "../../lib/demo";
import { WorkspaceBrand } from "../ui/Brand";

const actions = ["Summarize", "Rewrite", "Explain", "Translate", "Generate"];
const storeUrl = "https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj";

export default function ExtensionPage() {
  const initial = readStored("echogpt-extension-demo", { model: "GPT" as ModelId, context: true, history: true });
  const [model, setModel] = useState<ModelId>(initial.model);
  const [tab, setTab] = useState("Chat");
  const [prompt, setPrompt] = useState("");
  const [sent, setSent] = useState("");
  const [context, setContext] = useState(initial.context);
  const [historyEnabled, setHistoryEnabled] = useState(initial.history);
  const [saved, setSaved] = useState(false);
  const [recent, setRecent] = useState(["Summarize a design article", "Explain CSS container queries", "Rewrite a project update"]);

  const run = (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setSent(prompt.trim());
    setRecent(items => [prompt.trim(), ...items].slice(0, 4));
    setPrompt("");
  };
  const saveSettings = () => {
    localStorage.setItem("echogpt-extension-demo", JSON.stringify({ model, context, history: historyEnabled }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };
  const chooseQuickAction = (index: number) => {
    setPrompt(["Summarize this page: ", "Rewrite this text: ", "Explain this simply: ", "Translate this into English: ", "Generate ideas for: "][index]);
    setTab("Chat");
  };

  return <div className="extension-page-shell">
    <header className="extension-page-header">
      <WorkspaceBrand />
      <div><a href="/chat">Web app redesign</a><a className="extension-install" href={storeUrl} target="_blank" rel="noreferrer">Original Chrome listing ↗</a></div>
    </header>
    <main className="extension-page-main">
      <section className="extension-page-intro">
        <p className="workspace-eyebrow">EXTENSION REDESIGN CONCEPT</p>
        <h1>Your AI workspace,<br/><span>in every tab.</span></h1>
        <p>Explore a redesigned popup and sidebar for quick answers, page reading, writing tools, and conversation history.</p>
        <div className="extension-concept-note"><b>Interactive frontend preview</b><span>This page demonstrates the assignment's extension redesign. The Chrome listing button opens the existing EchoGPT listing; this preview itself is not an installable extension.</span></div>
        <div className="extension-page-actions"><a className="extension-install" href={storeUrl} target="_blank" rel="noreferrer">View existing Chrome listing ↗</a><button onClick={() => setTab("Settings")}>Explore settings</button></div>
        <div className="extension-benefits"><span>✓ Page-aware assistance</span><span>✓ Switch models anytime</span><span>✓ Your workflow, one shortcut away</span></div>
      </section>
      <section className="extension-demo-area" aria-label="Interactive extension redesign preview">
        <div className="extension-browser-decoration"><i/><i/><i/><span>sample-article.com / design-systems</span></div>
        <div className="extension-live-demo">
          <header><img className="extension-mark" src="/echogpt-mark.png" alt=""/><b>EchoGPT sidebar</b><div><button aria-label="Conversation history" onClick={() => setTab("History")}>◷</button><button aria-label="Extension settings" onClick={() => setTab("Settings")}>⚙</button></div></header>
          <nav className="extension-demo-tabs" aria-label="Extension preview navigation">{["Chat", "Write", "Read", "History", "Settings"].map(item => <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>{item}</button>)}</nav>
          {tab === "Settings" ? <div className="extension-demo-content"><p className="workspace-eyebrow">PREFERENCES</p><h2>Extension settings</h2>
            <label className="extension-setting-row"><span><b>Default model</b><small>Choose the model used for new prompts.</small></span><select value={model} onChange={event => setModel(event.target.value as ModelId)}>{MODELS.map(item => <option key={item.id}>{item.id}</option>)}</select></label>
            <label className="extension-setting-row"><span><b>Include page context</b><small>Use current page text when you ask.</small></span><input type="checkbox" checked={context} onChange={event => setContext(event.target.checked)}/></label>
            <label className="extension-setting-row"><span><b>Save recent conversations</b><small>Keep this device's extension history.</small></span><input type="checkbox" checked={historyEnabled} onChange={event => setHistoryEnabled(event.target.checked)}/></label>
            <button className="extension-settings-save" onClick={saveSettings}>{saved ? "✓ Preferences saved" : "Save preferences"}</button>
          </div> : tab === "History" ? <div className="extension-demo-content"><p className="workspace-eyebrow">RECENT</p><h2>Your conversations</h2>{(historyEnabled ? recent : []).map((item, index) => <button className="extension-demo-history" key={`${item}-${index}`} onClick={() => { setPrompt(item); setTab("Chat"); }}>{item}<span>›</span></button>)}{!historyEnabled && <p>Conversation history is turned off in settings.</p>}</div> : <div className="extension-demo-content">
            <p className="extension-demo-greeting">A LITTLE HELP, RIGHT HERE</p><h2>{sent ? "Prompt ready" : "What would you like to do?"}</h2>
            {sent && <div className="extension-demo-answer"><b>You</b><p>{sent}</p><small>Frontend preview only · simulated response, no live model connection.</small></div>}
            <label className="extension-model-label">AI model<select value={model} onChange={event => setModel(event.target.value as ModelId)}>{MODELS.map(item => <option key={item.id}>{item.id}</option>)}</select></label>
            <div className="extension-quick-grid">{actions.map((action, index) => <button key={action} onClick={() => chooseQuickAction(index)}><span>{["▤", "✎", "?", "文", "✦"][index]}</span>{action}</button>)}</div>
            <div className="extension-recent-mini"><b>Recent conversations</b><button onClick={() => setTab("History")}>View all →</button><p>{recent[0] ?? "Your recent chats will appear here."}</p></div>
          </div>}
          <form className="extension-demo-composer" onSubmit={run}><textarea value={prompt} onChange={event => setPrompt(event.target.value)} placeholder="Ask about this page..." aria-label="Ask EchoGPT about this page"/><div><span>{model} · {context ? "Page context on" : "Page context off"}</span><button disabled={!prompt.trim()} aria-label="Send prompt">↑</button></div></form>
        </div>
      </section>
    </main>
    <footer className="extension-page-footer"><span>EchoGPT extension redesign · Frontend preview</span><a href="/settings">Workspace settings</a></footer>
  </div>;
}
