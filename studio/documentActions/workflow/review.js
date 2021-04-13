import { Visibility } from '@sparkpost/matchbox-icons';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export default function ReviewAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const { state } = metadata.data;

  if (!props.draft || state === 'inReview' || state === 'approved') {
    return null;
  }

  const onHandle = () => {
    metadata.setState('inReview');
    props.onComplete();
  };

  return {
    label: 'Request Review',
    shortcut: 'mod+shift+r',
    icon: Visibility,
    onHandle
  };
}
