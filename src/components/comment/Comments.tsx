import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import css from './comments.module.css';
import commentAnimations from './comment-animations.module.css';
import { InterfaceColumn } from '../../types/data';

interface InterfaceProps {
    comments: InterfaceColumn,
    commentType: string
}

export const Comments: React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    const { comments } = props;

    return (
        <div className={`${css.container}`}>
            <TransitionGroup component={null}>
                {
                    // todo: Use a unique ID as the key rather than the comment, using index breaks the animations?!
                    comments && Object.keys(comments).map((comment, i)=> {
                        return (
                            <CSSTransition key={comment} timeout={0} classNames={{...commentAnimations}}>
                                <div className={css.comment}>
                                    {comments[comment].message}
                                </div>
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        </div>
    );
};
