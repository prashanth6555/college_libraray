import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { useTitle } from "../lib/useTitle";

export default function Login() {
  useTitle("Member login");
  const { user, login, demo } = useLibrary();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    const from = location.state?.from;
    const destination = from && from !== "/login" ? from : "/dashboard";
    return <Navigate to={destination} replace />;
  }

  function submit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter both the college email and the password.");
      return;
    }
    const result = login(email, password);
    if (!result.ok) setError(result.message);
  }

  return (
    <section className="-mt-20 grid min-h-[100svh] lg:grid-cols-2">
      <div className="relative min-h-64 lg:min-h-[100svh]">
        <img
          src="/images/shelves.jpg"
          alt="Bookshelves in the college library"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="relative flex h-full flex-col justify-end p-6 text-cream sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Member desk</p>
          <h1 className="mt-3 max-w-md font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Your card, your due dates, your reading list.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/80">
            Sign in to issue a book and see what is already on loan. This demo keeps everything in the browser.
          </p>
        </div>
      </div>
      <div className="flex items-center bg-foam px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Student login</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-ink">Welcome back</h2>
          <p className="mt-2 text-sm text-mist">
            New to campus? Your account is opened with enrolment. Use the demo member below to explore the desk.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-ink">
              College email
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@meridian.edu"
                className="mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-gold"
              />
            </label>
            <label className="block text-sm font-medium text-ink">
              Password
              <span className="relative mt-1.5 block">
                <input
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your library password"
                  className="w-full rounded-2xl border border-line bg-white px-4 py-3 pr-12 outline-none focus:border-gold"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mist"
                  onClick={() => setShow((value) => !value)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            {error && (
              <p className="rounded-2xl bg-clay/10 px-4 py-3 text-sm text-clay" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn-gold w-full">
              Sign in
            </button>
          </form>
          <div className="mt-6 rounded-3xl bg-cream p-4 ring-1 ring-line">
            <p className="text-sm font-semibold text-ink">Demo member</p>
            <p className="mt-1 text-sm text-mist">
              {demo.email}
              <br />
              Password: {demo.password}
            </p>
            <button
              type="button"
              className="btn btn-line mt-3 text-sm"
              onClick={() => {
                setEmail(demo.email);
                setPassword(demo.password);
                setError("");
              }}
            >
              Fill demo account
            </button>
          </div>
          <p className="mt-6 text-sm text-mist">
            Just browsing?{" "}
            <Link to="/catalog" className="font-semibold text-ink underline decoration-gold decoration-2">
              Search the catalog
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
