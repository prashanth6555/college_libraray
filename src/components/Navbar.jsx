import { BookOpen, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/services", label: "Services" },
  { to: "/rules", label: "Rules" },
];

export default function Navbar() {
  const { user, logout } = useLibrary();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const isHome = location.pathname === "/";
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function submitSearch(event) {
    event.preventDefault();
    const next = query.trim();
    navigate(next ? `/catalog?q=${encodeURIComponent(next)}` : "/catalog");
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition duration-300 ${
        solid ? "border-b border-white/10 bg-ink/95 shadow-lg shadow-black/10 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 text-cream">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold text-ink">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight">Meridian</span>
            <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-cream/70">
              College Library
            </span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `nav-link text-sm ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden min-w-0 max-w-xs flex-1 lg:block">
          <label className="relative block">
            <span className="sr-only">Search the catalog</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search books, authors..."
              className="w-full rounded-full border border-white/15 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-cream outline-none placeholder:text-cream/45 focus:border-gold"
            />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-gold text-sm">
                {user.name.split(" ")[0]}'s desk
              </Link>
              <button type="button" className="btn btn-ghost text-sm" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-gold text-sm">
              Member login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 text-cream lg:ml-0 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="animate-menu border-t border-white/10 bg-ink lg:hidden">
          <div className="shell flex flex-col gap-2 py-4">
            <form onSubmit={submitSearch}>
              <label className="relative block">
                <span className="sr-only">Search the catalog</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search books, authors..."
                  className="w-full rounded-2xl border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-cream outline-none placeholder:text-cream/45"
                />
              </label>
            </form>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-3 text-base font-medium ${
                    isActive ? "bg-white/10 text-gold" : "text-cream"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-gold mt-2">
                  Student dashboard
                </Link>
                <button type="button" className="btn btn-ghost" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-gold mt-2">
                Member login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
