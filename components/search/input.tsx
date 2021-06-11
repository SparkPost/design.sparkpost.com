import { Search as SearchIcon } from '@sparkpost/matchbox-icons';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Box, useWindowEvent } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledInput = styled.input`
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  border-radius: 0;

  ${css({
    fontSize: '300',
    lineHeight: '300',
    color: 'scheme.fg',
    px: '400',
    py: '450',
    width: ['100%', null, '300px'],
    '&:focus': {
      bg: 'scheme.lightAccent'
    }
  })}

  &:focus {
    border: none;
    outline: none;
  }
`;

const IconWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${css({
    right: '400'
  })}
`;

export default connectSearchBox(({ refine, currentRefinement, onFocus, hasFocus }) => {
  useWindowEvent('keydown', function (e) {
    if (hasFocus && e.key === 'Escape') {
      refine('');
    }
  });

  return (
    <Box
      as="form"
      position="relative"
      onSubmit={(e) => e.preventDefault()}
      role="search"
      zIndex="11"
      bg="scheme.bg"
      borderX={['thick', null, 'none']}
      ml={['-2px', null, '0']}
      mr={['-2px', null, '0']}
    >
      <StyledInput
        id="algolia-search-input"
        type="text"
        autoComplete="off"
        aria-autocomplete="both"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <IconWrapper>
        <SearchIcon size="24" />
      </IconWrapper>
    </Box>
  );
});
