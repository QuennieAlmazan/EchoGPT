export type ModelId = "GPT" | "Claude" | "Gemini" | "DeepSeek";
export type ChatMessage = { id: string; role: "user" | "assistant"; content: string; createdAt: number; model?: ModelId; reaction?: "like" | "dislike" };
export type Conversation = { id: string; title: string; updatedAt: number; favorite: boolean; messages: ChatMessage[] };
export type Preferences = { theme: "light" | "dark"; language: string; defaultModel: ModelId; enterToSend: boolean; autoSave: boolean; emailUpdates: boolean; productUpdates: boolean; saveHistory: boolean; pageContext: boolean };

export const MODELS: { id: ModelId; company: string; description: string; color: string; status: string }[] = [
  { id: "GPT", company: "OpenAI", description: "Versatile help for everyday work", color: "#8b5cf6", status: "Available" },
  { id: "Claude", company: "Anthropic", description: "Thoughtful writing and analysis", color: "#d97757", status: "Available" },
  { id: "Gemini", company: "Google", description: "Fast multimodal exploration", color: "#4285f4", status: "Available" },
  { id: "DeepSeek", company: "DeepSeek", description: "Clear technical reasoning", color: "#0ea5e9", status: "Available" },
];

export const DEFAULT_PREFERENCES: Preferences = { theme: "dark", language: "English", defaultModel: "GPT", enterToSend: true, autoSave: true, emailUpdates: false, productUpdates: true, saveHistory: true, pageContext: true };

export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    if (Array.isArray(fallback)) return (Array.isArray(parsed) ? parsed : fallback) as T;
    return { ...fallback as object, ...parsed } as T;
  } catch { return fallback; }
}

export function mockResponse(prompt: string, model: ModelId): string {
  const value = prompt.toLowerCase();
  let answer: string;
  if (value.includes("react") || value.includes("code") || value.includes("javascript")) {
    answer = "Here’s a practical way to approach it:\n\n1. Break the problem into a small component or function.\n2. Keep state close to where it is used.\n3. Give each action a clear name and handle loading or empty states.\n\nStart with the simplest working version, then add edge cases. If you share your code, I can help refine the details.";
  } else if (value.includes("summar") || value.includes("article") || value.includes("text")) {
    answer = "I can help turn this into a concise summary. In this demo, I don’t have access to pasted page content unless you include it in your prompt.\n\n**A useful summary structure**\n- Main idea\n- Supporting points\n- What to do next\n\nPaste the text you want summarized and I’ll organize it for you.";
  } else if (value.includes("write") || value.includes("email") || value.includes("brainstorm")) {
    answer = "Let’s shape this into something clear and useful.\n\n**A good starting point**\n1. Decide who it is for.\n2. Lead with the most important idea.\n3. Keep the next step specific.\n\nShare the audience and tone you want, and I can draft a version that fits.";
  } else if (value.includes("explain") || value.includes("what is") || value.includes("how does")) {
    answer = "Here’s a simple way to think about it: start with the core idea, then connect it to a familiar example. The important part is how the pieces work together and what changes as a result.\n\nIf you tell me your preferred level—quick overview, beginner-friendly, or technical—I can tailor the explanation.";
  } else {
    answer = `Good question. Here’s a clear way to get started:\n\n1. **Define the outcome** you want from “${prompt.slice(0, 90)}${prompt.length > 90 ? "…" : ""}”.\n2. **Break it into smaller steps** so you can make progress quickly.\n3. **Review and refine** based on what matters most to you.\n\nThis is a simulated ${model} response for the EchoGPT frontend demo. Sign in to the real EchoGPT service for live AI responses.`;
  }
  return answer;
}

export function newConversation(): Conversation {
  return { id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`, title: "New conversation", updatedAt: Date.now(), favorite: false, messages: [] };
}
