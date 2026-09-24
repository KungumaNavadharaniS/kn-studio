import "./Footer.css";

export default function Footer() {
  return (
    <footer className="kn-footer">
      <div className="kn-footer__mark">
        <span className="kn-footer__logo">KN</span>
        <p>Code · Design · Create</p>
      </div>

      <nav className="kn-footer__links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#works">Works</a>
        <a href="#connect">Connect</a>
      </nav>

      <div className="kn-footer__social">
        <a href="mailto:hello@kunguma.dev">Email</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
      </div>

      <p className="kn-footer__copy">© {new Date().getFullYear()} Kunguma Navadharani. All rights reserved.</p>
    </footer>
  );
}
