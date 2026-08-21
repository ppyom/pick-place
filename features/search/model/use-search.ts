import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSearch(initialQuery = '') {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const executeSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    router.push(`/search/results?q=${encodeURIComponent(trimmed)}`);
  };

  return { query, setQuery, executeSearch };
}
