import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import {LoadingInButton} from './Loading';


export default class CreateDiscussionForm extends Component {
    constructor(props) {
        super(props);
        const initDate = props.initDate || {
            title: '',
            content: ''
        }
        this.state = {
            title: initDate.title,
            formOpen: false,
            content: initDate.content || '',
            loading: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
        this.handleTitleInputFocus = this.handleTitleInputFocus.bind(this);
        this.handleTitleInputBlur = this.handleTitleInputBlur.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        if (this.state.title) {
            this.props.onSubmit({
                title: this.state.title,
                content: this.state.content,
            }).then(() => {
                this.setState({
                    loading: false,
                    formOpen: false,
                    title: '',
                    content: ''
                });
            });
        }
    }

    handleTitleInputChange(e) {
        this.setState({
            title: e.target.value,
        })
    }

    handleTitleInputFocus(e) {
        this.setState({
            formOpen: true,
        })
    }

    handleTitleInputBlur(e) {
        if (!e.currentTarget.value) {
            this.setState({
                formOpen: false,
            })
        }
    }

    handleContentChange(content) {
        this.setState({
            content: content
        });
    }

    render() {
        const formHeight = this.state.formOpen ? '500px' : '45px';
        const loading = this.state.loading;
        return (
            <form className="my-3 transition-height" style={{maxHeight: formHeight}} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input
                        className="form-control"
                        name="title"
                        placeholder="Discussion Title"
                        value={this.state.title}
                        onChange={this.handleTitleInputChange}
                        onFocus={this.handleTitleInputFocus}
                        onBlur={this.handleTitleInputBlur}
                    />
                </div>
                <Editor onChange={this.handleContentChange} value={this.state.content} />
                <div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.formOpen && loading}>
                        send
                        { loading && <LoadingInButton/>}
                    </button>
                </div>
            </form>
        );
    }
}

CreateDiscussionForm.propTypes = {
    initDate: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
    }),
    onSubmit: PropTypes.func
}