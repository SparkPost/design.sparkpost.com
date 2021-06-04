import { Search as SearchIcon } from '@sparkpost/matchbox-icons';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Box, TextField, useWindowEvent } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledInput = styled(TextField)`
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  width: 300px;

  ${css({
    fontSize: 'fontSize_400',
    color: 'scheme.fg',
    mr: '400',
    px: '200'
  })}
`;

export default connectSearchBox(({ refine, currentRefinement, onFocus, hasFocus }) => {
  useWindowEvent('keydown', function (e) {
    if (hasFocus && e.key === 'Escape') {
      refine('');
    }
  });

  return (
    <Box as="form" role="search" zIndex="11" bg="scheme.bg" position="relative" px="400" py="300">
      <StyledInput
        id="algolia-search-input"
        type="text"
        autocomplete="off"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
        suffix={<SearchIcon />}
      />
    </Box>
  );
});

// const SearchInput = () => {
//     return (
//         <>
//             <StyledInput type="text" placeholder="Search..." />
//             <SearchIcon size={24} />
//         </>
//     )
// }
