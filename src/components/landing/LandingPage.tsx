import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "../ui/Icon";
import { Button, Logo, Provider, providers } from "../ui/Brand";
import { ReferenceExtension, ReferenceWebApp, WebAppScreen } from "./ProductMockups";
import { faqs, features } from "./content";
import { ECHOGPT_APP, ECHOGPT_EXTENSION } from "../../lib/links";
function SectionHeading({ label, title, copy, align = "left" }: { label: string; title: ReactNode; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <span className="section-label"><i />{label}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}


function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [productView, setProductView] = useState<"web" | "extension">("web");
  const [theme, setTheme] = useState<"dark" | "light">(() => document.documentElement.dataset.theme === "light" ? "light" : "dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    const preferences = JSON.parse(localStorage.getItem("echogpt-demo-preferences") || "{}");
    localStorage.setItem("echogpt-demo-preferences", JSON.stringify({ ...preferences, theme: next }));
  };

  return (
    <div id="top" className="site">
      <a className="skip-to-content" href="#main-content">Skip to content</a>
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
      <header className="navbar">
        <div className="nav-inner">
          <Logo />
          <nav className={mobileOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
            <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#models" onClick={() => setMobileOpen(false)}>AI Models</a>
            <a href="#product" onClick={() => setMobileOpen(false)}>Product</a>
            <a href="#extension" onClick={() => setMobileOpen(false)}>Extension</a>
            <a href="#why-choose" onClick={() => setMobileOpen(false)}>Why EchoGPT</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
          </nav>
          <div className="nav-actions"><button className="landing-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "light"} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? "☀" : "☾"}<span>{theme === "dark" ? "Light" : "Dark"}</span></button><a className="nav-live-app" href={ECHOGPT_APP} target="_blank" rel="noreferrer">Original live site ↗</a><Button href="/login" kind="ghost">Demo sign in</Button><Button href="/chat">Open redesign</Button></div>
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle navigation"><Icon name={mobileOpen ? "close" : "menu"} /></button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <div className="hero-copy">
            <a className="announcement" href="#product"><span>Demo</span> Explore the interactive workspace <Icon name="arrow" size={14} /></a>
            <h1>One workspace.<br /><span>Every AI.</span></h1>
            <p>My own improved frontend implementation of EchoGPT, based on the existing product—bringing its multi-model workspace and browser extension into a clearer, calmer experience.</p>
            <div className="hero-actions"><Button href="/chat" icon="arrow">Open web app redesign</Button><Button href={ECHOGPT_APP} kind="secondary" external><Icon name="sparkles" size={16} /> Open original EchoGPT ↗</Button></div>
            <div className="hero-proof"><div className="avatar-stack" aria-label="OpenAI, Anthropic, Google, and DeepSeek model profiles">{providers.map(provider => <Provider key={provider.name} name={provider.name} tone={provider.tone} size="small" />)}</div><p><strong>4 model profiles</strong><br />to explore in this demo</p></div>
          </div>
          <div className="hero-product">
            <div className="product-glow" />
            <div className="window-chrome"><div><i /><i /><i /></div><span>app.echogpt.ai</span><Icon name="shield" size={13} /></div>
            <WebAppScreen preview />
            <div className="floating-card floating-model"><span>Model switched</span><div><Provider name="Anthropic" tone="var(--peach)" size="small" /><strong>Claude 3.7</strong><Icon name="check" size={15} /></div></div>
            <div className="floating-card floating-speed"><Icon name="bolt" size={16} /><span><strong>3.2× faster</strong> workflows</span></div>
          </div>
          <div className="hero-brands"><span>ONE PLACE TO EXPLORE</span><div><b>Chat</b><b>Write</b><b>Research</b><b>Compare</b><b>Create</b></div></div>
        </section>

        <section className="section features" id="features">
          <SectionHeading label="Everything in one place" title={<>AI without the <span>tab chaos.</span></>} copy="A faster, calmer way to work across every model you trust." align="center" />
          <div className="feature-grid">
            {features.map((feature, i) => (
              <article className={`feature-card ${feature.wide ? "feature-wide" : ""}`} key={feature.title}>
                <div className="feature-icon"><Icon name={feature.icon} /></div>
                {i === 0 && <div className="feature-visual compare-visual"><div><Provider name="OpenAI" tone="var(--mint)" size="small" /><span><b>GPT-4o</b><i /></span></div><div><Provider name="Anthropic" tone="var(--peach)" size="small" /><span><b>Claude 3.7</b><i /><i /></span></div></div>}
                {i === 4 && <div className="feature-visual extension-visual"><div className="mini-popup"><Logo compact /><span>Ask this page...</span><button><Icon name="arrow" size={13} /></button></div></div>}
                <h3>{feature.title}</h3><p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section models" id="models">
          <div className="models-intro">
            <SectionHeading label="AI Models · demo profiles" title={<>Choose a model.<br /><span>Keep your flow.</span></>} copy="Explore how model choice could fit into one workspace. These profiles are part of the frontend demo and are not connected to provider APIs." />
            <div className="model-stat"><strong>4</strong><span>model profiles<br />in this demo</span></div>
          </div>
          <div className="model-grid">
            {providers.map(provider => <article className="model-card" key={provider.name}><div className="model-top"><Provider name={provider.name} tone={provider.tone} /><span>DEMO</span></div><p>{provider.name}</p><h3>{provider.model}</h3><div className="model-line" /><small>{provider.description}</small><a href="/chat" aria-label={`Try ${provider.model} in the chat demo`}><Icon name="arrow" size={16} /></a></article>)}
          </div>
        </section>

        <section className="section product-section" id="product">
            <SectionHeading label="Redesign preview · interactive demo" title={<>Your ideas. <span>Amplified.</span></>} copy="Preview this assignment's redesigned web workspace and extension concept. These screens are local frontend demos, separate from the live EchoGPT service." align="center" />
          <div className="product-tabs" role="tablist" aria-label="Product views">
            <button className={productView === "web" ? "active" : ""} onClick={() => setProductView("web")} role="tab" aria-selected={productView === "web"}><Icon name="message" size={16} /> Redesigned web app</button>
            <button className={productView === "extension" ? "active" : ""} onClick={() => setProductView("extension")} role="tab" aria-selected={productView === "extension"}><Icon name="extension" size={16} /> Extension concept</button>
          </div>
          <div className={`product-frame reference-frame ${productView === "extension" ? "showing-extension" : ""}`}>
            {productView === "web" ? <ReferenceWebApp /> : <ReferenceExtension />}
          </div>
        </section>

        <section className="section extension-section" id="extension">
          <div className="extension-copy">
            <SectionHeading label="Chrome extension" title={<>Intelligence,<br /><span>right where you are.</span></>} copy="Summarize articles, improve your writing, and ask any model—without breaking your flow." />
            <ul>
              <li><span><Icon name="check" size={15} /></span>Works on every website</li>
              <li><span><Icon name="check" size={15} /></span>Instant page-aware answers</li>
              <li><span><Icon name="check" size={15} /></span>Explore a browser sidebar workflow</li>
            </ul>
            <div className="hero-actions extension-cta-actions"><Button href="/extension" icon="arrow">Preview extension redesign</Button><Button href={ECHOGPT_EXTENSION} kind="secondary" external>Original Chrome listing ↗</Button></div>
          </div>
          <ReferenceExtension />
        </section>

        <section className="section why-section" id="why-choose">
          <SectionHeading label="Why EchoGPT" title={<>Less busywork.<br /><span>More breakthrough.</span></>} align="center" />
          <div className="why-grid">
            <article><span className="why-number">01</span><div className="why-icon"><Icon name="bolt" /></div><h3>Move at thought speed</h3><p>Quick actions and focused workflows turn rough ideas into useful work in seconds.</p><strong>Fewer workflow switches <Icon name="arrow" size={15} /></strong></article>
            <article><span className="why-number">02</span><div className="why-icon"><Icon name="model" /></div><h3>Use the right mind</h3><p>Choose the best model for each task, or compare perspectives before you decide.</p><strong>4 example model profiles <Icon name="arrow" size={15} /></strong></article>
            <article><span className="why-number">03</span><div className="why-icon"><Icon name="workflow" /></div><h3>Keep context connected</h3><p>Search, revisit, and organize conversations in a workspace designed around your ongoing tasks.</p><strong>Conversation history <Icon name="arrow" size={15} /></strong></article>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="faq-intro">
            <SectionHeading label="FAQ" title={<>Questions,<br /><span>meet answers.</span></>} copy="Can’t find what you’re looking for? Our team is here to help." />
            <Button href={ECHOGPT_APP} kind="secondary" external>Visit EchoGPT</Button>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => <article className={openFaq === i ? "faq-item faq-open" : "faq-item"} key={question}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{String(i + 1).padStart(2, "0")}</span><strong>{question}</strong><i><Icon name="plus" size={18} /></i></button><div className="faq-answer"><p>{answer}</p></div></article>)}
          </div>
        </section>

        <section className="section final-cta" id="get-started">
          <div className="cta-orbit orbit-one" /><div className="cta-orbit orbit-two" />
          <span className="cta-spark"><Icon name="sparkles" size={28} /></span>
          <h2>Your best work is<br /><span>one prompt away.</span></h2>
          <p>Try the interactive workspace and explore the Chrome extension concept.</p>
          <div className="hero-actions"><Button href="/chat" icon="arrow">Start chatting</Button><Button href="/signup" kind="secondary">Create demo account</Button></div>
          <small>Frontend demo · No production account or AI API connected</small>
        </section>
      </main>

      <footer>
        <div className="footer-cta"><div><span>READY WHEN YOU ARE</span><strong>Bring every AI conversation into one calmer workspace.</strong></div><div><Button href="/chat" icon="arrow">Open redesigned workspace</Button><Button href={ECHOGPT_APP} kind="secondary" external>Original live EchoGPT ↗</Button></div></div>
        <div className="footer-main">
          <div className="footer-brand"><Logo /><p>Every model. One workspace.<br />Your ideas, amplified.</p><div className="socials"><a href={ECHOGPT_APP} target="_blank" rel="noreferrer" aria-label="Open EchoGPT web app"><img src="/echogpt-mark.png" alt="" /><span>Web app</span></a><a href={ECHOGPT_EXTENSION} target="_blank" rel="noreferrer" aria-label="Open EchoGPT Chrome extension listing"><Icon name="extension" size={16} /><span>Chrome extension</span></a></div></div>
          <div className="footer-links"><div><strong>Redesign demo</strong><a href="/chat">Open redesigned web app</a><a href="/extension">Preview extension concept</a><a href="#product">Product preview</a></div><div><strong>Original EchoGPT</strong><a href={ECHOGPT_APP} target="_blank" rel="noreferrer">Live web app ↗</a><a href={ECHOGPT_EXTENSION} target="_blank" rel="noreferrer">Chrome Web Store ↗</a><a href="#faq">FAQ</a></div><div><strong>Explore</strong><a href="#features">Features</a><a href="#why-choose">Why EchoGPT</a><a href="#top">Back to top</a></div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 EchoGPT redesign · independent frontend implementation</span><div><a href="/settings#privacy">Privacy settings</a><a href="#faq">FAQ</a><a href="/extension">Extension concept</a></div><span className="status"><i /> Interactive demo</span></div>
      </footer>
    </div>
  );
}


export default LandingPage;
