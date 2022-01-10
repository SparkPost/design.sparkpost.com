import React from 'react';
import { TokenReferenceTable } from '@components/tokenReferenceTable';
import { SpacingTokenTable } from '@components/spacingTokenTable';
import { ElevationTokenTable } from '@components/elevationTokenTable';
import { TypographyTokenTable } from '@components/typographyTokenTable';
import { IconReferenceList } from '@components/iconReferenceList';
import { CssTable } from '@components/cssTable';

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
    case 'typography-token-table':
      return <TypographyTokenTable />;
    case 'icon-reference-list':
      return <IconReferenceList />;
    case 'matchbox-css-class-list':
      return <CssTable />;
    default:
      return <div>ERROR: No component found for "{node.id}"</div>;
  }
}

export default HardcodedBlock;
