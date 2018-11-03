import React, {Component} from 'react';
import PropTypes from 'prop-types';
import avatarImage from '../assets/avatar.png';
import Tooltip from 'tooltip.js';

export default class Avatar extends Component {

    constructor(props) {
        super(props);
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        const a = new Tooltip(this.imgRef.current, {
            placement: 'bottom',
            title: `${this.props.name} (${this.role})`
        });
    }

    getSize(sizeLabel) {
        switch(sizeLabel) {
            case 'sm':
                return 25;
            case 'md':
                return 50;
            case 'lg':
                return 75;
            case 'xl':
                return 200;
            default:
                return 25;
        }
    }

    render() {
        const source = this.props.url || avatarImage;
        const className = this.props.className || 'rounded-circle';
        const size = this.getSize(this.props.size);
        return (
            <div className="avatar">
                <img
                    width={size}
                    height={size}
                    src={source}
                    className={className}
                    alt={this.props.name || 'anonymous user'}
                    ref={this.imgRef}
                />
            </div>
        );
    }
}

Avatar.protoTypes = {
    name: PropTypes.string,
    role: PropTypes.string,
    url: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string
}