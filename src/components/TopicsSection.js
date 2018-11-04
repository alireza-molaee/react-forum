import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TopicItem from './TopicItem';
import { topicType, discussionSummeryType } from '../prop-types';
import {LangContext} from '../i18n';


export default class TopicsSection extends Component {

    constructor(props) {
        super(props);
        this.renderTopics = this.renderTopics.bind(this);
        this.handleSelectTopic = this.handleSelectTopic.bind(this);
    }

    handleSelectTopic(topic) {
        this.props.history.push(`${this.props.match.url}/${topic.id}/discussions`);
    }

    renderTopics() {
        return this.props.topics.map((topic, index) => {
            const topicItemProps = {
                color: topic.color,
                title: topic.title,
                description: topic.description,
                discussions: topic.discussionCount,
            }
            return (
                <TopicItem key={index} onSelect={() => {
                    this.handleSelectTopic(topic)
                }} {...topicItemProps}/>
            );
        })
    }

    render() {
        console.log(this.context);
        return (
            <div className="row">
                <div className="col-12 col-md-7 col-lg-6">
                    <h2>{this.context.topics}</h2>
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <span className="text-muted">{this.context.title}</span>
                        <span className="text-muted">{this.context.discussionCount}</span>
                    </div>
                    <div className="list-group topics-list">
                        {this.renderTopics()}
                    </div>
                </div>
                <div className="col-12 col-md-5 col-lg-6">

                </div>
            </div>
        );
    }
}

TopicsSection.contextType = LangContext;

TopicsSection.propTypes = {
    topics: PropTypes.arrayOf(topicType),
    latest: PropTypes.arrayOf(discussionSummeryType),
    onSelectTopic: PropTypes.func,
    onSelectLatest: PropTypes.func
}