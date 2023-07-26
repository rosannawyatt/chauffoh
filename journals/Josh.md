# Week of Jun 28th
    - Group coding session with everyone: Initial database setup and started setting      up backend authorization for our accounts. Small blocker with authorization post request.
    - Group coding: figured out front-end authorization. Created user sign up page.
    - Finished front-end user auth as a group.
    - created group issues for gitlab


# Week of Jul 13th
    - Created a bunch of different backend endpoints as a group


# Week of Jul 18th
    - Added def get_receipt_by_ride_id to api/queries/receipts_queries.py (Backend)
    - Added @router.get("/api/receipts/rides/{ride_id}", response_model=ReceiptGet)
        def get_receipt_by_ride_id to api/router/receipts.py (Backend)
    - Created Frontend page Logged-in User finalreceipt.js (Frontend)
        - added GetReceiptRide(BaseModel) to receipts_queries.py
        - added ReceiptGetWithDriver(BaseModel) to receipts_queries.py
            - added SELECT re.total, re.id, r.*, a.username, a.first_name, a.last_name, a.email,
                d.username, d.first_name, d.last_name, d.email
                LEFT JOIN accounts AS d ON (r.driver_id = d.id)
                WHERE r.id = %s; to  def get_receipt_by_ride_id(self, ride_id: int)
            - created def get_receipt_record_with_driver(self,record):
        -added def get_receipt_by_ride_id_add_driver to  api/router/receipts.py

    - Started the frontend image deployment process
        - added PUBLIC_URL: https://rent-a-driver1.gitlab.io/module3-project-gamma/
        - began fixing frontend code errors i.e. commas, spaces, indentations etc.

# Week of Jul 24th
    - Created frontend image for deployment, fixed all the code errors to pass frontend tests
    - Created unit tests for users and update ride status
    - Fixed div in FinalReceipt.js that caused a console error, error is now eliminated.
    - Started on the ReadMe.md process
    - Updated Journal
