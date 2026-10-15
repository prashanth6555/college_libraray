import { Link } from "react-router-dom";
import { useTitle } from "../lib/useTitle";

export default function NotFound() {
  useTitle("Page not found");
  return (
    <section className="shell py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">404</p>
      <h1 className="mt-3 font-display text-5xl font-semibold text-ink">This shelf is empty.</h1>
      <p className="mt-3 max-w-md text-mist">That page is not part of the library site.</p>
      <Link to="/" className="btn btn-ink mt-6">
        Back to the reading room
      </Link>
    </section>
  );
}
