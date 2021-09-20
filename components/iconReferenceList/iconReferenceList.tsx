import { useState } from 'react';
import { Box, useCopyToClipboard, styles, TextField } from '@sparkpost/matchbox';
import { Search } from '@sparkpost/matchbox-icons';
import * as icons from '@sparkpost/matchbox-icons';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledCopyButton = styled.button<{ fontSize?: string }>`
  ${styles.buttonReset}
  cursor: pointer;
  display: block;

  ${({ fontSize }) =>
    css({
      fontSize,
      fontFamily: 'monospace',
      pt: '400'
    })}

  &:hover {
    ${css({
      color: 'scheme.heavyAccent'
    })}
  }
`;

const StyledTextField = styled(TextField)`
  border: none;
  outline: none;
`;

function IconItem(props) {
  const { key, icon } = props;
  const { copy, copied } = useCopyToClipboard();
  const Icon = icons[icon];
  return (
    <Box
      key={key}
      gridColumn="span 1"
      borderBottom="thick"
      borderRight="thick"
      width="calc(100% / 4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py="600"
    >
      <Box textAlign="center">
        <Icon size={40} />
        <StyledCopyButton fontSize="50" onClick={() => copy(`<${icon} />`)}>
          {copied ? 'Copied' : `<${icon} />`}
        </StyledCopyButton>
      </Box>
    </Box>
  );
}

function IconList({ items }) {
  return items.map((icon, i) => {
    return <IconItem key={i} icon={icon} />;
  });
}

function IconReferenceList() {
  const [search, setSearch] = useState('');

  const items = Object.keys(icons).filter((name) => {
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Box width="100%">
      <Box border="thick" mb="500">
        <StyledTextField
          onChange={(e) => setSearch(e.currentTarget.value)}
          id="icon-search"
          type="text"
          placeholder="Search all icons"
          suffix={<Search size="24" />}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" borderTop="thick" borderLeft="thick">
        <IconList items={items} />
        {items.length < 1 && (
          <Box textAlign="center" width="100%" borderRight="thick" borderBottom="thick" p="400">
            No Icons Found
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default IconReferenceList;
