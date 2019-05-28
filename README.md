Internal Tool to replace fun retro

This is in place to provide a secure place to have the retro boards rather than the public fun retro boards.
No longer requiring new accounts to be created on fun retro when the trial runs out.

## To Do

## Deployment
_Not currently setup_

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

1. Per team boards (Semi done, hence the red directory in teams)

1. Delete/Edit Existing comments

1. Comment Authors (?)

1. Reporting for historical boards (Older json files are not currently removed)

_Possible_
1. Support multi-line comments

Feel free to raise suggestions for features here: https://bitbucket.org/space48/retro/issues?status=new&status=open

## How it works _(Currently)_
On loading the index.php the current week number is gotten with php to use in the json filename.
A new file is created if one for that week does not exist with the basic json object structure.
No JS frameworks have been used _yet_ it uses vanilla JS to do a `XMLHttpRequest` to the new.php which just process' and saves the new comment to the json file.
