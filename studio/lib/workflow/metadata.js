import { useDocumentOperation, useEditState } from '@sanity/react-hooks';

export function useWorkflowMetadata(id, defaultState) {
  const editState = useEditState(`workflow-metadata.${id}`, 'workflow.metadata');
  const ops = useDocumentOperation(`workflow-metadata.${id}`, 'workflow.metadata');

  const data =
    editState && editState.published
      ? editState.published
      : { _id: `workflow-metadata.${id}`, _type: 'workflow.metadata', state: defaultState };

  return {
    data,
    delete: deleteMetadata,
    setState
  };

  function deleteMetadata() {
    ops.delete.execute();
  }

  function setState(state) {
    ops.patch.execute([{ setIfMissing: { documentId: id } }, { set: { state } }]);
  }
}
