import { useState, type FormEvent } from "react";
import { WorkspaceBrand } from "../ui/Brand";

export default function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }
    if (password.length < 8) { setError("Use a password with at least 8 characters."); return; }
    if (signup && confirm !== password) { setError("Your passwords do not match."); return; }
    setLoading(true);
    window.setTimeout(() => {
      localStorage.setItem("echogpt-demo-user", email.trim());
      setNotice("Demo ready. Opening the redesigned web app preview…");
      window.setTimeout(() => { window.location.href = "/chat"; }, 700);
    }, 400);
  };

  return <div className="auth-shell">
    <WorkspaceBrand />
    <main className="auth-card">
      <a className="auth-back" href="/">← Back to redesign</a>
      <div className="auth-mark"><img src="/echogpt-mark.png" alt="" /></div>
      <p className="workspace-eyebrow">ECHOGPT REDESIGN PREVIEW</p>
      <h1>{signup ? "Create a demo profile" : "Open the web app preview"}</h1>
      <p className="auth-subtitle">{signup ? "Create a local profile to explore the redesigned workspace." : "Continue into this assignment's redesigned EchoGPT workspace."}</p>
      <div className="demo-auth-note"><span>ⓘ</span><p>This is a frontend demo, separate from echogpt.live. Do not enter your real EchoGPT password; nothing is sent to a server. Continue opens the local redesign preview.</p></div>
      <form onSubmit={submit} noValidate>
        <label>Email address<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(error)} /></label>
        <label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} required value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 8 characters"/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></span></label>
        {signup && <label>Confirm password<input type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirm} onChange={event => setConfirm(event.target.value)} placeholder="Enter password again" /></label>}
        {!signup && <div className="auth-forgot"><button type="button" onClick={() => setNotice("Password recovery is not available in this frontend demo.")}>Forgot password?</button></div>}
        {error && <p className="auth-error" role="alert">{error}</p>}{notice && <p className="auth-success" role="status">{notice}</p>}
        <button className="auth-submit" disabled={loading}>{loading ? <><i className="spinner"/> Preparing preview…</> : signup ? "Create local demo profile" : "Continue to web app preview"}</button>
      </form>
      <div className="auth-divider"><span>Demo only</span></div>
      <p className="auth-switch">{signup ? "Already created a demo profile?" : "Want a local demo profile?"} <a href={signup ? "/login" : "/signup"}>{signup ? "Continue to preview" : "Create profile"}</a></p>
    </main>
    <p className="auth-footer">Redesigned web app preview · No real account or AI API connected</p>
  </div>;
}
