import React from 'react';
import css from './comment.module.css';

interface InterfaceProps {
    comment: string,
    commentType: string,
    className: string
}

export const Comment : React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    return (
        <div className={`${css.comment} ${props.className}`}>
            {props.comment}
        </div>
    );
};
