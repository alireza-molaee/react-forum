import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { userType } from '../prop-types';
import replyIcon from '../assets/reply.svg';
import * as moment from 'moment';
import Parser from 'html-react-parser';
import Avatar from './Avatar';


export default class Reply extends Component {

    constructor(props) {
        super(props);

        this.handleReplyPost = this.handleReplyPost.bind(this);
    }

    handleReplyPost() {
        this.props.onReplyPost(this.props.content);
    }

    render() {
        return (
            <Fragment>
                <hr />
                <div className="media">
                    <Avatar 
                        name={this.props.user.fullName}
                        role={this.props.user.role}
                        url={this.props.user.image}
                        size="md"
                        className="mr-3 rounded-circle"
                    />
                    <div className="media-body">
                        <div className="d-flex">
                            <div className="mr-auto"><h5>{this.props.user.fullName}</h5></div>
                            <div className="text-black-50">{moment(this.props.sendDate).format('DD MM YYYY')}</div>
                        </div>
                        {Parser(this.props.content)}
                    </div>
                </div>
                <div className="d-flex my-2 justify-content-end">
                    <button onClick={this.handleReplyPost} type="button" className="btn btn-default"><img width="20" height="20" src={replyIcon} alt="reply icon" /></button>
                </div>
            </Fragment>
        );
    }
}

Reply.propTypes = {
    uid: PropTypes.string,
    user: userType,
    sendDate: PropTypes.instanceOf(Date),
    content: PropTypes.string,
    onReplyPost: PropTypes.func,
}