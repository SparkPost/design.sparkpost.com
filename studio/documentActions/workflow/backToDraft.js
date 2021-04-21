import { Edit } from '@sparkpost/matchbox-icons';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export default function BackToDraftAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const { state } = metadata.data;

  if (!props.draft || !state === 'inReview') {
    return null;
  }

  const onHandle = () => {
    metadata.setState('draft');
    props.onComplete();
  };

  return {
    label: 'Back to Draft',
    icon: Edit,
    color: 'warning',
    onHandle
  };
}
