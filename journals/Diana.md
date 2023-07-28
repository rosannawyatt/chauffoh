# H1 June 28th

**Group**: Assigned roles and planning for API design, DB schema, wireframes, and user story. After meeting with instructor, we prioritize features for MVP and stretch goals. We finalize the tech stack for our project (FastAPI, PostgreSQL, and React)

**Individual**: Created project doc, trello board, and initial user stories.

# H1 Week of Jun 29th

**Group (lead Ian)**: As the team is first touching new technology, we decided as a group (with Ian leading) to collectively build our initial database, endpoints, and back-end authorization. This ensures we are all able to understand what we are building and how to build it on our own. As a group we learned how to create migration, setup pydantic models, create SQL queries, setup endpoint, and setup backend authorization.

**Pair Programming (lead Diana)**: During summer break, Dalton and I focused on front-end authorization. We created sign-up, login and logout for front-end. We were able to have a functional feature to successful send a response to back-end. However, we still had doctype errors. Ian was able to resolve this error by added baseURL to auth provider.

**Individual**:

- Setup Form.js for reusable UI components for form field and labels (required, optional, and formed check components).
- Setup private routes to redirect unauthenicate users to login page / main page.

# H1 Week of Jul 13th

**Group (lead Ian)**: We finalized our DB by adding joins to our tables. Then split into groups to complete front-end functionality: Rides (led by Diana) and Receipt (led by Rosanna) Team

**Pair Programming**: Ian and I focused on getting Ride endpoints set up on the front-end.

**Individual**: Created Request a Ride form in front-end and added cost estimate preview before confirming a ride.

# H1 Week of Jul 18th

**Group**: We split into 3 groups. As we merged, team member tested and verify the implementation.

- Ian and Josh to start on deployment and necessary code cleanup.
- Rosanna to start on front-end styling and overall structure of the application.
- Diana and Dalton to complete missing back-end endpoint and refactor backend queries. (lead Dalton) Refactored our Accounts to include current_ride to limit end-user to only having one ride at a time.

**Individual**:

- Refactored our Roundtrip table and associated queries (along with joined queries for rides and receipts) to include roundtrip_date to account for the second leg of the return trip.
- Refactored CurrentRides to filter only current ride.
- Added endpoint to active current users (i.e. customers with active rides).
- Added error handling to queries
- Added employee accepting ride to service

# H1 Week of Jul 24th

**Group**: As we're closer to launch the team spent time on deployment, styling, code clean up and routine testing to ensure functionality meets standards.

**Individual**:

- Unit test for get a ride and update rides (patch)
- Added metadata tags to FastAPI Docs
- Refactored to show Request a Ride form to only show form to end users without a current_ride and adjusted form to allow roundtrip return date.
- Resolved bug of when employee claiming a ride claims all ride
- Resolved bug of when employee refreshes a page it kicks the user back to main page
- Refactored user dashboard to have current ride
- Refactored employee dashboard to have separate list for claiming and completing a ride.
- Refactored Rosanna's sidebar with brand design, resolved navbar toggle bug, and added footers to pages
- Added list of users (users with rides and list without) to employee portal
- Added CSS to About Page, forms (with images), tabs, accordion, ride progress steps (user dashboard), and general UX clean up.
