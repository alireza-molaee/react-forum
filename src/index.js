import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles/bootstrap.min.css';
import './styles/global.css';

import DiscussionSection from './components/DiscussionSection';
import DiscussionsSection from './components/DiscussionsSection';
import TopicsSection from './components/TopicsSection';
import Loading from './components/Loading';

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
      section: 'topics',
      selectedDiscussion: null,
      selectedTopic: null
    };

    this.handleSelectTopic = this.handleSelectTopic.bind(this);
    this.handleLoadReplies = this.handleLoadReplies.bind(this);
    this.handleLoadDiscussions = this.handleLoadDiscussions.bind(this);
    this.handleSelectDiscussion = this.handleSelectDiscussion.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
    this.handleAddDiscussion = this.handleAddDiscussion.bind(this);
  }

  handleSelectTopic(topicId) {
    this.setState({
      section: 'discussions',
      selectedTopic: topicId
    })
  }

  handleLoadReplies(page) {
    return new Promise((resolver) => {
      this.props.onNeedDiscussionReplies(this.state.selectedDiscussion ,page, (isLoadAllOfReplies) => {
        resolver(isLoadAllOfReplies);
      });
    });
  }

  handleLoadDiscussions(page) {
    return new Promise((resolver) => {
      this.props.onNeedDiscussions(this.state.selectedTopic, 'date', page, (isLoadAllOfDiscussion) => {
        resolver(isLoadAllOfDiscussion);
      });
    });
  }

  handleSelectDiscussion(discussionId) {
    this.setState({
      section: '',
      selectedDiscussion: discussionId
    });
    return new Promise((resolver) => {
      this.props.onNeedDiscussion(discussionId, () => {
        this.setState({
          section: 'discussion',
        });
        resolver();
      });
    });
  }

  handleAddReply(reply) {
    return new Promise((resolver) => {
      this.props.onCreateReply(this.state.selectedDiscussion, reply, () => {
        resolver();
      });
    });
  }

  handleAddDiscussion(discussion) {
    return new Promise((resolver) => {
      this.props.onCreateDiscussion(this.state.selectedTopic, discussion, () => {
        resolver();
      });
    })
  }

  render() {
    switch (this.state.section) {
      case 'discussion':
        return <DiscussionSection
          discussion={this.props.discussion}
          loadMore={this.handleLoadReplies}
          onAddReply={this.handleAddReply}
        />
      case 'discussions':
        return <DiscussionsSection
          discussions={this.props.discussions}
          onSelectDiscussion={this.handleSelectDiscussion}
          loadMore={this.handleLoadDiscussions}
          onAddDiscussion={this.handleAddDiscussion}
        />
      case 'topics':
        return <TopicsSection
          topics={this.props.topics}
          latest={this.props.latest}
          onSelectTopic={this.handleSelectTopic}
        />
      default:
        return <Loading />        
    }
  }
}


Forum.propTypes = {
  currentUser: userType,
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