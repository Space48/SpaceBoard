import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import css from './comments.module.css';
import commentAnimations from './comment-animations.module.css';

interface InterfaceProps {
    comments: string[],
    commentType: string
}

export const Comments: React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    return (
        <div className={`${css.container}`}>
            <TransitionGroup component={null}>
                {
                    // todo: Use a unique ID as the key rather than the comment, using index breaks the animations?!
                    // The ID should be truly unique not just a simple integer else we may run into problems when switching weeks
                    props.comments.map((comment: string) => (
                            <CSSTransition key={comment} timeout={0} classNames={{...commentAnimations}}>
                                <div className={css.comment}>
                                    {comment}
                                </div>
                            </CSSTransition>
                        )
                    )
                }
            </TransitionGroup>
        </div>
    );
};
