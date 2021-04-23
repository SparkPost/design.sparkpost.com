import React from 'react';
import PropTypes from 'prop-types';
import Box from '@sweatpants/box';

const getPreviewUrl = ({ displayed, options }) => {
  const { slug, _type } = displayed;
  const { previewUrl } = options;
  const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

  if (!slug || !previewUrl) {
    console.warn('Missing slug or preview url');
    return;
  }

  return `${previewUrl}/api/preview?secret=${secret}&type=${_type}&slug=${slug.current}`;
};

const IFramePreview = ({ options, document }) => {
  const { displayed } = document;

  const previewUrl = getPreviewUrl({ displayed, options });

  if (!previewUrl || !displayed) {
    return <div>No document to preview</div>;
  }

  return (
    <Box width="100%" height="100vh">
      <Box
        as="iframe"
        width="100%"
        height="100%"
        border="none"
        title="LivePreview"
        src={previewUrl}
      />
    </Box>
  );
};

IFramePreview.propTypes = {
  options: PropTypes.object,
  document: PropTypes.object
};

export default IFramePreview;
