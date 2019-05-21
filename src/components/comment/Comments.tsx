import React from 'react';
import { Comment } from './Comment';
import css from './comments.module.css';

interface InterfaceProps {
    comments: string[],
    commentType: string
}

export const Comments = (props: InterfaceProps) => {
    return (
        <div className={css.container}>
            {
                // Nothing unique to use as a key, index will be ok providing we never need to sort comments
                props.comments.map((comment: string, index: number) => {
                    return <Comment key={index} comment={comment} commentType={props.commentType} />
                })
            }
        </div>
    );
};
