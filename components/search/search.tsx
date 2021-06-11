import { useState, useRef } from 'react';
import { Box, useWindowEvent } from '@sparkpost/matchbox';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchInput from './input';
import SearchResults from './results';
import algoliasearch from 'algoliasearch/lite';
import NoSSR from 'react-no-ssr';

function Search(): JSX.Element {
  const [query, setQuery] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const container = useRef();

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  );

  useWindowEvent('click', function (e) {
    const current = container?.current || null;
    const isOutside = !current || !current.contains(e.target);

    if (hasFocus && isOutside) {
      setHasFocus(false);
    }
  });

  return (
    <Box ref={container} width="100%" position="relative">
      <NoSSR>
        <InstantSearch
          searchClient={searchClient}
          indexName="matchbox-v2"
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchInput onFocus={() => setHasFocus(true)} hasFocus={hasFocus} />
          <SearchResults show={query && query.length > 0 && hasFocus} />
        </InstantSearch>
      </NoSSR>
    </Box>
  );
}

export default Search;
