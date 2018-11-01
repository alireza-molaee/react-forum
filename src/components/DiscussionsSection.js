import React, {Component, Fragment} from 'react';
import Avatar from './Avatar';
import PropTypes from 'prop-types';
import { discussionSummeryType } from '../prop-types';
import * as moment from 'moment';
import '../styles/discussions-section.css';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroller';
import CreateDiscussionForm from './CreateDiscussionForm';


export default class DiscussionsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMore: true,
        }

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleClickOnRow = this.handleClickOnRow.bind(this);
        this.renderEachRow = this.renderEachRow.bind(this);
        this.handleAddDiscussion = this.handleAddDiscussion.bind(this);
    }

    handleLoadMore(page) {
        this.props.loadMore(page).then((isComplete) => {
            this.setState({
                hasMore: !isComplete,
            })
        });
    }

    handleClickOnRow(discussion) {
        this.props.onSelectDiscussion(discussion.id);
    }

    renderEachRow() {
        return this.props.discussions.map((discussion, index) => {
            const creator = discussion.users[0];
            let avatar = '';
            if (creator) {
                avatar = <Avatar
                    name={creator.fullName}
                    role={creator.role}
                    url={creator.image}
                    size="sm"
                />
            }
            return (
                <tr key={index} className="row-link-style"
                    onClick={(e) => {
                        this.handleClickOnRow(discussion);
                    }}
                >
                    <th scope="row">{discussion.title}</th>
                    <td>{avatar}</td>
                    <td>{discussion.replies}</td>
                    <td>{moment(discussion.lastActivity).fromNow()}</td>
                </tr>
            );
        });
    }

    handleAddDiscussion(discussion) {
        this.props.onAddDiscussion(discussion);
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-12">
                        <h2>Create New Discussion</h2>
                    </div>
                    <div className="col-12">
                        <CreateDiscussionForm
                            onSubmit={this.handleAddDiscussion}  
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Discussions</h2>
                    </div>
                    <div className="col-12">
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
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Creator</th>
                                        <th scope="col">Replies</th>
                                        <th scope="col">Last Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderEachRow()}
                                </tbody>
                            </table>
                        </InfiniteScroll>
                    </div>
                </div>
            </Fragment>
        );
    }
}

DiscussionsSection.propTypes = {
    discussions: PropTypes.arrayOf(discussionSummeryType),
    onSelectDiscussion: PropTypes.func,
    loadMore: PropTypes.func,
}