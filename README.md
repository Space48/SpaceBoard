Internal Tool to replace fun retro

This is in place to provide a secure place to have the retro boards rather than the public fun retro boards.
No longer requiring new accounts to be created on fun retro when the trial runs out.

## Deployment
_Not currently setup_

## Setup
Clone the repo
git clone git@bitbucket.org:space48/retro.git

Use valet to access retro.test

## Functionality
_Current_

1. New File created each week automatically

2. Add comments to one of 3 columns

3. Previous weeks viable by appending `?week=18`

_Planned_

1. Per team boards (Semi done, hence the red directory in teams)

2. Delete/Edit Existing comments

3. Comment Authors (?)

4. Reporting for historical boards (Older json files are not currently removed)

Feel free to raise suggestions for features here: https://bitbucket.org/space48/retro/issues?status=new&status=open

## How it works _(Currently)_
On loading the index.php the current week number is gotten with php to use in the json filename.
A new file is created if one for that week does not exist with the basic json object structure.
No JS frameworks have been used _yet_ it uses vanilla JS to do a `XMLHttpRequest` to the new.php which just process' and saves the new comment to the json file.
