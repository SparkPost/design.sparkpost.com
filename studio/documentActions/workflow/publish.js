import { Publish } from '@sparkpost/matchbox-icons';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import { useDocumentOperation } from '@sanity/react-hooks';

export default function PublishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const { state } = metadata.data;

  const onHandle = () => {
    if (ops.publish.disabled) {
      props.onComplete();
      return;
    }

    metadata.setState('published');
    ops.publish.execute();
    props.onComplete();
  };

  return {
    label: 'Publish',
    disabled: props.liveEdit || state === 'published' || ops.publish.disabled,
    shortcut: 'mod+shift+p',
    icon: Publish,
    onHandle
  };
}
