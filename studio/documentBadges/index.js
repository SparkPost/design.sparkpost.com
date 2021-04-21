import defaultResolve from 'part:@sanity/base/document-badges';
import { types as workflowTypes } from '../config/workflow';
import { resolveWorkflowDocumentBadges } from './workflow';

export default function resolveDocumentBadges(docInfo) {
  if (workflowTypes.includes(docInfo.type)) {
    return resolveWorkflowDocumentBadges(docInfo);
  }

  defaultResolve(docInfo);
}
