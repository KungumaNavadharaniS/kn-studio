import { useState } from "react";
import SceneTransition from "./SceneTransition";
import "./ContactModal.css";

const PROJECT_TYPES = ["Website", "Business Cards", "Poster", "Brochure", "Packaging", "Branding", "Other"];

export default function ContactModal({ onClose }) {
  const [closing, setClosing] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: PROJECT_TYPES[0], message: "" });

  const requestClose = () => setClosing(true);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your backend / form service of choice (Formspree,
    // EmailJS, a serverless function, etc). Kept intentionally simple here.
    setSent(true);
  };

  return (
    <div className="contact-overlay" role="dialog" aria-modal="true">
      <SceneTransition closing={closing} onClose={onClose}>
        <div className="contact-card">
          <button className="contact-card__close" onClick={requestClose} aria-label="Close">×</button>

          <p className="eyebrow-mono">start a project</p>
          <h2>Let's talk about your idea.</h2>

          <div className="contact-card__links">
            <a href="mailto:hello@kunguma.dev">Email</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>

          {sent ? (
            <p className="contact-card__thanks">
              Thanks — your message is in. I'll get back to you within a couple of days.
            </p>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input required value={form.name} onChange={update("name")} placeholder="Your name" />
              </label>
              <label>
                Email
                <input required type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" />
              </label>
              <label>
                Project Type
                <select value={form.type} onChange={update("type")}>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>
                Message
                <textarea required rows={4} value={form.message} onChange={update("message")} placeholder="Tell me a bit about what you're building" />
              </label>
              <button type="submit" className="btn contact-form__submit">Start a Project</button>
            </form>
          )}
        </div>
      </SceneTransition>
    </div>
  );
}
