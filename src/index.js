import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import {LangContext, langs} from './i18n';

import './styles/index.css';

import DiscussionSection from './components/DiscussionSection';
import DiscussionsSection from './components/DiscussionsSection';
import TopicsSection from './components/TopicsSection';

import {
  discussionSummeryType,
  discussionType,
  topicType,
  userType
} from './prop-types';


export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedDiscussion: null,
      selectedTopic: null
    };

    this.handleLoadReplies = this.handleLoadReplies.bind(this);
    this.handleLoadDiscussions = this.handleLoadDiscussions.bind(this);
    this.handleLoadDiscussion = this.handleLoadDiscussion.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
    this.handleAddDiscussion = this.handleAddDiscussion.bind(this);
  }

  handleLoadReplies(discussionId, page) {
    return new Promise((resolver) => {
      this.props.onNeedDiscussionReplies(discussionId, page, (isLoadAllOfReplies) => {
        resolver(isLoadAllOfReplies);
      });
    });
  }

  handleLoadDiscussions(page, topicId) {
    return new Promise((resolver) => {
      this.props.onNeedDiscussions(topicId, 'date', page, (isLoadAllOfDiscussion) => {
        resolver(isLoadAllOfDiscussion);
      });
    });
  }

  handleLoadDiscussion(discussionId) {
    return new Promise((resolver) => {
      this.props.onNeedDiscussion(discussionId, () => {
        resolver();
      });
    });
  }

  handleAddReply(discussionId, reply) {
    return new Promise((resolver) => {
      this.props.onCreateReply(discussionId, reply, () => {
        resolver();
      });
    });
  }

  handleAddDiscussion(topicId, discussion) {
    return new Promise((resolver) => {
      this.props.onCreateDiscussion(topicId, discussion, () => {
        resolver();
      });
    })
  }

  render() {
    const { basePath } = this.props;
    const selectedLang = langs[this.props.lang] || langs['fa'];
    return (
      <LangContext.Provider value={selectedLang}>
        <Switch>
          <Route exact path={`${basePath}/topics/:topicId/discussions/:discussionId`} render={(props) => (
            <DiscussionSection
              discussion={this.props.discussion}
              onNeedDiscussion={this.handleLoadDiscussion}
              loadMore={this.handleLoadReplies}
              onAddReply={this.handleAddReply}
              {...props}
            />
          )}/>
          <Route exact path={`${basePath}/topics/:topicId/discussions`} render={(props) => (
            <DiscussionsSection
              discussions={this.props.discussions}
              loadMore={this.handleLoadDiscussions}
              onAddDiscussion={this.handleAddDiscussion}
              {...props}
            />
          )}/>
          <Route exact path={`${basePath}/topics`} render={(props) => (
            <TopicsSection
              topics={this.props.topics}
              latest={this.props.latest}
              {...props}
            />
          )}/>
          <Redirect to={`${basePath}/topics`} />
        </Switch>
      </LangContext.Provider>
    );
  }
}


Forum.propTypes = {
  lang: PropTypes.string,
  basePath: PropTypes.string,
  topics: PropTypes.arrayOf(topicType),
  latest: PropTypes.arrayOf(discussionSummeryType),
  discussions: PropTypes.arrayOf(discussionSummeryType),
  discussion: discussionType,
  canReply: PropTypes.bool,
  canCreateDiscussion: PropTypes.bool,
  onNeedDiscussions: PropTypes.func,
  onNeedDiscussion: PropTypes.func,
  onNeedDiscussionReplies: PropTypes.func,
  onCreateDiscussion: PropTypes.func,
  onUpdateDiscussion: PropTypes.func,
  onDeleteDiscussion: PropTypes.func,
  onCreateReply: PropTypes.func,
  onUpdateReply: PropTypes.func,
  onDeleteReply: PropTypes.func,
}