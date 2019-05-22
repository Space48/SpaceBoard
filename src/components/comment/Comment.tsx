import React from 'react';
import css from './comment.module.css';

interface InterfaceProps {
    comment: string,
    commentType: string,
    className: string
}

export const Comment = (props: InterfaceProps) => {
    return (
        <div className={`${css.comment} ${props.className}`}>
            {props.comment}
        </div>
    );
};
