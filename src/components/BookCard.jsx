import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import BookCover from "./BookCover";

export default function BookCard({ book }) {
  const { user, isBorrowed, issueBook } = useLibrary();
  const navigate = useNavigate();
  const borrowed = isBorrowed(book.id);
  const available = book.copies > 0 && !borrowed;

  function handleIssue() {
    if (!user) {
      navigate("/login", { state: { from: `/books/${book.id}` } });
      return;
    }
    issueBook(book.id);
  }

  let issueLabel = "Issue";
  if (borrowed) issueLabel = "Borrowed";
  else if (book.copies < 1) issueLabel = "Unavailable";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_16px_40px_rgba(11,23,38,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(11,23,38,0.16)]">
      <Link to={`/books/${book.id}`} className="relative block aspect-[3/4] overflow-hidden">
        <BookCover
          book={book}
          className="h-full w-full transition duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${
            book.copies > 0 ? "bg-forest text-white" : "bg-clay text-white"
          }`}
        >
          {book.copies > 0 ? `${book.copies} available` : "Out of stock"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
          {book.category}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-ink">
          <Link to={`/books/${book.id}`} className="hover:text-navy">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-mist">{book.author}</p>
        <p className="mt-2 flex items-center gap-1 text-sm text-ink">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
          <span>{book.rating.toFixed(1)}</span>
          <span className="text-mist">· {book.year}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/books/${book.id}`} className="btn btn-ink min-w-[6.5rem] flex-1 text-sm">
            View
          </Link>
          <button
            type="button"
            className="btn btn-gold min-w-[6.5rem] flex-1 text-sm"
            onClick={handleIssue}
            disabled={!available}
          >
            {issueLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
