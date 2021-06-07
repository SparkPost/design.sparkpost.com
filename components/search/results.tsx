import { Box } from '@sparkpost/matchbox';
import Link from 'next/link';
import { Category } from '@components/category';
import { connectStateResults, Highlight, Hits } from 'react-instantsearch-dom';
import styled from 'styled-components';

type ResultsProps = {
  show: boolean;
};

const ResultsWrapper = styled.div`
  padding: ${(props) => props.theme.space['400']};

  .ais-Hits-item {
    margin: 0;
  }

  .ais-Highlight-highlighted,
  .ais-Snippet-highlighted {
    font-weight: 600;
    background: ${({ theme }) => theme.colors.yellow[100]};
    color: inherit;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const ResultCount = connectStateResults(({ searchResults }) => {
  const resultCount = searchResults && searchResults.nbHits;
  return resultCount > 0 ? (
    <Box fontSize="100" color="gray.600" borderBottom="thick" px="400" py="200">
      {resultCount} result{resultCount > 1 ? 's' : ''}
    </Box>
  ) : (
    <Box px="400" py="200">
      No Results
    </Box>
  );
});

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 0;
  text-decoration: none;
  padding: ${({ theme }) => theme.space[300]} ${({ theme }) => theme.space[400]};

  &:hover,
  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.blue[100]};
  }
`;

const getCategoryFromType = (type) => {
  const pluralTypes = ['resource', 'component', 'update', 'foundation'];

  if (pluralTypes.includes(type)) {
    return `${type}s`;
  }

  return type;
};

const Result = ({ hit }) => {
  return (
    <StyledLink href={hit.path}>
      <Box pb="500">
        <Box display="flex" justifyContent="space-between">
          <Box as="h5">
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </Box>
          <Category category={getCategoryFromType(hit.type)} />
        </Box>
        <Box fontSize="200" lineHeight="200" color="gray.700" pt="200">
          <Highlight attribute="subtitle" hit={hit} tagName="mark" />
        </Box>
      </Box>
    </StyledLink>
  );
};

const SearchResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { show } = props;

  if (!show) {
    return null;
  }

  return (
    <Box>
      <Box
        position="absolute"
        width="550px"
        bg="scheme.bg"
        ml="-2px"
        right="0"
        top="100%"
        border="thick"
        borderRight="none"
        zIndex="11"
        maxHeight="90vh"
        overflow="auto"
      >
        <ResultCount />
        <ResultsWrapper>
          <Hits className="Hits" hitComponent={Result} />
        </ResultsWrapper>
      </Box>
      <Box
        style={{
          pointerEvents: 'none'
        }}
        position="fixed"
        width="100vw"
        height="100vh"
        bg="scheme.fg"
        opacity="0.25"
        zIndex="10"
        top="0"
        left="0"
        bottom="0"
      />
    </Box>
  );
};

export default SearchResults;
