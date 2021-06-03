import { Box } from '@sparkpost/matchbox';
import { connectStateResults } from 'react-instantsearch-dom';

type ResultsProps = {
  indices: object[];
  show: boolean;
};

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? <Box>{hitCount}</Box> : <Box>No Results</Box>;
});

const SearchResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { show } = props;

  if (!show) {
    return null;
  }

  return (
    <Box
      position="absolute"
      width="calc(100% + 2px)"
      ml="-2px"
      left="0"
      top="100%"
      border="thick"
      borderRight="none"
      p="400"
    >
      <HitCount />
    </Box>
  );
};

export default SearchResults;
