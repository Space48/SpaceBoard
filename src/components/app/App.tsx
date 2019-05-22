import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import getCurrentWeekNumber from '../../utilities/getWeekNumber';
import { Columns } from '../column/Columns';
import appAnimations from './app-animations.module.css';
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
    const [shouldRender, setShouldRender] = useState(false);

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
    }, []);

    // CSSTransition is used to animate the app mounting
    return (
        <>
            <CSSTransition in={shouldRender} timeout={200} classNames={{...appAnimations}}>
                <div className={appAnimations.app}>
                    <Columns commentTypes={commentTypes} teamData={teamData} updateTeamData={updateTeamData}/>
                </div>
            </CSSTransition>
        </>
    );
};

export default App;
