import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import getCurrentWeekNumber from '../../utilities/getWeekNumber';
import appAnimations from './app-animations.module.css';
import css from './app.module.css';
import { InterfaceColumns, InterfaceTeamData, Team } from '../../types/data';
import { baseUrl } from '../../utilities/urls';
import { NewComment } from '../comment/NewComment';
import { Comments } from '../comment/Comments';


const commentTypes: string[] = ['good', 'bad', 'actions'];

const emptyTeamData: InterfaceColumns = {
    good: [''],
    bad: [''],
    actions: ['']
};

const weekNumber = getCurrentWeekNumber(new Date());

const convertFirstLetterToUppercase = (word : string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
};

const App : React.FunctionComponent = () => {
    // todo: Include a landing page so the team can be chosen (if Black/Yellow will use this?)
    const [ team ] = useState<Team>('red');
    const [ teamData, updateTeamData ] = useState<InterfaceColumns>(emptyTeamData);
    const [ shouldRender, setShouldRender ] = useState<boolean>(false);
    const [ fullWidthMode, setFullWidthMode ] = useState<boolean>(false);

    // This is resonsible for updating the component state once when the component is mounted.
    // The empty array as a second argument means never update (no dependencies)
    useEffect(() => {
        const url = `${baseUrl()}teams/${team}/week${weekNumber}.json`;

        Axios.post(url)
            .then((response: InterfaceTeamData) => {
                // If the file doesn't exist the backend will create it then return HTML,
                // because that HTML is a string it's safe to assume the data is incorrect
                // if the response data is not an object
                if (response.hasOwnProperty('data') && typeof response.data === 'object') {
                    updateTeamData(response.data);
                }

                setShouldRender(true);
            })
            .catch((error) => console.error(error));
    }, [team]); // Only re-run when team state changes

    const widthBasedStyling = {
        fontSize: fullWidthMode ? '20px' : '16px'
    };
    const width = fullWidthMode ? css.fullWidthMode : '';

    return (
        <div style={widthBasedStyling}>
            <div className={css.header}>
                <h1>Space48's Retro Board</h1>
                <p>Click the button below to toggle full-width mode, this may be useful for displaying on TVs.</p>
                <button onClick={() => setFullWidthMode(!fullWidthMode)}>Toggle Full Width Mode</button>
            </div>

            <CSSTransition in={shouldRender} timeout={200} classNames={{...appAnimations}}>
                <div className={appAnimations.app}>
                    <div className={`${css.container} ${width}`}>
                        {commentTypes.map(commentType => (
                            <div className={`${css.column}`} key={commentType}>
                                <div className={`${css.name}`}>
                                    <span className={`${css.colorPreview} background--${commentType}`} />
                                    {convertFirstLetterToUppercase(commentType)}
                                </div>
                                <NewComment commentType={commentType} updateTeamData={updateTeamData}/>
                                <Comments commentType={commentType} comments={teamData[commentType]}/>
                            </div>
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default App;
