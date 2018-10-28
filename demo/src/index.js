import React, {Component} from 'react'
import {render} from 'react-dom'

import Forum from '../../src'

import topics from './data/topics.json';
import discussion from './data/discussion.json';
import discussions from './data/discussions.json';
import latest from './data/latest.json';
import currentUser from './data/current-user.json';



class Demo extends Component {

  state = {
    loading: false,
    currentUser,
    topics,
    discussion,
    discussions,
    latest
  }

  handleNeedDiscussions(selectedTopicId, sortBy) {
    let resultDiscussions = discussions.filter((dis) => {
      return dis.topicId === selectedTopicId;
    });
    resultDiscussions = resultDiscussions.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        default:
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
      }
    });
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({
        loading: false,
        resultDiscussions
      });
    }, 3000);
  }

  handleNeedDiscussion(id) {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({
        loading: false,
        discussion
      });
    }, 3000);
  }

  handleCreateDiscussion(discussionData, topicId) {
    this.setState({loading: true});
    setTimeout(() => {
      discussions.push({
        "id": new number(Date()).toString(),
        "topicId": topicId,
        "title": discussionData.title,
        "users": [currentUser],
        "lastActivity": new Date().toString(),
        "replies": 0,
        "views": 1
      });
      this.setState({
        loading: false,
        discussion
      });
    }, 3000);
  }

  handleUpdateDiscussion(discussionData, discussionId) {
    this.setState({loading: true});
    setTimeout(() => {
      const targetIndex = discussions.findIndex(d => d.id === discussionId);
      discussions[targetIndex].title = discussionData.date;
      discussions[targetIndex].lastActivity = new Date();
      this.setState({
        loading: false,
        discussions
      });
    }, 3000);
  }

  handleDeleteDiscussion(discussionId) {
    this.setState({loading: true});
    setTimeout(() => {
      const targetIndex = discussions.findIndex(d => d.id === discussionId);
      if (targetIndex > -1) {
        discussions.splice(targetIndex, 1);
      }
      this.setState({
        loading: false,
        discussions
      });
    }, 3000);
  }

  handleCreateReply(replyData, discussionId) {
    discussion.replies.push({
      "id": "r6134",
      "user": currentUser,
      "content": replyData.content
    })
  }

  handleUpdateReply() {

  }

  handleDeleteReply() {

  }

  render() {
    return <div>
      <h1>react-forum Demo: </h1>
      <Forum 
        loading={this.state.loading}
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
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
