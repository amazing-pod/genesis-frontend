import React, { useState } from "react";
import "./ReplyForm.css";

const ReplyForm = ({ commentId, onReplySubmit, onCancel }) => {
    const [newReply, setNewReply] = useState("");

    const handleReplyChange = (e) => {
        setNewReply(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        onReplySubmit(commentId, newReply);
        setNewReply("");
    };

    return (
        <form className="reply-form" onSubmit={handleReplySubmit}>
            <textarea
                value={newReply}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
                required
            />
            <div className="reply-form-buttons">
                <button type="submit">Post Reply</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ReplyForm;
