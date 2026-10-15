import { BookOpen, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { college, hours, libraryStatus } from "../data/content";

function SocialIcon({ name }) {
  const paths = {
    Instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
    LinkedIn: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 10.5V17M7 7.5v.01M11 17v-4.2a2 2 0 1 1 4 0V17" />
      </>
    ),
    YouTube: (
      <>
        <rect x="2.5" y="6" width="19" height="12" rx="3" />
        <path d="M11 10.2v3.6l3.2-1.8z" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const socials = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const status = libraryStatus();

  return (
    <footer className="bg-deep text-cream">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gold text-ink">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold">Meridian</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            {college.motto} A campus library for study, research, and the long afternoon with a good book.
          </p>
          <p className={`mt-4 inline-flex items-center gap-2 text-sm ${status.open ? "text-emerald-300" : "text-gold"}`}>
            <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-300" : "bg-gold"}`} />
            {status.label}
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <SocialIcon name={item.name} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {[
              ["/catalog", "Search the catalog"],
              ["/services", "Library services"],
              ["/rules", "Rules and guidelines"],
              ["/login", "Member login"],
              ["/dashboard", "Student dashboard"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Timings
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {hours.map((slot) => (
              <li key={slot.day} className="flex justify-between gap-4">
                <span>{slot.day}</span>
                <span className="text-cream">{slot.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{college.address}</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${college.email}`} className="hover:text-gold">
                {college.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href="tel:+918041235600" className="hover:text-gold">
                {college.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-4 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {college.library}. Established {college.established}.</p>
          <p>Central campus reading room · Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
