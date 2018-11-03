import React, {Component} from 'react'
import {render} from 'react-dom'

import Forum from '../../src'

import topics from './data/topics.json';
import _discussions from './data/discussions.json';
import currentUser from './data/current-user.json';

const discussions = _discussions.map((d) => {
  d.createAt = new Date(d.createAt);
  return d;
})


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

  handleCreateDiscussion(topicId, discussionData, cb) {
    setTimeout(() => {
      discussions.push({
        "id": Number(new Date()).toString(),
        "topicId": topicId,
        "title": discussionData.title,
        "content": discussionData.content,
        "creator": currentUser,
        "createAt": new Date(),
        "replies": [],
      });
      this.setState({
        discussions: [
          {
            id: Number(new Date()).toString(),
            topicId: topicId,
            title: discussionData.title, 
            users: [currentUser],
            lastActivity: new Date(),
            replies: 0,
            views: 0
          },
          ...this.state.discussions
        ]
      });
      cb();
    }, 3000);
  }

  handleUpdateDiscussion(discussionData, discussionId, cb) {
    
  }

  handleDeleteDiscussion(discussionId, cb) {
   
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

  handleCreateReply(discussionId, replyData, cb) {
    const discussion = discussions.find((dis) => {
      return dis.id === discussionId;
    });
    discussion.replies = discussion.replies ? discussion.replies : [];
    discussion.replies.push({
      "id": `r${Number(new Date())}`,
      "user": currentUser,
      "content": replyData.content,
      "sendDate": new Date(),
    });
    const discussionTarget = Object.assign({}, discussion);
    setTimeout(() => {
      this.setState({
        discussions: [
          ...this.state.discussions,
          {
            "id": discussionTarget.id,
            "topicId": discussionTarget.topicId,
            "title": discussionTarget.title,
            "users": [discussionTarget.creator],
            "lastActivity": new Date(discussionTarget.createAt),
            "replies": discussionTarget.replies.length,
            "views": 0
          }
        ],
        discussion: {
          ...this.state.discussion,
          replies: [
            ...this.state.discussion.replies,
            {
              "id": `r${Number(new Date())}`,
              "user": currentUser,
              "content": replyData.content,
              "sendDate": new Date(),
            }       
          ]
        }
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
        onNeedDiscussionReplies={this.handleNeedDiscussionReplies.bind(this)}
        onCreateReply={this.handleCreateReply.bind(this)}
        onUpdateReply={this.handleUpdateReply.bind(this)}
        onDeleteReply={this.handleDeleteReply.bind(this)}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
