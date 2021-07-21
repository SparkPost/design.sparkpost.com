import { Box } from '@sparkpost/matchbox';
import { urlFor } from '@lib/sanity';
import { CopyButton } from '@components/copyButton';

type TeamGridProps = {
  node: {
    members: {
      _key: string;
      image: object;
      name: string;
      pronouns: string;
      jobTitle: string;
      metadata: {
        label: string;
        value: string;
      }[];
    }[];
  };
};

function TeamGrid(props: TeamGridProps): JSX.Element {
  const { node } = props;
  const { members } = node;

  return (
    <Box
      display="grid"
      gridTemplateColumns={['1fr', null, 'repeat(2, 1fr)']}
      gridGap="600"
      py="300"
      width="100%"
    >
      {members.map((member) => {
        const imgUrl = urlFor(member.image).url();

        return (
          <Box key={member._key} color="scheme.fg" position="relative" mb="200">
            <Box
              width="100%"
              height="0"
              pb="100%"
              position="relative"
              overflow="hidden"
              borderRadius="rounded"
              border="thick"
            >
              <Box
                position="absolute"
                as="img"
                src={imgUrl}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                alt={`${member.name}, ${member.jobTitle} at SparkPost`}
              />
            </Box>
            <Box pt="400">
              <Box as="h4">
                <Box as="span" fontSize="500" fontWeight="600">
                  {member.name}
                </Box>
                <Box
                  verticalAlign="top"
                  pl="200"
                  as="span"
                  fontSize="200"
                  fontWeight="300"
                  fontStyle="italic"
                >
                  {member.pronouns}
                </Box>
              </Box>
              <Box as="h5" fontWeight="400" fontSize="400">
                {member.jobTitle}
              </Box>
              <Box pt="400">
                {member.metadata.map((metadata, i) => {
                  return (
                    <Box key={i} pb="300">
                      <Box fontSize="200" lineHeight="200" fontWeight="500">
                        {metadata.label}
                      </Box>
                      <Box fontSize="150">
                        <CopyButton>{metadata.value}</CopyButton>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default TeamGrid;
