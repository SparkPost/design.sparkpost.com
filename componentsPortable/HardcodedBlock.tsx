import React from 'react';
import { TokenReferenceTable } from '@components/tokenReferenceTable';
import { SpacingTokenTable } from '@components/spacingTokenTable';

type HardcodedBlockProps = {
  node: {
    id: string;
  };
};

/**
 * This component is used as a switcher that renders other hard-coded components
 */
function HardcodedBlock(props: HardcodedBlockProps): JSX.Element {
  const { node } = props;

  switch (node.id) {
    case 'token-reference-table':
      return <TokenReferenceTable />;
    case 'spacing-token-table':
      return <SpacingTokenTable />;
    default:
      return <div>ERROR: No component found for "{node.id}"</div>;
  }
}

export default HardcodedBlock;
