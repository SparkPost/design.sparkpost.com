import React from 'react'; // importing because we're using dialog
import { Delete } from '@sparkpost/matchbox-icons';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import { useDocumentOperation } from '@sanity/react-hooks';

export default function DeleteAction(props) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const ops = useDocumentOperation(props.id, props.type);

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
    metadata.delete();
    ops.delete.execute();
    props.onComplete();
  };

  return {
    label: 'Delete',
    disabled: ops.delete.disabled,
    icon: Delete,
    shortcut: 'mod+shift+d',
    dialog: showConfirmDialog && {
      type: 'confirm',
      message: <div>Are you sure you want to delete this post?</div>,
      onConfirm: onHandle,
      onCancel: () => setShowConfirmDialog(false)
    },
    onHandle
  };
}
