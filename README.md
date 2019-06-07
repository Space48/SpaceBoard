Internal Tool to replace fun retro

This is in place to provide a secure place to have the retro boards rather than the public fun retro boards.
No longer requiring new accounts to be created on fun retro when the trial runs out.

## Deployment
_Not currently setup_

## Prerequisites
* Valet +
* Node
* Yarn (although NPM will suffice)

## Setup
1. Clone the repo
1. git clone git@bitbucket.org:space48/retro.git
1. Ensure you can load http://retro.test as this is currently how the backend (PHP) is accessed
1. Run `npm install && npm start`

## Functionality
_Current_

1. New File created each week automatically
1. Add comments to one of 3 columns
1. Previous weeks viable by appending `?week=18`

_Planned_

1. Prevent blank comments from being added
1. Dark mode (WIP)
1. Per team boards (Semi done, hence the red directory in teams)
1. Delete/Edit Existing comments
1. Comment Authors (?)

_Possible_
1. Choose custom colours/themes

Feel free to raise suggestions for features here: https://bitbucket.org/space48/retro/issues?status=new&status=open

## How it works

### Tools

The frontend has been built with:
* React for managing the UI and state (bootstrapped with Create React App 3)
* React Transition Group for animations
* Axios for AJAX requests (could probably just use fetch)
* Typescript for custom types/interfaces (included with Create React App)
* CSS Modules for scoped CSS (included with Create React App)
* Node environment variables used to update URLs between local and production

On loading the current week number is calculated and the app will check is a JSON file exists in `/teams/red`, if so it will retreive it and if not it will create it.

When a new comment is posted it is sent to new.php which populates the JSON file and retrieves the updated data, the app state then gets updated with this data and React will re-render.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
