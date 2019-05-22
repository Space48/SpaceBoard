import React, { useState } from 'react';
import { Comment } from './Comment';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import css from './comments.module.css';
import commentAnimations from './comment-animations.module.css';

interface InterfaceProps {
    comments: string[],
    commentType: string
}

export const Comments = (props: InterfaceProps) => {
    return (
        <div className={css.container}>
                <TransitionGroup>
                    {
                        // Nothing unique to use as a key, index will be ok providing we never need to sort comments
                        props.comments.map((comment: string, index: number) => (
                                <CSSTransition key={index} timeout={200} classNames={{...commentAnimations}}>
                                    <Comment className={css.comment} comment={comment} commentType={props.commentType} />
                                </CSSTransition>
                            )
                        )
                    }
                </TransitionGroup>
        </div>
    );
};
