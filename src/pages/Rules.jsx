import PageHero from "../components/PageHero";
import { fineRows, rules } from "../data/content";
import { useTitle } from "../lib/useTitle";

export default function Rules() {
  useTitle("Rules and guidelines");

  return (
    <div>
      <PageHero
        eyebrow="Rules and guidelines"
        title="How we share one collection with the whole college."
        text="Short version: bring your ID, return books on time, and leave the silent floor silent."
        image="/images/aisle.jpg"
      />
      <section className="shell py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {rules.map((rule, index) => (
            <article key={rule.title} className="rounded-3xl bg-cream p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-3xl text-gold-deep">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">{rule.title}</h2>
              <p className="mt-2 leading-relaxed text-mist">{rule.body}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl font-semibold text-ink">Fines</h2>
        <p className="mt-2 max-w-2xl text-mist">
          Fines are meant to bring books back, not to fund the library. Clear them at the circulation desk or through the student portal.
        </p>
        <div className="mt-6 overflow-x-auto rounded-3xl bg-cream ring-1 ring-black/5">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-ink text-cream">
              <tr>
                <th className="px-4 py-3 font-medium">Item</th>
                <th className="px-4 py-3 font-medium">Rate</th>
                <th className="px-4 py-3 font-medium">Cap</th>
              </tr>
            </thead>
            <tbody>
              {fineRows.map((row) => (
                <tr key={row.item} className="border-t border-line">
                  <td className="px-4 py-3 font-medium text-ink">{row.item}</td>
                  <td className="px-4 py-3 text-mist">{row.rate}</td>
                  <td className="px-4 py-3 text-mist">{row.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
