import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const editorToolbar = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
    }
}

export default class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        let editorState;
        const contentBlock = htmlToDraft(this.props.value);
        if (contentBlock) {
            editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks));
        } else {
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState,
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
        this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    toolbar={editorToolbar}
                    wrapperClassName="rf-editor-wrapper"
                    editorClassName="rf-editor-editor"
                    toolbarClassName="toolbar-class"
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}

Editor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}