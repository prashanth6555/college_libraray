import { ArrowRight, BookOpen, LampDesk, Monitor, Printer, Search, Wifi } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCover from "../components/BookCover";
import CountUp from "../components/CountUp";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { books, categories } from "../data/books";
import { useLibrary } from "../context/LibraryContext";
import { libraryStatus, rules, services } from "../data/content";
import { useTitle } from "../lib/useTitle";

const icons = { BookOpen, LampDesk, Monitor, Printer, Search, Wifi };

const stats = [
  { value: 86000, suffix: "+", label: "Volumes on the shelves" },
  { value: 14200, suffix: "", label: "Student members" },
  { value: 42, suffix: "", label: "Study rooms" },
  { value: 18, suffix: "", label: "Subject librarians" },
];

export default function Home() {
  useTitle("");
  const navigate = useNavigate();
  const { user } = useLibrary();
  const [query, setQuery] = useState("");
  const status = libraryStatus();
  const featured = books.filter((book) => book.featured);
  const fan = featured.slice(0, 3);

  function submitSearch(event) {
    event.preventDefault();
    const next = query.trim();
    navigate(next ? `/catalog?q=${encodeURIComponent(next)}` : "/catalog");
  }

  return (
    <div className="-mt-20">
      <section className="relative min-h-[100svh] overflow-x-hidden bg-ink text-cream">
        <img
          src="/images/hero.jpg"
          alt="The long hall of Meridian College Library"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/35 lg:bg-gradient-to-r lg:from-ink lg:via-ink/75 lg:to-ink/20" />
        <div className="animate-drift pointer-events-none absolute -left-16 top-28 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="shell relative grid min-h-[100svh] items-center gap-10 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur">
              <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-300" : "bg-gold"}`} />
              Est. 1968 · {status.label}
            </p>
            <h1 className="animate-rise delay-1 mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl xl:text-6xl">
              A quiet room for the next thing you want to know.
            </h1>
            <p className="animate-rise delay-2 mt-5 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
              Meridian College Library holds the course reserves, the novels, and the odd book that changes a project. Search the shelves, then come sit down.
            </p>
            <form
              onSubmit={submitSearch}
              className="animate-rise delay-3 mt-8 flex w-full max-w-xl flex-col gap-2 rounded-3xl bg-cream p-2 shadow-2xl sm:flex-row sm:items-center sm:rounded-full"
            >
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search books</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Title, author, or subject"
                  className="w-full rounded-full bg-transparent py-3 pl-11 pr-4 text-ink outline-none placeholder:text-mist"
                />
              </label>
              <button type="submit" className="btn btn-gold px-6">
                Search
              </button>
            </form>
            <div className="animate-rise delay-4 mt-5 flex flex-wrap gap-3">
              <Link to="/catalog" className="btn btn-ghost">
                Browse collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={user ? "/dashboard" : "/login"} className="btn btn-gold">
                {user ? "Your library card" : "Member login"}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[520px] w-full max-w-lg lg:block">
            {fan.map((book, index) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="animate-floaty absolute top-8 w-48 overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/30"
                style={{
                  "--tilt": `${(index - 1) * 7}deg`,
                  left: `${8 + index * 26}%`,
                  zIndex: index === 1 ? 3 : 1,
                  animationDelay: `${index * 0.45}s`,
                }}
              >
                <BookCover book={book} className="aspect-[3/4] w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 w-full">
        <div className="shell">
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-cream p-4 shadow-[0_18px_50px_rgba(11,23,38,0.08)] ring-1 ring-black/5 sm:grid-cols-4 sm:p-6">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 py-2">
                <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  <CountUp to={stat.value} />
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-mist">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Featured books"
              title="On the front table this week"
              text="Staff picks from the new arrivals and the titles students keep renewing."
              action={
                <Link to="/catalog" className="btn btn-ink">
                  View catalog <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.slice(0, 4).map((book, index) => (
              <Reveal key={book.id} delay={index * 80}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-ink py-16 text-cream md:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Library services"
              title="More than a room of shelves"
              text="Issuing, quiet rooms, research help, and a digital stack you can open from the hostel."
              light
              action={
                <Link to="/services" className="btn btn-gold">
                  All services
                </Link>
              }
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = icons[service.icon];
              return (
                <Reveal key={service.title} delay={index * 70}>
                  <article className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/10">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/75">{service.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Popular categories"
              title="Start with a subject"
              text="Eight wings of the collection. Open one and the catalog will already be filtered."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const count = books.filter((book) => book.category === category.name).length;
              return (
                <Reveal key={category.name} delay={(index % 4) * 70} className={index === 0 ? "sm:col-span-2 lg:row-span-2" : ""}>
                  <Link
                    to={`/catalog?category=${encodeURIComponent(category.name)}`}
                    className={`group relative flex min-h-56 overflow-hidden rounded-3xl ${index === 0 ? "h-full min-h-72" : ""}`}
                  >
                    <img
                      src={category.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
                    <div className="relative mt-auto p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-gold">
                        {count} {count === 1 ? "title" : "titles"} in the demo shelf
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-cream">{category.name}</h3>
                      <p className="mt-1 max-w-xs text-sm text-cream/80">{category.blurb}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-cream py-16 md:py-24">
        <div className="shell grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="/images/hall.jpg"
                alt="Readers at long tables in the college reading room"
                className="h-full max-h-[520px] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Rules and guidelines"
              title="A few agreements that keep the room calm"
              text="The full list lives on the guidelines page. These are the ones new members ask about first."
            />
            <ol className="space-y-4">
              {rules.slice(0, 4).map((rule, index) => (
                <li key={rule.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink font-display text-lg text-gold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{rule.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{rule.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/rules" className="btn btn-ink mt-6">
              Read the guidelines
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-navy py-16 text-cream md:py-20">
        <img src="/images/reading.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="shell relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Visit the library</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight">
              The reading room is open, the kettles are not.
            </h2>
            <p className="mt-4 max-w-xl text-cream/80">
              Library Block, Scholar's Walk. Bags in the lobby lockers, laptops welcome, and a librarian at the desk if the catalog and the shelf disagree.
            </p>
          </div>
          <div className="rounded-3xl bg-ink/80 p-6 backdrop-blur">
            <p className="text-sm text-cream/70">Today</p>
            <p className="mt-1 font-display text-3xl">{status.open ? "We are open" : "We are closed"}</p>
            <p className="mt-2 text-gold">{status.label}</p>
            <Link to="/login" className="btn btn-gold mt-6">
              Open your library card
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
