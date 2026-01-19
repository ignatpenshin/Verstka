import * as Y from 'yjs';

export interface DocumentModel {
  content: Y.XmlFragment;
  metadata: Y.Map<any>;
}

export function createDocument(): Y.Doc {
  return new Y.Doc();
}

export function getDocumentContent(doc: Y.Doc): Y.XmlFragment {
  return doc.getXmlFragment('content');
}

export function getDocumentMetadata(doc: Y.Doc): Y.Map<any> {
  return doc.getMap('metadata');
}
