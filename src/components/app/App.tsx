import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import getCurrentWeekNumber from '../../utilities/getWeekNumber';
import { Columns } from '../column/Columns';
import appAnimations from './app-animations.module.css';
import css from './app.module.css';
import { InterfaceColumns, InterfaceTeamData, Team } from '../../types/data';


const commentTypes: string[] = ['good', 'bad', 'actions'];

const emptyTeamData: InterfaceColumns = {
    good: [''],
    bad: [''],
    actions: ['']
};

const weekNumber = getCurrentWeekNumber(new Date());

const App : React.FunctionComponent = () => {
    // todo: Include a landing page so the team can be chosen (if Black/Yellow will use this?)
    const [ team, updateTeam ] = useState<Team>('red');
    const [ teamData, updateTeamData ] = useState<InterfaceColumns>(emptyTeamData);
    const [ shouldRender, setShouldRender ] = useState<boolean>(false);
    const [ fullWidthMode, setFullWidthMode ] = useState<boolean>(false);

    // This is resonsible for updating the component state once when the component is mounted.
    // The empty array as a second argument means never update (no dependencies)
    useEffect(() => {
        const url = `/teams/${team}/week${weekNumber}.json`;

        Axios.post(url)
            .then((response: InterfaceTeamData) => {
                updateTeamData(response.data);
                setShouldRender(true);
            })
            .catch((error) => {
                console.log(error);
                updateTeamData(emptyTeamData);
            });
    }, [team]);

    const widthBasedStyling = {
        fontSize: fullWidthMode ? '20px' : '16px'
    };

    // todo: Use Context for full width mode rather than pass the value throuh multiple components
    // CSSTransition is used to animate the app mounting
    return (
        <div style={widthBasedStyling}>
            <div className={css.header}>
                <h1>Space48's Retro Board</h1>
                <p>Click the button below to toggle full-width mode, this may be useful for displaying on TVs.</p>
                <button onClick={() => setFullWidthMode(!fullWidthMode)}>Toggle Full Width Mode</button>
            </div>
            <CSSTransition in={shouldRender} timeout={200} classNames={{...appAnimations}}>
                <div className={appAnimations.app}>
                    <Columns commentTypes={commentTypes}
                             teamData={teamData}
                             updateTeamData={updateTeamData}
                             isFullWidthMode={fullWidthMode} />
                </div>
            </CSSTransition>
        </div>
    );
};

export default App;
