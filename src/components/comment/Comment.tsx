import React from 'react';
import css from './comment.module.css';

interface InterfaceProps {
    comment: string,
    commentType: string
}

export const Comment = (props: InterfaceProps) => {
    return (
        <div className={css.comment}>
            {props.comment}
        </div>
    );
};
