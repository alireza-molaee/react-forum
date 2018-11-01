import React, {Component} from 'react'
import {render} from 'react-dom'

import Forum from '../../src'

import topics from './data/topics.json';
import discussions from './data/discussion.json';
// import discussions from './data/discussions.json';
import latest from './data/latest.json';
import currentUser from './data/current-user.json';



class Demo extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      currentUser,
      topics,
      discussions: [],
      discussion: null,
      replies: [],
    }
  }

  handleNeedDiscussions(selectedTopicId, sortBy, page, cb) {
    let resultDiscussions = discussions.filter((dis) => {
      return dis.topicId === selectedTopicId;
    });
    resultDiscussions = resultDiscussions.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createAt) - new Date(a.createAt);
        default:
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
      }
    });
    setTimeout(() => {
      page = page - 1;
      const itemPerPage = 10;
      const totalPage = Math.ceil(resultDiscussions.length / itemPerPage);
      const estimatedEndIndex = itemPerPage * page + itemPerPage;
      const startIndex = itemPerPage * page;
      const endIndex = estimatedEndIndex < totalPage * itemPerPage ? estimatedEndIndex : resultDiscussions.length;
      this.setState({
        discussions: [
          ...this.state.discussions,
          ...resultDiscussions.map((d) => {
            return {
              id: d.id,
              topicId: d.topicId,
              title: d.title, 
              users: [d.creator],
              lastActivity: new Date(d.createAt),
              replies: d.replies.length,
              views: 3
            }
          }).slice(startIndex, endIndex)
        ]
      });
      cb((itemPerPage * page + itemPerPage) >= totalPage * itemPerPage);
    }, 1500);
  }

  handleNeedDiscussion(id, cb) {
    let discussionTarget = discussions.filter((dis) => {
      return dis.id === id;
    });
    discussionTarget = discussionTarget[0];
    discussionTarget = Object.assign({}, discussionTarget);
    discussionTarget.replies = [];
    setTimeout(() => {
      this.setState({
        discussion: discussionTarget,
      }, () => {
        cb();
      });
    }, 3000);
  }

  handleCreateDiscussion(discussionData, topicId, cb) {
    setTimeout(() => {
      discussions.push({
        "id": Number(new Date()).toString(),
        "topicId": topicId,
        "title": discussionData.title,
        "creator": currentUser,
        "createAt": new Date(),
        "replies": [],
      });
      this.setState({
        discussions
      });
      cb();
    }, 3000);
  }

  handleUpdateDiscussion(discussionData, discussionId, cb) {
    setTimeout(() => {
      const targetIndex = discussions.findIndex(d => d.id === discussionId);
      discussions[targetIndex].title = discussionData.date;
      this.setState({
        discussions
      });
      cb();
    }, 3000);
  }

  handleDeleteDiscussion(discussionId, cb) {
    setTimeout(() => {
      const targetIndex = discussions.findIndex(d => d.id === discussionId);
      if (targetIndex > -1) {
        discussions.splice(targetIndex, 1);
      }
      this.setState({
        discussions
      });
      cb();
    }, 3000);
  }

  handleNeedDiscussionReplies(discussionId, page, cb) {
    let discussionTarget = discussions.find((discussion) => {
      return discussion.id === discussionId;
    });
    page = page - 1;
    const itemPerPage = 10;
    const totalPage = Math.ceil(discussionTarget.replies.length / itemPerPage);
    const estimatedEndIndex = itemPerPage * page + itemPerPage;
    const startIndex = itemPerPage * page;
    const endIndex = estimatedEndIndex < totalPage * itemPerPage ? estimatedEndIndex : discussionTarget.replies.length;
    const newReplies = discussionTarget.replies.map((r) => {
      return {
        "id": r.id,
        "user": r.user,
        "content": r.content,
        "sendDate": new Date(r.sendDate),
      }
    }).slice(startIndex, endIndex)
    let replies = [
      ...this.state.discussion.replies,
      ...newReplies,
    ];
    setTimeout(() => {

      this.setState({
        discussion: {
          ...this.state.discussion,
          replies: replies
        }
      });
      cb(estimatedEndIndex >= totalPage * itemPerPage);
    }, 1000);
  }

  handleCreateReply(replyData, discussionId, cb) {
    const discussion = discussions.filter((dis) => {
      return dis.topicId === discussionId;
    });
    discussion.replies.push({
      "id": "r6134",
      "user": currentUser,
      "content": replyData.content,
      "sendDate": new Date(),
    });
    setTimeout(() => {
      this.setState({
        discussions,
      });
      cb();
    }, 1000)
  }

  handleUpdateReply() {

  }

  handleDeleteReply() {

  }

  render() {
    return <div className="container">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">react-forum Demo:</h1>
          <p className="lead">Foo Bar.</p>
        </div>
      </div>
      <Forum 
        currentUser={this.state.currentUser}
        topics={this.state.topics}
        latest={this.state.latest}
        discussions={this.state.discussions}
        discussion={this.state.discussion}
        canReply
        canCreateDiscussion
        onNeedDiscussions={this.handleNeedDiscussions.bind(this)}
        onNeedDiscussion={this.handleNeedDiscussion.bind(this)}
        onCreateDiscussion={this.handleCreateDiscussion.bind(this)}
        onUpdateDiscussion={this.handleUpdateDiscussion.bind(this)}
        onDeleteDiscussion={this.handleDeleteDiscussion.bind(this)}
        onCreateReply={this.handleCreateReply.bind(this)}
        onUpdateReply={this.handleUpdateReply.bind(this)}
        onDeleteReply={this.handleDeleteReply.bind(this)}
        onNeedDiscussionReplies={this.handleNeedDiscussionReplies.bind(this)}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
