import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import { discussionType } from '../prop-types';


export default class DiscussionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
        }

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.renderEachPost = this.renderEachPost.bind(this);
        this.handleAddReply = this.handleAddReply.bind(this);
    }


    handleLoadMore(page) {
        this.props.loadMore(page).then((isCompletedLoad) => {
            this.setState({
                hasMore: !isCompletedLoad,
            });
        })
    }

    renderEachPost() {
        return this.props.discussion.replies.map((replyPost, index) => {
            return <Reply
                key={index}
                uid={replyPost.id}
                user={replyPost.user}
                sendDate={replyPost.sendDate}
                content={replyPost.content}
            />;
        });
    }

    handleAddReply(reply) {
        return this.props.onAddReply(reply)
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Discussion</h2>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <h1>{this.props.discussion.title}</h1>
                            <Reply
                                uid={this.props.discussion.id}
                                user={this.props.discussion.creator}
                                sendDate={this.props.discussion.createAt}
                                content={this.props.discussion.content}
                            />
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.handleLoadMore}
                                hasMore={this.state.hasMore}
                                threshold={30}
                                loader={<div className="text-center my-5" key={0}><Loader 
                                    type="Oval"
                                    color="gray"
                                    height="50"	
                                    width="50"
                                /></div>}
                            >
                                {this.renderEachPost()}
                            </InfiniteScroll>
                        </div>
                        {/* <div className="col-md-3 col-lg-2 d-xs-none">
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ReplyForm onSubmit={this.handleAddReply} initData={null}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DiscussionSection.propTypes = {
    discussion: discussionType,
    loadMore: PropTypes.func,
    onAddReply: PropTypes.func,
}