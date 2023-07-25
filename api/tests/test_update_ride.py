from main import app
from fastapi.testclient import TestClient
from queries.rides_queries import RideQueries, RideUpdate, RideOut
from datetime import datetime
import json

client = TestClient(app)


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)


test_data = {
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
}


class TestRide:
    def get_ride(self, ride_id):
        return test_data


def test_get_ride():
    app.dependency_overrides[RideQueries] = TestRide
    response = client.get("/api/rides/1")

    assert response.status_code == 200
    assert response.json() == test_data


test_update_data = {
    "id": 1,
    "account_id": 1,
    "is_roundtrip": True,
    "roundtrip_date": "2023-07-20T21:14:36.992000+00:00",
    "start_location": "string",
    "end_location": "string",
    "ride_status": "Requested",
    "datetime": "2023-07-20T18:41:54.257693",
    "vehicle_info": "string",
    "comments": "string",
    "driver_id": None,
}


class TestUpdateRide:
    def update(self, ride_id, update):
        for field, value in update:
            if value is not None:
                test_update_data[field] = value

        return RideOut(**test_update_data)


def test_update_ride_status_driver():
    app.dependency_overrides[RideQueries] = TestUpdateRide

    ride_update = RideUpdate(ride_status="In Progress", driver_id=3)

    response = client.patch(
        f"/api/rides/set_status/{test_update_data['id']}",
        json=ride_update.dict()
    )

    assert response.status_code == 200
    updated = RideOut(**response.json())
    assert updated.ride_status == "In Progress"
    assert updated.driver_id == 3


def test_update_ride_locations():
    app.dependency_overrides[RideQueries] = TestUpdateRide

    ride_update = RideUpdate(start_location="123 Street",
                             end_location="456 Street")

    response = client.patch(
        f"/api/rides/set_status/{test_update_data['id']}",
        json=ride_update.dict()
    )

    assert response.status_code == 200
    updated = RideOut(**response.json())
    assert updated.start_location == "123 Street"
    assert updated.end_location == "456 Street"


def test_update_ride_roundtrip():
    app.dependency_overrides[RideQueries] = TestUpdateRide

    ride_update = RideUpdate(
        is_roundtrip=True,
        roundtrip_date="2023-07-25T11:30:36.992000+00:00"
    )

    response = client.patch(
        f"/api/rides/set_status/{test_update_data['id']}",
        data=json.dumps(ride_update.dict(), cls=DateTimeEncoder),
        headers={"content-type": "application/json"},
    )

    assert response.status_code == 200
    updated = RideOut(**response.json())
    assert updated.is_roundtrip
    assert updated.roundtrip_date.isoformat() == \
        "2023-07-25T11:30:36.992000+00:00"


def test_update_ride_details():
    app.dependency_overrides[RideQueries] = TestUpdateRide

    ride_update = RideUpdate(
        vehicle_info="White Telsa #TESLA60",
        comments="In front of Startbucks"
    )

    response = client.patch(
        f"/api/rides/set_status/{test_update_data['id']}",
        json=ride_update.dict()
    )

    assert response.status_code == 200
    updated = RideOut(**response.json())
    assert updated.vehicle_info == "White Telsa #TESLA60"
    assert updated.comments == "In front of Startbucks"
