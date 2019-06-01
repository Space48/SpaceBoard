import { DarkMode, InterfaceColumns, InterfaceTeamData, Team } from '../../types/data';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import getCurrentWeekNumber from '../../utilities/getWeekNumber';
import { baseUrl } from '../../utilities/urls';
import { NewComment } from '../comment/NewComment';
import { Comments } from '../comment/Comments';
import css from './app.module.css';
import appAnimations from './app-animations.module.css';
import { CSSTransition } from 'react-transition-group';


const commentTypes: string[] = ['good', 'bad', 'actions'];

const emptyTeamData: InterfaceColumns = {
    good: [''],
    bad: [''],
    actions: ['']
};

const weekNumber = getCurrentWeekNumber(new Date());

const App : React.FunctionComponent = () => {
    // todo: Include a landing page so the team can be chosen (if Black/Yellow will use this?)
    const [ team ] = useState<Team>('red');
    const [ teamData, updateTeamData ] = useState<InterfaceColumns>(emptyTeamData);
    const [ shouldRender, setShouldRender ] = useState<boolean>(false);
    const [ fullWidthMode, setFullWidthMode ] = useState<boolean>(false);
    const [ darkMode, setDarkMode ] = useState<DarkMode>(false); // todo: Use context rather than thread props

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
    const theme = darkMode ? css.darkMode : '';
    const width = fullWidthMode ? css.containerFullWidth : '';

    return (
        <div style={widthBasedStyling} className={theme}>
            <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
            <div className={css.header}>
                <h1>Space48 Retro Board - <span className={css.teamName}>{team}</span> team</h1>
                <p>Click the button below to toggle full-width mode, this may be useful for displaying on TVs.</p>
                <button onClick={() => setFullWidthMode(!fullWidthMode)}>Toggle Full Width Mode</button>
            </div>

            <CSSTransition in={shouldRender} timeout={200} classNames={{...appAnimations}}>
                <div className={appAnimations.container}>
                    <div className={`${css.container} ${width}`}>
                        {commentTypes.map(commentType => (
                            <div className={`${css.column}`} key={commentType}>
                                <div className={`${css.name}`}>
                                    <span className={`${css.colorPreview} background--${commentType}`} />
                                    {commentType}
                                </div>
                                <NewComment commentType={commentType} updateTeamData={updateTeamData}/>
                                <Comments commentType={commentType} comments={teamData[commentType]} isDarkMode={darkMode}/>
                            </div>
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default App;
