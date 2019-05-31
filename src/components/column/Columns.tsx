import React from 'react';
import { InterfaceColumns } from '../../types/data';
import css from './columns.module.css';
import { NewComment } from '../comment/NewComment';
import { Comments } from '../comment/Comments';

interface InterfaceProps {
    commentTypes: string[],
    isFullWidthMode: boolean,
    teamData: InterfaceColumns,
    updateTeamData: Function
}

const convertFirstLetterToUppercase = (word : string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
};

export const Columns : React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    const width = props.isFullWidthMode ? css.fullWidthMode : '';

    return (
        <div className={`${css.container} ${width}`}>
            {props.commentTypes.map(commentType => (
                <div className={`${css.column}`} key={commentType}>
                    <div className={`${css.name}`}>
                        <span className={`${css.colorPreview} background--${commentType}`} />
                        {convertFirstLetterToUppercase(commentType)}
                    </div>
                    <NewComment commentType={commentType} updateTeamData={props.updateTeamData}/>
                    <Comments commentType={commentType} comments={props.teamData[commentType]}/>
                </div>
            ))}
        </div>
    )
};