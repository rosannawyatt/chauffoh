# week 13

Group 9 began designing the wireframe and mvp of our project with excalidraw and google docs. We were able to put together our domain and basic functionality of our app. We were also able to come up with the group-9 name "Chauffoh". Trello and google docs were also used to organize our schema and endpoints,.

# week 14 28th

As a group we began group coding the initial database setup and started setting up backend authorization for all of our accounts. We did have a blocker with authorization post request. We also created front end-authorization and we were able to create a sign up page. I was also able to create most the groups first initial issues on gitlab.

# Week 15

As a group we created a bunch of backend points to get us started.

# Week 16

I added a backend endpoint get_receipt_by_ride_id to api/router/receipts.py to be able to get a receipt by ride id. I also added get_receipt_record_with_driver to the receipts_queries.

I created a frontend endpoint called FinalReceipt.js. This gave a logged-in user the ability to get a final receipt. I created a function called def get_receipt_by_ride_id_add_driver in api/router/receipts.py to be able to get driver's data on the final receipt.

On Thursday of this week I began the process of deploying the frontend image. I added PUBLIC_URL: https://rent-a-driver1.gitlab.io/module3-project-gamma/ to the .gitlab-ci-yml file. I made progress by eliminating code errors that cause the frontend image to fail i.e. commas, spaces, indentations etc.

# Week 17

I was able to pick up from where I left off last Thursday with frontend image deployment. I didn't run into any blockers; but I did have to do the tedious task of fixing code errors that would cause the frontend image tests to fail. Once the errors were fixed the frontend image test passed. I was also able to create my unit test for users and update ride status. I then fixed a console error in my FinalReceipt.js page.
