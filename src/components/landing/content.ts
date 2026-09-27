import type { IconName } from "../ui/Icon";

export const features: { icon: IconName; title: string; text: string; wide?: boolean }[] = [
  { icon: "message", title: "Multi-AI chat", text: "Explore a single conversation interface with selectable model profiles and a consistent prompt workflow.", wide: true },
  { icon: "switch", title: "Model switching", text: "Move between models mid-thread without losing context." },
  { icon: "history", title: "Conversation history", text: "Revisit and organize demo conversations in the local workspace." },
  { icon: "bolt", title: "Quick actions", text: "Start common tasks with prepared prompts in the extension concept." },
  { icon: "extension", title: "Chrome extension", text: "Explore a browser sidebar concept designed to keep help close at hand.", wide: true },
  { icon: "shield", title: "Privacy & control", text: "A clear, user-controlled workspace concept with local demo preferences and transparent limits." },
];

export const faqs = [
  ["What is EchoGPT?", "EchoGPT is a unified AI workspace that lets you access, compare, and work with leading AI models from one beautifully organized interface."],
  ["Which AI models can I explore here?", "This frontend concept includes illustrative GPT, Claude, Gemini, and DeepSeek model profiles. Selecting one changes the demo interface; no live provider API is connected."],
  ["Can I switch models during a conversation?", "Yes. The demo lets you switch illustrative model profiles while keeping the conversation visible. Model replies are simulated and are not sent to an AI provider."],
  ["Does EchoGPT have a browser extension?", "Yes. The Chrome extension gives you model access, quick actions, and conversation history without leaving the page you’re viewing."],
  ["Is this connected to a real AI account?", "No. This independent frontend implementation is a demo. Authentication and model responses are simulated, while preferences are stored locally in your browser."],
];

