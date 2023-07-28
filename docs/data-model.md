##### [<-- Back To Main](../README.md)

# Data Models

## Account Models

Our `Accounts` model is used to store both Customer user & Employee user data. All accounts password are encrpyed and stored as a hashed password. Customers and Employees are differentiated by the is_employee field. 

<details>
<summary>AccountIn</summary>
Base model used to send data to database for account creation

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| username           | string | yes    | no   |
| password            |  string | no     | no   |
| first_name         | string | no     | no     |
| last_name           | string | no     | no  |
| email                 | string | yes    | no   |
| is_employee            | bool    | no     | no  |
| current_ride          | bool | no     | no       |
</details>

<details>
<summary> AccountOut</summary>
Base model used for data returned from the database

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| username           | string | yes    | no   |
| hash_password      |  string | no     | no   |
| first_name         | string | no     | no     |
| last_name           | string | no     | no  |
| email                 | string | yes    | no   |
| is_employee            | bool    | no     | no  |
| current_ride          | bool | no     | no       |
</details>

<details>
<summary>AcountUpdate</summary>
Model used to update account parameters. Creating a ride will leverage this model to update customer user current_ride to true which will prevent customers from creating another ride. Cancelling a ride or completing a ride will leverage this model to update customer user current_ride to false which allows customer to request another ride.

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| username           | string | yes    | yes  |
| password          |  string | no     | yes   |
| first_name         | string | no     | yes     |
| last_name           | string | no     | yes  |
| email                 | string | yes    | yes   |
| is_employee            | bool    | no     | yes  |
| current_ride          | bool | no     | yes |
</details>
</p>


## Rides Models

Our `Rides` model is used to store ride data. Our rides when created will always take an account_id. From there a driver can be added or the ride information updated through additonal models. 

<details>
<summary>RideIn</summary>
Base ride model for inputting data into database.

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| account_id    | int : reference to Accounts | no | no |
| is_roundttrip | bool                  | no  | yes  |
| roundtrip_date | datetime             | no | yes |
| start_location | string               | no | no |
| end_location | string                  | no | no |
| vehicle_info | string                  | no | no |
| comments | string                     | no | yes |
</details>

<details>
<summary>RideOut</summary>
Base ride model for returing data from the database.

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| account_id    | int : reference to Accounts | no | no |
| is_roundttrip | bool                  | no  | yes  |
| roundtrip_date | datetime             | no | yes |
| start_location | string               | no | no |
| end_location | string                  | no | no |
| ride_status | string                   | no | no |
| datetime | str                    | no | no |
| vehicle_info | string                  | no | no |
| comments | string                     | no | yes |
| driver_id | int : reference to Account   | no | yes |
</details>

<details>
<summary>RideAccount</summary>
Base Account model used to join in rides

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| username | string | yes | no |
| first_name | string | no | no |
| last_name | string | no | no |
| email | string | no | no |
| current_ride | bool | no | no |
</details>

<details>
<summary>RideDriver</summary>
Base Driver model for use in rides

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| username | string | yes | no |
| first_name | string | no | no |
| last_name | string | no | no |
| email | string | yes | no |
| current_ride | bool | no | no |
</details>

<details>
<summary>GetRide</summary>
Ride model used to get more detailed information with database joins. Driver references information from RideDriver.

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| id | int                         | yes  | no  |
| account | reference to RideAccount  | no  | no  |
| is_roundttrip | bool                  | no  | yes  |
| roundtrip_date | datetime             | no | yes |
| start_location | string               | no | no |
| end_location | string                  | no | no |
| ride_status | string                   | no | no |
| datetime | string                  | no | no |
| vehicle_info | string                  | no | no |
| comments | string                     | no | yes |
| driver | reference to RideDriver   | no | yes |
</details>

<details>
<summary>RideUpdate</summary>
Model used to send a request to update ride information. Refrences driver_id from Rides model.

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| is_roundttrip | bool                  | no  | yes  |
| roundtrip_date | datetime             | no | yes |
| start_location | string               | no | yes |
| end_location | string                  | no | yes |
| ride_status | string                   | no | yes |
| datetime | string                    | no | yes |
| vehicle_info | string                  | no | yes |
| comments | string                     | no | yes |
| driver_id | int : reference to Rides   | no | yes |
</details>


## Receipt Models

Our `Receipts` models store the receipt data, they are created and updated through the number of models below. They both reference Accounts and Rides depending on the use case.

<details>
<summary>ReceiptIn</summary>
Model used to send a request to the database. Refrences driver_id from Rides model.

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| is_roundttrip | bool                  | no  | yes  |
| roundtrip_date | datetime             | no | yes |
| start_location | string               | no | no |
| end_location | string                  | no | no |
| ride_status | string                   | no | no |
| datetime | datetime                    | no | no |
| vehicle_info | string                  | no | no |
| comments | string                     | no | yes |
| driver_id | int : reference to Rides   | no | yes |
</details>

<details>
<summary>ReceiptOut</summary>
Base model for data we get from database. References from Rides and Accounts models.

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| id        | int                     | yes     | no       |
| ride_id   | int : reference to Rides  | yes     | no    |
| account_id | int : reference to Accounts | no  | no    |
| total     | float                  | no     | no     |
</details>

<details>
<summary>ReceiptGet</summary>
Model used to get account and ride information with join requests to database.

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| id        | int                     | yes     | no       |
| ride   | reference to RideOut  | yes     | no    |
| account | reference to RideAccount | no  | no    |
| total     | float                  | no     | no     |
</details>

<details>
<summary>GetReceiptRide</summary>
Model used to get account and ride information from database. This model references from Rides, Accounts, datetime, and RideDriver models.

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| id        | int                     | yes     | no       |
| ride_id   | int : reference to Rides  | yes     | no    |
| account_id | int : reference to Accounts | no  | no    |
| roundtrip_date | int : reference to datetime | no | no    |
| is_roundtrip | bool                | no  | no    |
| start_location | string           | no      | no      |
| end_location | string           | no      | yes      |
| ride_status | string           | no      | no      |
| datetime | string           | no      | no      |
| vehicle_info | string           | yes      | yes      |
| comments | string           | no      | yes     |
| driver | reference to RideDriver   | no      | no      |
</details>

<details>
<summary>ReceiptGetWithDriver</summary>
Model used to get account and ride information with join requests to database. Returns driver information as well.

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| id        | int                     | yes     | no       |
| ride   | reference to GetReceiptRide  | yes     | no    |
| account_id | reference to RideAccount | no  | no    |
| total     | float                  | no     | no     |
</details>
