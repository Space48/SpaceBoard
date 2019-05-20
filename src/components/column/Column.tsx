import React, { useState } from 'react';
import Axios from 'axios';
import { InterfaceTeamData } from '../../types/data';
import { Comments } from '../comment/Comments';

interface interfaceProps {
    commentType: string,
    updateTeamData: Function,
    comments: string[]
}

const Column: React.FunctionComponent<interfaceProps> = (props: interfaceProps) => {
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

    // todo: Render out comments
    // todo: Hitting enter whilst typing results in an error?
    return (
        <>
            <h2>{props.commentType}</h2>
            <Comments comments={props.comments}/>

            <form onSubmit={handleFormSubmit}>
                <textarea placeholder="Add your comment here" onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </>
    );
};

export default Column;