import { BookOpen, LampDesk, Monitor, Printer, Search, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { useLibrary } from "../context/LibraryContext";
import { services } from "../data/content";
import { useTitle } from "../lib/useTitle";

const icons = { BookOpen, LampDesk, Monitor, Printer, Search, Wifi };

export default function Services() {
  useTitle("Services");
  const { user } = useLibrary();

  return (
    <div>
      <PageHero
        eyebrow="Library services"
        title="Help for the essay, the lab, and the long quiet hour."
        text="Circulation, digital stacks, study rooms, and a person at the desk who knows the collection."
        image="/images/study.jpg"
      />
      <section className="shell space-y-8 py-12 md:py-16">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          const flip = index % 2 === 1;
          return (
            <Reveal key={service.title}>
              <article className="grid overflow-hidden rounded-[2rem] bg-cream ring-1 ring-black/5 lg:grid-cols-2">
                <img
                  src={service.image}
                  alt=""
                  className={`h-64 w-full object-cover lg:h-full ${flip ? "lg:order-2" : ""}`}
                />
                <div className="p-6 sm:p-8 lg:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-3xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-mist">{service.text}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
        <div className="rounded-[2rem] bg-ink px-6 py-10 text-cream sm:px-10">
          <h2 className="font-display text-3xl font-semibold">Need a librarian this afternoon?</h2>
          <p className="mt-3 max-w-xl text-cream/75">
            Research help is drop-in from 2:00 to 5:00 PM on weekdays, or write to library@meridian.edu and a subject librarian will answer.
          </p>
          <Link to={user ? "/dashboard" : "/login"} className="btn btn-gold mt-6">
            {user ? "Open your library card" : "Sign in to issue a book"}
          </Link>
        </div>
      </section>
    </div>
  );
}
