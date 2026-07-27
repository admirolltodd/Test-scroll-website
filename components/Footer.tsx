import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__mark">
          <span className="nav__mark-glyph">A</span>
          <span className="nav__mark-word">Actonaughts</span>
        </div>

        <p className="footer__note">
          Full-stack consulting studio, founded by Robert Slavens &amp; Chello May Harrison
          (and ship&apos;s cat Morris).
        </p>

        <nav className="footer__links">
          <Link href="/#services" data-magnetic>
            Services
          </Link>
          <Link href="/#process" data-magnetic>
            Process
          </Link>
          <Link href="/portfolio" data-magnetic>
            Work
          </Link>
          <Link href="/#contact" data-magnetic>
            Contact
          </Link>
        </nav>

        <span className="footer__year font-mono-label">© {new Date().getFullYear()} Actonaughts</span>
      </div>
    </footer>
  );
}
