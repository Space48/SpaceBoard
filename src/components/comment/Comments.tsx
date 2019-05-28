import React from 'react';
import { Comment } from './Comment';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import css from './comments.module.css';
import commentAnimations from './comment-animations.module.css';

interface InterfaceProps {
    comments: string[],
    commentType: string
}

export const Comments : React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    return (
        <div className={css.container}>
                <TransitionGroup component={null}>
                    {
                        // todo: Use a unique ID as the key rather than the comment, using index breaks the animations?!
                        props.comments.map((comment: string) => (
                                <CSSTransition key={comment} timeout={200} classNames={{...commentAnimations}}>
                                    <Comment className={css.comment} comment={comment} commentType={props.commentType} />
                                </CSSTransition>
                            )
                        )
                    }
                </TransitionGroup>
        </div>
    );
};
