import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TopicItem extends Component {
    handleClick(e) {
        e.preventDefault();
        this.props.onSelect();
    }

    render() {
        const { color, title, description, discussions } = this.props
        return (
            <a 
                href={`/${title}`}
                style={{borderLeftColor: color}}
                className="list-group-item list-group-item-action"
                onClick={this.handleClick.bind(this)}
            >
                <div className="d-flex justify-content-between align-items-center">
                    {title}
                    <span className="badge badge-primary badge-pill">{String(discussions)}</span>
                </div>
                <small>{description}</small>
            </a>
        );
    }
}

TopicItem.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    discussions: PropTypes.number,
    onSelect: PropTypes.func,
}