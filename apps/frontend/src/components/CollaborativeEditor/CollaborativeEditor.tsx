import { useEditor, EditorContent, Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { useEffect, useState, useMemo } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Toolbar } from '../Toolbar';
import '../Editor/Editor.css';

interface CollaborativeEditorProps {
  documentId: string;
  userName?: string;
  userColor?: string;
  editable?: boolean;
  showToolbar?: boolean;
  onEditorReady?: (editor: TiptapEditor) => void;
}

export const CollaborativeEditor = ({
  documentId,
  userName = 'Anonymous',
  userColor = '#' + Math.floor(Math.random() * 16777215).toString(16),
  editable = true,
  showToolbar = true,
  onEditorReady
}: CollaborativeEditorProps) => {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const yDoc = useMemo(() => new Y.Doc(), []);

  useEffect(() => {
    // Connect to WebSocket collaboration server
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234',
      documentId,
      yDoc
    );

    wsProvider.on('status', (event: { status: string }) => {
      console.log('WebSocket status:', event.status);
    });

    setProvider(wsProvider);

    return () => {
      wsProvider.destroy();
    };
  }, [documentId, yDoc]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          // Disable history extension as Yjs handles this
          history: false,
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
          codeBlock: {
            HTMLAttributes: {
              class: 'code-block',
            },
          },
        }),
        ...(provider
          ? [
              Collaboration.configure({
                document: yDoc,
              }),
              CollaborationCursor.configure({
                provider: provider,
                user: {
                  name: userName,
                  color: userColor,
                },
              }),
            ]
          : []),
      ],
      editable,
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none',
        },
      },
    },
    [provider, editable]
  );

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) {
    return <div className="editor-loading">Loading editor...</div>;
  }

  return (
    <div className="editor-wrapper">
      {showToolbar && <Toolbar editor={editor} />}
      <div className="editor-content-wrapper">
        <EditorContent editor={editor} />
      </div>
      <div className="editor-status">
        {provider ? (
          <>
            {provider.wsconnected ? (
              <span className="status-connected">● Connected</span>
            ) : (
              <span className="status-disconnected">● Connecting...</span>
            )}
            <span className="active-users">
              {provider.awareness.getStates().size || 0} user(s) online
            </span>
          </>
        ) : (
          <span className="status-disconnected">● Initializing...</span>
        )}
      </div>
    </div>
  );
};
