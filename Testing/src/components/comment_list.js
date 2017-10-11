import React from 'react';
import { connect } from 'react-redux';

const CommentList = ({ comments }) =>
    <ul className="comment-list">
        {comments.map((c, i) => {
            return (
                <li key={i}>
                    {c}
                </li>
            );
        })}
    </ul>;

function mapStateToProps(state) {
    return { comments: state.comments };
}

export default connect(mapStateToProps)(CommentList);
