import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DiscussionSection from './components/DiscussionSection';
import DiscussionsSection from './components/DiscussionsSection';
import CreateDiscussionSection from './components/CreateDiscussionSection';
import TopicsSection from './components/TopicsSection';
import Loading from './components/Loading';


export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 'topics'
    };
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    }
    switch (this.state.section) {
      case 'discussion':
        return <DiscussionSection />
      case 'discussions':
        return <DiscussionsSection />
      case 'create-discussions':
        return <CreateDiscussionSection />
      case 'topics':
        return <TopicsSection />
      default:
        return <span>error</span>
    }
  }
}

const userType = PropTypes.exact({
  image: PropTypes.string,
  fullName: PropTypes.string,
  role: PropTypes.string,
});

const topicType = PropTypes.exact({
  id: PropTypes.string,
  title: PropTypes.string,
  order: PropTypes.number,
  color: PropTypes.string,
  discussionCount: PropTypes.number,
  description: PropTypes.string,
});

const discussionSummeryType = PropTypes.exact({
  id: PropTypes.string,
  topicId: PropTypes.string,
  title: PropTypes.string,
  users: PropTypes.arrayOf(userType),
  lastActivity: PropTypes.instanceOf(Date),
  replies: PropTypes.number,
  views: PropTypes.number,
});

const replyType = PropTypes.exact({
  id: PropTypes.string,
  user: userType,
  content: PropTypes.string
});

const discussionType = PropTypes.exact({
  id: PropTypes.string,
  topicId: PropTypes.string,
  creator: userType,
  title: PropTypes.string,
  content: PropTypes.string,
  createAt: PropTypes.instanceOf(Date),
  replies: PropTypes.arrayOf(replyType)
});

Forum.propTypes = {
  loading: PropTypes.bool,
  currentUser: userType,
  topics: PropTypes.arrayOf(topicType),
  latest: PropTypes.arrayOf(latestType),
  discussions: PropTypes.arrayOf(discussionSummeryType),
  discussion: discussionType,
  canReply: PropTypes.bool,
  canCreateDiscussion: PropTypes.bool,
  onNeedDiscussions: PropTypes.func,
  onNeedDiscussion: PropTypes.func,
  onCreateDiscussion: PropTypes.func,
  onUpdateDiscussion: PropTypes.func,
  onDeleteDiscussion: PropTypes.func,
  onCreateReply: PropTypes.func,
  onUpdateReply: PropTypes.func,
  onDeleteReply: PropTypes.func,
}