import { urlFor } from '@lib/sanity';
import { Box } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

type ResourceProps = {
  url: string;
  extension: string;
  originalFilename: string;
};

type ResourceDownloadProps = {
  node: {
    resources: ResourceProps[];
    displayImage: object;
    darkBackground: boolean;
  };
};

const StyledLink = styled.a`
  &,
  &:visited {
    ${css({
      color: 'scheme.fg'
    })}
  }

  &:hover {
    ${css({
      color: 'scheme.heavyAccent'
    })}
  }

  transition: ${({ theme }) => theme.motion.duration.fast};
`;

const StyledResource = styled.div`
  display: inline-block;
  ${css({
    mb: '600',
    width: ['100%', null, '50%'],
    pr: ['0', null, '500']
  })}
`;

function ResourceDownload(props: ResourceDownloadProps): JSX.Element {
  const { resources, displayImage, darkBackground } = props.node;
  const displayImageUrl = urlFor(displayImage).url();

  const downloadLink = () => {
    if (resources?.length < 1) {
      return null;
    }

    const getSeparator = (i) => {
      if (i === resources.length - 1) {
        return;
      }

      if (i === resources.length - 2) {
        return resources.length > 2 ? ', or ' : ' or ';
      }

      return ', ';
    };

    return (
      <span>
        Download as{' '}
        {resources.map((resource, i) => {
          return (
            <span key={i}>
              <StyledLink href={`${resource.url}?dl=${resource.originalFilename || resource.url}`}>
                {resource.extension.toUpperCase()}
              </StyledLink>
              {getSeparator(i)}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <StyledResource>
      <Box
        p="500"
        textAlign="center"
        border="thick"
        borderRadius="rounded"
        bg={darkBackground ? 'gray.900' : 'white'}
      >
        <Box width="100%" position="relative" height="150px" maxWidth="200px" margin="0 auto">
          <Box
            as="img"
            src={displayImageUrl}
            width="100%"
            height="100%"
            style={{ 'object-fit': 'contain' }}
          />
        </Box>
      </Box>
      <Box as="p" pt="200">
        {downloadLink()}
      </Box>
    </StyledResource>
  );
}

export default ResourceDownload;
