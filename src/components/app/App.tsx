import { InterfaceColumns, InterfaceTeamData, Team } from '../../types/data';
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
    good: {},
    bad: {},
    actions: {}
};

const App: React.FunctionComponent = () => {
    const [team] = useState<Team>('red');
    const [teamData, updateTeamData] = useState<InterfaceColumns>(emptyTeamData);
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [fullWidthMode, setFullWidthMode] = useState<boolean>(false);
    const [weekNumber, setWeekNumber] = useState<number>(getCurrentWeekNumber(new Date()));
    const width = fullWidthMode ? css.containerFullWidth : '';
    const widthBasedStyling = { fontSize: fullWidthMode ? '20px' : '16px' };

    // This is resonsible for updating the component state once when the component is mounted.
    // The empty array as a second argument means never update (no dependencies)
    useEffect(() => {
        const url = `${baseUrl()}teams/${team}/week${weekNumber}.json`;

        Axios.get(url, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }).then((response: InterfaceTeamData) => {
            // If the file doesn't exist the backend will return HTML,
            // because that HTML is a string it's safe to assume the data is incorrect
            if (response.hasOwnProperty('data') && typeof response.data === 'object') {
                console.log('JSON file does exist');
                updateTeamData(response.data);
            }

            setShouldRender(true);
        }).catch(function (error) {
            console.log(error);
        });
    }, [team, weekNumber]); // Only re-run when team state changes


    return (
        <div style={widthBasedStyling} className={css.app}>
            <CSSTransition in={shouldRender} timeout={200} classNames={{...appAnimations}}>
                <div className={`${css.header} ${appAnimations.container}`}>
                    <h1>Space Board - <span className={css.teamName}>{team}</span> team</h1>
                    <p>Click the button below to toggle full-width mode, this may be useful for displaying on TVs.</p>
                    <button onClick={() => setFullWidthMode(!fullWidthMode)}>Toggle Full Width Mode</button>

                    <h2>Currently Viewing week {weekNumber}</h2>
                    <button onClick={() => setWeekNumber(weekNumber - 1)}>Previous Week</button>
                    {weekNumber < getCurrentWeekNumber(new Date()) ?
                        <button onClick={() => setWeekNumber(weekNumber + 1)}>Next Week</button> : null}
                </div>
            </CSSTransition>

            <CSSTransition in={shouldRender} timeout={200} classNames={{...appAnimations}}>
                <div className={appAnimations.container}>
                    <div className={`${css.container} ${width}`}>
                        {commentTypes.map(commentType => (
                            <div className={`${css.column}`} key={commentType}>
                                <div className={`${css.name}`}>
                                    <span className={`${css.colorPreview} background--${commentType}`} />
                                    {commentType}
                                </div>
                                {weekNumber === getCurrentWeekNumber(new Date()) && <NewComment commentType={commentType} updateTeamData={updateTeamData} />}
                                <Comments commentType={commentType} comments={teamData[commentType]} />
                            </div>
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default App;
