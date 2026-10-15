import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · Meridian College Library`
      : "Meridian College Library";
  }, [title]);
}
