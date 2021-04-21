import React from 'react';
import { useDocumentOperation } from '@sanity/react-hooks';
import ResetIcon from 'part:@sanity/base/reset-icon';

export default function DiscardChangesAction(props) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const ops = useDocumentOperation(props.id, props.type);

  if (!props.published || props.liveEdit) {
    return null;
  }

  const onHandle = () => {
    if (ops.discardChanges.disabled) {
      props.onComplete();
      return;
    }

    if (!showConfirmDialog) {
      setShowConfirmDialog(true);
      return;
    }

    setShowConfirmDialog(false);
    ops.discardChanges.execute();
    props.onComplete();
  };

  const dialog = showConfirmDialog && {
    type: 'confirm',
    color: 'danger',
    onCancel: props.onComplete,
    onConfirm: onHandle,
    message: <div>Are you sure you want to discard all changes since last published?</div>
  };

  return {
    disabled: ops.discardChanges.disabled,
    label: 'Discard changes',
    dialog,
    icon: ResetIcon,
    onHandle
  };
}
