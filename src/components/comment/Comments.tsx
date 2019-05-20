import React from 'react';
import { Comment } from './Comment';
import css from './comments.module.css';

interface InterfaceProps {
    comments: string[]
}

/**
 * Use a method to render the comments as I find inline maps to be harder to read.
 */
const renderComments = (comments: string[]) => (
    // Nothing unique to use as a key so index will do providing we never need to sort comments
    comments.map((comment: string, index: number) => {
        return <Comment key={index} comment={comment} />
    })
);

export const Comments = (props: InterfaceProps) => {
    console.log('updated');
    return (
        <div className={css.container}>
            {renderComments(props.comments)}
        </div>
    );
};
