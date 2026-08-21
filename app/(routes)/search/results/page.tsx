import { Suspense } from 'react';

import { SearchResultsContent } from './search-results-content';

export default function SearchResultsPage() {
  return (
    <Suspense>
      <SearchResultsContent />
    </Suspense>
  );
}
