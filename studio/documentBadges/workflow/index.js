import { useWorkflowMetadata, inferMetadataState } from '../../lib/workflow';
import { states } from '../../config/workflow';

const publishedBadge = (docInfo) => {
  if (!docInfo.published) {
    return null;
  }

  return {
    label: 'Published',
    title: 'Published',
    color: 'success'
  };
};

const WorkflowBadge = (docInfo) => {
  const metadata = useWorkflowMetadata(docInfo.id, inferMetadataState(docInfo));
  const state = states.find((state) => state.id === metadata.data.state);

  if (!state) {
    return null;
  }

  if (docInfo.draft && state.id === 'published') {
    return {
      label: 'Draft',
      title: 'Draft',
      color: 'warning'
    };
  }

  if (state.id === 'published') {
    return null;
  }

  return {
    label: state.title,
    title: state.title,
    color: state.color
  };
};

export function resolveWorkflowDocumentBadges() {
  return [publishedBadge, WorkflowBadge];
}
