import { CalendarClock, CircleAlert, RotateCcw, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";
import BookCover from "../components/BookCover";
import { getBook } from "../data/books";
import { useLibrary } from "../context/LibraryContext";
import { daysUntil, fineFor, formatDate } from "../lib/dates";
import { useTitle } from "../lib/useTitle";

function dueLabel(due) {
  const days = daysUntil(due);
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `${days} days left`;
}

export default function Dashboard() {
  const { user, loans, history, fines, dueSoon, returnBook, renewBook } = useLibrary();
  useTitle("Student dashboard");

  return (
    <div>
      <section className="-mt-20 bg-ink text-cream">
        <div className="shell grid items-end gap-6 pb-10 pt-32 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Student dashboard</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Hello, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 max-w-xl text-cream/75">
              {user.program} · {user.year}. Borrowed books, due dates, and the titles you have already returned.
            </p>
          </div>
          <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-deep p-6 ring-1 ring-white/10">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gold/20" />
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Meridian College Library</p>
            <p className="mt-6 font-display text-2xl">{user.name}</p>
            <p className="text-sm text-cream/70">{user.memberId}</p>
            <div className="mt-6 flex items-end justify-between text-xs text-cream/70">
              <span>{user.department}</span>
              <span>Valid through {user.validThrough}</span>
            </div>
          </article>
        </div>
      </section>

      <section className="shell py-8 md:py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["On loan", loans.length, "of 4 allowed"],
            ["Due soon or overdue", dueSoon, "within 3 days, or late"],
            ["Fines", `₹${fines}`, fines > 100 ? "Account would pause" : "Clear for now"],
          ].map(([label, value, note]) => (
            <article key={label} className="rounded-3xl bg-cream p-5 ring-1 ring-black/5">
              <p className="text-sm text-mist">{label}</p>
              <p className="mt-2 font-display text-4xl text-ink">{value}</p>
              <p className="mt-1 text-sm text-mist">{note}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-semibold text-ink">Borrowed books</h2>
          <Link to="/catalog" className="btn btn-ink text-sm">
            Issue another
          </Link>
        </div>

        {loans.length === 0 ? (
          <div className="mt-5 rounded-3xl border border-dashed border-line bg-cream px-6 py-12 text-center">
            <p className="font-display text-2xl text-ink">Your card is clear.</p>
            <p className="mt-2 text-mist">Borrow up to four books from the catalog.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {loans.map((loan) => {
              const book = getBook(loan.bookId);
              if (!book) return null;
              const days = daysUntil(loan.due);
              const late = days < 0;
              const span = Math.max(1, daysUntil(loan.due) - daysUntil(loan.issuedOn));
              const elapsed = Math.min(span, Math.max(0, -daysUntil(loan.issuedOn)));
              const progress = late ? 100 : Math.min(100, (elapsed / span) * 100);
              const fine = fineFor(loan.due);
              return (
                <article
                  key={loan.id}
                  className="grid gap-4 rounded-3xl bg-cream p-4 ring-1 ring-black/5 sm:grid-cols-[96px_1fr] sm:p-5"
                >
                  <Link to={`/books/${book.id}`} className="block overflow-hidden rounded-2xl">
                    <BookCover book={book} className="aspect-[3/4] w-full sm:h-full" />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{book.category}</p>
                        <h3 className="font-display text-2xl font-semibold text-ink">
                          <Link to={`/books/${book.id}`}>{book.title}</Link>
                        </h3>
                        <p className="text-sm text-mist">{book.author}</p>
                      </div>
                      <p className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${late ? "bg-clay/10 text-clay" : "bg-forest/10 text-forest"}`}>
                        {late ? <CircleAlert className="h-4 w-4" /> : <CalendarClock className="h-4 w-4" />}
                        {dueLabel(loan.due)}
                      </p>
                    </div>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-mist">Issued</dt>
                        <dd className="font-medium">{formatDate(loan.issuedOn)}</dd>
                      </div>
                      <div>
                        <dt className="text-mist">Due date</dt>
                        <dd className="font-medium">{formatDate(loan.due)}</dd>
                      </div>
                      <div>
                        <dt className="text-mist">Fine</dt>
                        <dd className="font-medium">{fine ? `₹${fine}` : "₹0"}</dd>
                      </div>
                    </dl>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-line">
                      <div
                        className={`h-full rounded-full ${late ? "bg-clay" : "bg-gold"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" className="btn btn-ink text-sm" onClick={() => returnBook(loan.id)}>
                        <Undo2 className="h-4 w-4" />
                        Return
                      </button>
                      <button type="button" className="btn btn-line text-sm" onClick={() => renewBook(loan.id)}>
                        <RotateCcw className="h-4 w-4" />
                        {loan.renewed ? "Renewed" : "Renew 7 days"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <h2 className="mt-14 font-display text-3xl font-semibold text-ink">Reading history</h2>
        {history.length === 0 ? (
          <p className="mt-4 text-mist">Returned books will gather here.</p>
        ) : (
          <div className="mt-5 overflow-hidden rounded-3xl bg-cream ring-1 ring-black/5">
            <ul>
              {history.map((record) => {
                const book = getBook(record.bookId);
                if (!book) return null;
                return (
                  <li key={record.id} className="flex flex-col gap-3 border-b border-line p-4 last:border-b-0 sm:flex-row sm:items-center">
                    <Link to={`/books/${book.id}`} className="w-16 shrink-0 overflow-hidden rounded-xl">
                      <BookCover book={book} className="aspect-[3/4] w-full" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link to={`/books/${book.id}`} className="font-semibold text-ink hover:text-navy">
                        {book.title}
                      </Link>
                      <p className="text-sm text-mist">
                        {book.author} · {book.category}
                      </p>
                    </div>
                    <p className="text-sm text-mist">
                      {formatDate(record.issuedOn)} – {formatDate(record.returnedOn)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
