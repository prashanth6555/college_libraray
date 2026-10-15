import { ArrowLeft, MapPin, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCover from "../components/BookCover";
import { getBook, relatedBooks } from "../data/books";
import { useLibrary } from "../context/LibraryContext";
import { useTitle } from "../lib/useTitle";

export default function BookDetails() {
  const { id } = useParams();
  const book = getBook(id);
  useTitle(book ? book.title : "Book");
  const navigate = useNavigate();
  const { user, isBorrowed, issueBook } = useLibrary();

  if (!book) {
    return (
      <section className="shell py-20">
        <h1 className="font-display text-4xl text-ink">That book is not in the catalog</h1>
        <Link to="/catalog" className="btn btn-ink mt-6">
          Back to catalog
        </Link>
      </section>
    );
  }

  const borrowed = isBorrowed(book.id);
  const available = book.copies > 0 && !borrowed;
  const related = relatedBooks(book);
  let issueLabel = "Issue this book";
  if (borrowed) issueLabel = "Already on your card";
  else if (book.copies < 1) issueLabel = "No copies available";

  function handleIssue() {
    if (!user) {
      navigate("/login", { state: { from: `/books/${book.id}` } });
      return;
    }
    issueBook(book.id);
  }

  const facts = [
    ["Author", book.author],
    ["Category", book.category],
    ["Publisher", book.publisher],
    ["Year", book.year],
    ["Pages", book.pages],
    ["ISBN", book.isbn],
    ["Language", book.language],
    ["Copies", book.copies],
  ];

  return (
    <div className="shell py-8 md:py-12">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-deep">
        <ArrowLeft className="h-4 w-4" />
        Catalog
      </Link>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,280px)_1fr] xl:grid-cols-[minmax(0,340px)_1fr]">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(11,23,38,0.16)] lg:sticky lg:top-28">
          <BookCover book={book} className="aspect-[3/4] w-full" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">{book.category}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-mist">{book.author}</p>
          <p className="mt-3 flex items-center gap-2 text-ink">
            <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            {book.rating.toFixed(1)} · {book.year}
          </p>
          <p
            className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              book.copies > 0 ? "bg-forest/10 text-forest" : "bg-clay/10 text-clay"
            }`}
          >
            {book.copies > 0 ? `${book.copies} copies on the shelf` : "Currently unavailable"}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">{book.description}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-mist">
            <MapPin className="h-4 w-4 text-gold-deep" aria-hidden="true" />
            Shelf {book.shelf}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn btn-gold" onClick={handleIssue} disabled={!available}>
              {issueLabel}
            </button>
            <Link to="/rules" className="btn btn-line">
              Loan rules
            </Link>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                <dt className="text-xs uppercase tracking-[0.14em] text-mist">{label}</dt>
                <dd className="mt-1 font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-ink">More in {book.category}</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
