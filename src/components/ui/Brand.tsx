import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`logo ${compact ? "logo-compact" : ""}`} href="#top" aria-label="EchoGPT home">
      <img src={compact ? "/echogpt-mark.png" : "/echogpt-horizontal.png"} alt="EchoGPT" />
    </a>
  );
}

export function WorkspaceBrand() {
  return <a className="workspace-brand" href="/" aria-label="EchoGPT home"><img src="/echogpt-horizontal.png" alt="EchoGPT"/></a>;
}

export const Button = ({ children, kind = "primary", href, icon, external = false }: { children: ReactNode; kind?: "primary" | "secondary" | "ghost"; href: string; icon?: IconName; external?: boolean }) => (
  <a className={`button button-${kind}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
    {children}{icon && <Icon name={icon} size={16} />}
  </a>
);

const providerLogos: Record<string, string> = {
  OpenAI: "/OPENAI.png",
  Anthropic: "/Anthropic.png",
  Google: "/Google.jpg",
  DeepSeek: "/Deepseek.png",
};

export const Provider = ({ name, tone, size = "normal" }: { name: string; tone: string; size?: "small" | "normal" }) => (
  <span className={`provider provider-${size}`} style={{ "--provider-tone": tone } as CSSProperties}>
    <img src={providerLogos[name]} alt={`${name} logo`} loading="lazy" />
  </span>
);

export const providers = [
  { name: "OpenAI", model: "GPT-4o", tone: "var(--mint)", description: "Advanced reasoning and multimodal intelligence." },
  { name: "Anthropic", model: "Claude 3.7", tone: "var(--peach)", description: "Nuanced writing with a thoughtful, natural voice." },
  { name: "Google", model: "Gemini 2.0", tone: "var(--blue)", description: "Fast, capable intelligence across every format." },
  { name: "DeepSeek", model: "DeepSeek Chat", tone: "var(--cyan)", description: "Structured reasoning for technical questions." },
];
