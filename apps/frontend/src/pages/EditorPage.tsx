import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Editor as TiptapEditor } from '@tiptap/react';
import { CollaborativeEditor } from '../components/CollaborativeEditor';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { exportToPDF, htmlToMarkdown } from '../utils/pdfExport';
import './EditorPage.css';

export const EditorPage = () => {
  const { documentId } = useParams<{ documentId?: string }>();
  const [showPreview, setShowPreview] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const [editor, setEditor] = useState<TiptapEditor | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Use provided documentId or generate a default one
  const docId = documentId || 'default-document';

  // Generate a random user name and color for this session
  const userName = `User-${Math.floor(Math.random() * 1000)}`;

  // Update content when editor changes
  const handleEditorReady = (editorInstance: TiptapEditor) => {
    setEditor(editorInstance);
    setEditorContent(editorInstance.getHTML());

    // Listen for updates
    editorInstance.on('update', () => {
      setEditorContent(editorInstance.getHTML());
    });
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    if (!editorContent) {
      alert('No content to export');
      return;
    }

    setIsExporting(true);
    try {
      // Convert HTML to Markdown for better PDF rendering
      const markdownContent = htmlToMarkdown(editorContent);

      await exportToPDF({
        content: markdownContent,
        format: 'markdown',
        filename: `${docId}.pdf`,
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="editor-page">
      <header className="editor-header">
        <div className="editor-header-left">
          <h1 className="logo">Verstka</h1>
          <span className="document-title">Document: {docId}</span>
        </div>
        <div className="editor-header-right">
          <button
            className="btn-secondary"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button className="btn-secondary">Share</button>
          <button
            className="btn-primary"
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </header>
      <div className="editor-container">
        <div className={`editor-pane ${showPreview ? 'split' : 'full'}`}>
          <CollaborativeEditor
            documentId={docId}
            userName={userName}
            showToolbar={true}
            onEditorReady={handleEditorReady}
          />
        </div>
        {showPreview && (
          <div className="preview-pane">
            <div className="preview-header">Preview</div>
            <MarkdownPreview content={editorContent} />
          </div>
        )}
      </div>
    </div>
  );
};
