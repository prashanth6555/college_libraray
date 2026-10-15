import { CircleAlert, CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { toast, dismissToast } = useLibrary();
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-foam">
      <ScrollToTop />
      <Navbar />
      <main className="w-full flex-1 pt-20">
        <div key={pathname} className="animate-fade">
          <Outlet />
        </div>
      </main>
      <Footer />
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[60] w-[min(92vw,28rem)] -translate-x-1/2">
          <button
            type="button"
            onClick={dismissToast}
            className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left text-sm shadow-2xl ${
              toast.tone === "warn" ? "bg-clay text-white" : "bg-ink text-cream"
            }`}
          >
            {toast.tone === "warn" ? (
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            )}
            <span>{toast.message}</span>
          </button>
        </div>
      )}
    </div>
  );
}
