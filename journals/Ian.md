# H1 June 28th
Created Docker compose file

# H1 Week of Jun 29th
Group coding session with everyone: Initial database setup and started setting up backend authorization for our accounts. Small blocker with authorization post request.
Figured it out, our authorization was sending in a username while our get wanted an ID. Changed the get to match authorization.
Group coding figured out front-end authorization. Created user sign up page.
Finished front-end user auth as a group.


# H1 Week of Jul 13th
Refactored our endpoints to have innerjoins to make our life easier later on.
Created a bunch of different backend endpoints as a group

Created a couple different ride list views for the frontend. Allowings viewing of lists by different parameters.

# H1 Week of Jul 18th
Fixed a login bug, made userData a global variable with react useContext feature.
Added a new view for current rides, that shows non-completed rides for that user.
Also updated private router to be based on userData instead of token.
Started backend deployment-- passed to Josh.
Found an issue with receipt endpoint after we refactored for flake testing. Added indent back and endpoint works again.
Created a unit test for all rides + create a ride

# H1 Week of Jul 24th
Created a 2nd navbar that shows once a user logins. Shows details based on user type.
