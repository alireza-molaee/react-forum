import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';


export default class ReplyForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: (props.initData && props.initData.content) || ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({
            content: this.state.content,
        });
    }

    handleContentChange(content) {
        this.setState({
            content: content
        });
    }

    render() {
        return (
            <form className="my-3" onSubmit={this.handleSubmit}>
                <label>Reply:</label>
                <Editor onChange={this.handleContentChange} value={this.state.content} />
                <div>
                    <button type="submit" className="btn btn-primary">send</button>
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