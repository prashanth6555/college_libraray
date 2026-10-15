import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import PageHero from "../components/PageHero";
import { books, categories } from "../data/books";
import { useTitle } from "../lib/useTitle";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "title", label: "Title A–Z" },
  { id: "newest", label: "Newest" },
  { id: "rating", label: "Highest rated" },
];

export default function Catalog() {
  useTitle("Catalog");
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [stock, setStock] = useState("all");
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "All";

  function update(next) {
    const following = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "All") following.delete(key);
      else following.set(key, value);
    });
    setParams(following, { replace: true });
  }

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesQuery =
        !needle ||
        book.title.toLowerCase().includes(needle) ||
        book.author.toLowerCase().includes(needle) ||
        book.category.toLowerCase().includes(needle) ||
        book.isbn.includes(needle);
      const matchesStock =
        stock === "all" ||
        (stock === "available" && book.copies > 0) ||
        (stock === "out" && book.copies === 0);
      return matchesCategory && matchesQuery && matchesStock;
    });

    list = [...list].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "newest") return b.year - a.year;
      if (sort === "rating") return b.rating - a.rating;
      return Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title);
    });
    return list;
  }, [query, category, sort, stock]);

  return (
    <div>
      <PageHero
        eyebrow="Book search"
        title="Find a book, then take it to the desk."
        text="Search by title, author, subject, or ISBN. Availability on this shelf is sample data for the college demo."
        image="/images/stacks.jpg"
      />
      <section className="shell py-10 md:py-14">
        <div className="rounded-3xl bg-cream p-4 ring-1 ring-black/5 sm:p-5">
          <label className="relative block">
            <span className="sr-only">Search books</span>
            <input
              value={query}
              onChange={(event) => update({ q: event.target.value })}
              placeholder="Search by title, author, category, or ISBN"
              className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-ink outline-none focus:border-gold"
            />
          </label>
          <div className="mt-4 flex gap-2 overflow-x-auto hide-scroll pb-1">
            {["All", ...categories.map((item) => item.name)].map((name) => {
              const active = category === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => update({ category: name })}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    active ? "bg-ink text-cream" : "bg-white text-ink ring-1 ring-line hover:ring-gold"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-mist">
              {results.length} {results.length === 1 ? "book" : "books"}
              {query ? ` for “${query}”` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-mist" aria-hidden="true" />
              <select
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                aria-label="Filter by availability"
                className="rounded-full border border-line bg-white px-3 py-2 text-sm"
              >
                <option value="all">Any availability</option>
                <option value="available">Available</option>
                <option value="out">Out of stock</option>
              </select>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort books"
                className="rounded-full border border-line bg-white px-3 py-2 text-sm"
              >
                {sorts.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-line bg-cream px-6 py-16 text-center">
            <h2 className="font-display text-3xl text-ink">Nothing on this shelf</h2>
            <p className="mx-auto mt-2 max-w-md text-mist">
              Try another subject, or clear the search. The demo collection is small on purpose.
            </p>
            <button
              type="button"
              className="btn btn-ink mt-6"
              onClick={() => {
                setStock("all");
                setParams({}, { replace: true });
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
