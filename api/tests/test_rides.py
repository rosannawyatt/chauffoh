from main import app
from fastapi.testclient import TestClient
from queries.rides_queries import RideQueries


fake_rides_db = [
    {
        "id": 2,
        "account": {
            "username": "123",
            "first_name": "name",
            "last_name": "last",
            "email": "123@123",
            "current_ride": False,
        },
        "is_roundtrip": True,
        "roundtrip_date": None,
        "start_location": "3223",
        "end_location": "32323",
        "ride_status": "Requested",
        "datetime": "2023-07-20T18:42:31.846482",
        "vehicle_info": "232332",
        "comments": "",
        "driver": {
            "username": None,
            "first_name": None,
            "last_name": None,
            "email": None,
            "current_ride": None,
        },
    },
    {
        "id": 3,
        "account": {
            "username": "123",
            "first_name": "name",
            "last_name": "last",
            "email": "123@123",
            "current_ride": False,
        },
        "is_roundtrip": False,
        "roundtrip_date": None,
        "start_location": "3232",
        "end_location": "3223",
        "ride_status": "Requested",
        "datetime": "2023-07-20T18:42:40.788292",
        "vehicle_info": "2332",
        "comments": "",
        "driver": {
            "username": None,
            "first_name": None,
            "last_name": None,
            "email": None,
            "current_ride": None,
        },
    },
    {
        "id": 4,
        "account": {
            "username": "emp",
            "first_name": "emp",
            "last_name": "emp",
            "email": "emp@emp",
            "current_ride": False,
        },
        "is_roundtrip": False,
        "roundtrip_date": None,
        "start_location": "sdds",
        "end_location": "dsasd",
        "ride_status": "Cancelled",
        "datetime": "2023-07-20T18:44:44.797382",
        "vehicle_info": "asdasd",
        "comments": "",
        "driver": {
            "username": None,
            "first_name": None,
            "last_name": None,
            "email": None,
            "current_ride": None,
        },
    },
    {
        "id": 1,
        "account": {
            "username": "string",
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "current_ride": False,
        },
        "is_roundtrip": True,
        "roundtrip_date": "2023-07-20T18:41:28.792000",
        "start_location": "string",
        "end_location": "string",
        "ride_status": "Requested",
        "datetime": "2023-07-20T18:41:54.257693",
        "vehicle_info": "string",
        "comments": "string",
        "driver": {
            "username": "emp",
            "first_name": "emp",
            "last_name": "emp",
            "email": "emp@emp",
            "current_ride": False,
        },
    },
]


class TestRideQueries:
    def create(self, ride_info):
        result = {
            "id": 5,
            "ride_status": "Requested",
            "datetime": "2023-07-20T19:45:10.867877",
            "driver_id": None,
        }
        result.update(ride_info)
        return result


class TestAllRides:
    def get_all_ride(self):
        return fake_rides_db


class TestCreateRide:
    def create(self, ride_info):
        result = {
            "id": 5,
            "ride_status": "Requested",
            "datetime": "2023-07-20T19:45:10.867877",
            "driver_id": None,
        }
        result.update(ride_info)

        return result


client = TestClient(app)


def test_init():
    assert 1 == 1


def test_get_all_rides():
    app.dependency_overrides[RideQueries] = TestAllRides

    response = client.get("/api/rides/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == fake_rides_db


def test_create_ride():
    app.dependency_overrides[RideQueries] = TestRideQueries

    ride = {
        "account_id": 1,
        "is_roundtrip": True,
        "roundtrip_date": "2023-07-20T21:14:36.992Z",
        "start_location": "string",
        "end_location": "string",
        "vehicle_info": "string",
        "comments": "string",
    }

    response = client.post("/api/rides", json=ride)

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "id": 5,
        "account_id": 1,
        "is_roundtrip": True,
        "roundtrip_date": "2023-07-20T21:14:36.992000+00:00",
        "start_location": "string",
        "end_location": "string",
        "ride_status": "Requested",
        "datetime": "2023-07-20T19:45:10.867877",
        "vehicle_info": "string",
        "comments": "string",
        "driver_id": None,
    }
