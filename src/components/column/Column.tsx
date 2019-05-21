import React from 'react';
import { Comments } from '../comment/Comments';
import css from './column.module.css';
import { NewComment } from '../comment/NewComment';

interface InterfaceProps {
    commentType: string,
    updateTeamData: Function,
    comments: string[]
}

const convertFirstLetterToUppercase = (word : string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
};

const Column: React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    const { commentType, comments, updateTeamData} = props;

    return (
        <div className={`${css.column}`}>
            <div className={`${css.name}`}>
                <span className={`${css.colorPreview} background--${commentType}`} />
                {convertFirstLetterToUppercase(props.commentType)}
            </div>
            <NewComment commentType={commentType} updateTeamData={updateTeamData}/>
            <Comments commentType={commentType} comments={comments}/>
        </div>
    )
};

export default Column;
