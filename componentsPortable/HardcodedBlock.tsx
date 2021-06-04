import React from 'react';
import { TokenReferenceTable } from '@components/tokenReferenceTable';
import { SpacingTokenTable } from '@components/spacingTokenTable';
import { ElevationTokenTable } from '@components/elevationTokenTable';

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
    case 'elevation-token-table':
      return <ElevationTokenTable />;
    default:
      return <div>ERROR: No component found for "{node.id}"</div>;
  }
}

export default HardcodedBlock;
