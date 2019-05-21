import React, { useState } from 'react';
import Axios from 'axios';
import { InterfaceTeamData } from '../../types/data';
import css from './new-comment.module.css';

interface InterfaceProps {
    commentType: string,
    updateTeamData: Function
}

export const NewComment = (props: InterfaceProps) => {
    const [ comment, updateMessage ] = useState('');

    /**
     * @param {React.FormEvent<HTMLFormElement>} event
     */
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        Axios.post('/new.php?commentType=' + props.commentType + '&text=' + comment)
            .then(function (response: InterfaceTeamData) {
                console.log(response);
                props.updateTeamData(response.data);
            })
            .catch(function (error: Object) {
                console.log(error);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        updateMessage(event.target.value);
    };

    // todo: Fix - Hitting enter whilst typing results in an error
    return (
        <>
            <form onSubmit={handleFormSubmit} className={css.container}>
                <textarea placeholder="Add your comment here" onChange={handleChange} className={css.textarea}/>
                <button type="submit" className={`${css.submit} background--${props.commentType}`}>Add</button>
            </form>
        </>
    )
};