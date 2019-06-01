import { InterfaceTeamData } from '../../types/data';
import React, { useState } from 'react';
import Axios from 'axios';
import css from './new-comment.module.css';
import { baseUrl } from '../../utilities/urls';

interface InterfaceProps {
    commentType: string,
    updateTeamData: Function
}

export const NewComment : React.FunctionComponent<InterfaceProps> = (props: InterfaceProps) => {
    const [ comment, setComment ] = useState('');

    /**
     * @param {React.FormEvent<HTMLFormElement>} event
     */
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        Axios.post(`${baseUrl()}new.php?commentType=` + props.commentType + '&text=' + comment)
            .then(function (response: InterfaceTeamData) {
                props.updateTeamData(response.data);
                setComment(''); // Reset the comment
            })
            .catch(function (error: Object) {
                console.log(error);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(event.target.value);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className={css.container}>
                <textarea placeholder="Add your comment here" onChange={handleChange} className={css.textarea} value={comment}/>
                <button type="submit" className={`${css.submit} background--${props.commentType}`}>Add</button>
            </form>
        </>
    )
};