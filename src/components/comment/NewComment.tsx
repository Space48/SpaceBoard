import React, { useState } from 'react';
import Axios from 'axios';
import { InterfaceTeamData } from '../../types/data';
import css from './new-comment.module.css';

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

        // todo: Handle paragraphs, convert to array then map out inside p tags?
        // console.log(comment.split('\n'));

        Axios.post('/new.php?commentType=' + props.commentType + '&text=' + comment)
            .then(function (response: InterfaceTeamData) {
                console.log(response);
                props.updateTeamData(response.data);
                setComment('');
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