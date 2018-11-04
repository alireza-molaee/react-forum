import React, {Component, Fragment} from 'react';
import Avatar from './Avatar';
import PropTypes from 'prop-types';
import { discussionSummeryType } from '../prop-types';
import * as moment from 'moment';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroller';
import CreateDiscussionForm from './CreateDiscussionForm';
import {LangContext} from '../i18n';

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
        this.props.loadMore(page, this.props.match.params.topicId).then((isComplete) => {
            this.setState({
                hasMore: !isComplete,
            })
        });
    }

    handleClickOnRow(discussion) {
        this.props.history.push(`${this.props.match.url}/${discussion.id}`)
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
        return this.props.onAddDiscussion(this.props.match.params.topicId, discussion)
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-12">
                        <h2>{this.context.createDiscussion}</h2>
                    </div>
                    <div className="col-12">
                        <CreateDiscussionForm
                            onSubmit={this.handleAddDiscussion}  
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>{this.context.discussions}</h2>
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
                                        <th scope="col">{this.context.title}</th>
                                        <th scope="col">{this.context.creator}</th>
                                        <th scope="col">{this.context.replies}</th>
                                        <th scope="col">{this.context.lastActivity}</th>
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

DiscussionsSection.contextType = LangContext;

DiscussionsSection.propTypes = {
    discussions: PropTypes.arrayOf(discussionSummeryType),
    loadMore: PropTypes.func,
    onAddDiscussion: PropTypes.func,
}