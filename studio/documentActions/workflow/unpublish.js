import React from 'react';
import { useDocumentOperation } from '@sanity/react-hooks';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import UnpublishIcon from 'part:@sanity/base/unpublish-icon';

export default function UnpublishAction(props) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));

  if (props.liveEdit) {
    return null;
  }

  const onHandle = () => {
    if (ops.delete.disabled) {
      props.onComplete();
      return;
    }

    if (!showConfirmDialog) {
      setShowConfirmDialog(true);
      return;
    }

    setShowConfirmDialog(false);
    ops.unpublish.execute();
    metadata.setState('draft');
    props.onComplete();
  };

  return {
    label: 'Unpublish',
    disabled: ops.delete.disabled,
    icon: UnpublishIcon,
    dialog: showConfirmDialog && {
      type: 'confirm',
      message: <div>Are you sure you want to unpublish this post?</div>,
      onConfirm: onHandle,
      onCancel: () => setShowConfirmDialog(false)
    },
    onHandle
  };
}
