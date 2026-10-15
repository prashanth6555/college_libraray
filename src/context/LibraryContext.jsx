import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getBook } from "../data/books";
import { addDays, daysUntil, fineFor, formatDate, shift } from "../lib/dates";

const LibraryContext = createContext(null);
const STORAGE_KEY = "meridian-library-v1";

const demoUser = {
  name: "Aanya Kapoor",
  email: "student@meridian.edu",
  memberId: "MC2024-1842",
  program: "B.Tech Computer Science",
  year: "Third Year",
  department: "School of Computing",
  joined: "August 2024",
  validThrough: "May 2027",
};

const DEMO_PASSWORD = "library123";

function seed() {
  return {
    user: null,
    loans: [
      {
        id: "loan-algorithms",
        bookId: "algorithms",
        issuedOn: shift(-11),
        due: shift(3),
        renewed: false,
      },
      {
        id: "loan-mockingbird",
        bookId: "mockingbird",
        issuedOn: shift(-16),
        due: shift(-2),
        renewed: true,
      },
      {
        id: "loan-sapiens",
        bookId: "sapiens",
        issuedOn: shift(-4),
        due: shift(10),
        renewed: false,
      },
    ],
    history: [
      {
        id: "hist-gatsby",
        bookId: "gatsby",
        issuedOn: shift(-48),
        returnedOn: shift(-30),
      },
      {
        id: "hist-habits",
        bookId: "habits",
        issuedOn: shift(-36),
        returnedOn: shift(-21),
      },
      {
        id: "hist-time",
        bookId: "time",
        issuedOn: shift(-70),
        returnedOn: shift(-55),
      },
      {
        id: "hist-python",
        bookId: "python",
        issuedOn: shift(-20),
        returnedOn: shift(-6),
      },
    ],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.loans) || !Array.isArray(parsed.history)) {
      return seed();
    }
    return parsed;
  } catch {
    return seed();
  }
}

export function LibraryProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function notify(message, tone = "ok") {
    const id = Date.now();
    setToast({ id, message, tone });
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(null), 3000);
  }

  const api = useMemo(() => {
    function login(email, password) {
      const matches =
        email.trim().toLowerCase() === demoUser.email && password === DEMO_PASSWORD;
      if (!matches) {
        return {
          ok: false,
          message: "Those details do not match a Meridian member account.",
        };
      }
      setState((current) => ({ ...current, user: demoUser }));
      notify(`Welcome back, ${demoUser.name.split(" ")[0]}.`);
      return { ok: true };
    }

    function logout() {
      setState((current) => ({ ...current, user: null }));
      notify("You have signed out of the library desk.");
    }

    function issueBook(bookId) {
      const book = getBook(bookId);
      if (!state.user) return { ok: false, reason: "auth" };
      if (!book || book.copies < 1) {
        notify("No copies are on the shelf right now.", "warn");
        return { ok: false };
      }
      if (state.loans.some((loan) => loan.bookId === bookId)) {
        notify("You already have this title checked out.", "warn");
        return { ok: false };
      }
      if (state.loans.length >= 4) {
        notify("Loan limit reached. Return a book before issuing another.", "warn");
        return { ok: false };
      }
      const due = shift(14);
      const loan = {
        id: `loan-${bookId}-${Date.now()}`,
        bookId,
        issuedOn: shift(0),
        due,
        renewed: false,
      };
      setState((current) => ({ ...current, loans: [loan, ...current.loans] }));
      notify(`${book.title} is issued until ${formatDate(due)}.`);
      return { ok: true };
    }

    function returnBook(loanId) {
      const loan = state.loans.find((item) => item.id === loanId);
      if (!loan) return;
      const book = getBook(loan.bookId);
      const record = { ...loan, returnedOn: shift(0) };
      setState((current) => ({
        ...current,
        loans: current.loans.filter((item) => item.id !== loanId),
        history: [record, ...current.history],
      }));
      notify(`${book?.title ?? "Book"} has been returned.`);
    }

    function renewBook(loanId) {
      const loan = state.loans.find((item) => item.id === loanId);
      if (!loan) return;
      if (daysUntil(loan.due) < 0) {
        notify("Overdue books cannot be renewed. Please return this copy.", "warn");
        return;
      }
      if (loan.renewed) {
        notify("This loan has already been renewed once.", "warn");
        return;
      }
      const due = addDays(loan.due, 7);
      setState((current) => ({
        ...current,
        loans: current.loans.map((item) =>
          item.id === loanId ? { ...item, due, renewed: true } : item,
        ),
      }));
      notify(`Renewed. The new due date is ${formatDate(due)}.`);
    }

    const fines = state.loans.reduce((sum, loan) => sum + fineFor(loan.due), 0);
    const dueSoon = state.loans.filter((loan) => daysUntil(loan.due) <= 3).length;

    return {
      user: state.user,
      loans: state.loans,
      history: state.history,
      toast,
      dismissToast: () => setToast(null),
      login,
      logout,
      issueBook,
      returnBook,
      renewBook,
      fines,
      dueSoon,
      isBorrowed: (bookId) =>
        Boolean(state.user) && state.loans.some((loan) => loan.bookId === bookId),
      demo: { email: demoUser.email, password: DEMO_PASSWORD },
    };
  }, [state, toast]);

  return <LibraryContext.Provider value={api}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const value = useContext(LibraryContext);
  if (!value) throw new Error("useLibrary must be used within LibraryProvider");
  return value;
}
