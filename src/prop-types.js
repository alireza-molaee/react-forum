import PropTypes from 'prop-types'

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
    content: PropTypes.string,
    sendDate: PropTypes.instanceOf(Date),
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

export {
    userType,
    topicType,
    discussionSummeryType,
    discussionType
}