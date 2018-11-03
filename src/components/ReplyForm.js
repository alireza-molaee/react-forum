import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import {LoadingInButton} from './Loading';


export default class ReplyForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: (props.initData && props.initData.content) || '',
            loading: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleReplyPost = this.handleReplyPost.bind(this);
    }

    componentDidMount() {
        this.props.onReplyFn(this.handleReplyPost);
    }

    handleReplyPost(postContent) {
        const newContent = `<blockquote>${postContent}<\/blockquote>${this.state.content}`
        this.setState({
            content: newContent,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.onSubmit({
            content: this.state.content,
        }).then(() => {
            this.setState({
                loading: false,
                content: '',
            });
        });
    }

    handleContentChange(content) {
        this.setState({
            content: content
        });
    }

    render() {
        const {loading} = this.state;
        return (
            <form className="my-3" onSubmit={this.handleSubmit}>
                <label>Reply:</label>
                <Editor onChange={this.handleContentChange} value={this.state.content} />
                <div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        send
                        { loading && <LoadingInButton/>}
                    </button>
                </div>
            </form>
        );
    }
}

ReplyForm.propTypes = {
    initDate: PropTypes.shape({
        content: PropTypes.string,
    }),
    onSubmit: PropTypes.func
}