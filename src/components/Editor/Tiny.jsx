import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Tiny(props) {
  const editorRef = useRef();
  const innerRef  = props.innerRef

  return (
    <>
      <div style={{border : '1px solid rgba(122,122,122, 0.3)'}}>
        <Editor
          apiKey={process.env.REACT_APP_TINY_API_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
          onEditorChange={(e) => {innerRef.current = e}}
          initialValue={innerRef.current}
          init={{
            height: props.height? props.height : '500',
            width: props.width ? props.width : '',
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
    </>
  );
}