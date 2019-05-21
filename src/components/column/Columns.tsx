import React from 'react';
import Column from './Column';
import { InterfaceColumns } from '../../types/data';
import css from './columns.module.css';

interface InterfaceProps {
    commentTypes: string[],
    teamData: InterfaceColumns,
    updateTeamData: Function
}

export const Columns : React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => (
    <div className={css.container}>
        {props.commentTypes.map(commentType => {
            return <Column key={commentType} comments={props.teamData[commentType]} updateTeamData={props.updateTeamData} commentType={commentType} />
        })}
    </div>
);