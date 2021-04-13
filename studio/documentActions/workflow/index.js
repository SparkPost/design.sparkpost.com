import ReviewAction from './review';
import PublishAction from './publish';
import DeleteAction from './delete';
import DiscardChangesAction from './discardChanges';
import SyncAction from './sync';
import UnpublishAction from './unpublish';
import BackToDraftAction from './backToDraft';

export function resolveWorkflowActions() {
  return [
    SyncAction,
    ReviewAction,
    PublishAction,
    BackToDraftAction,
    DiscardChangesAction,
    DeleteAction,
    UnpublishAction
  ];
}
