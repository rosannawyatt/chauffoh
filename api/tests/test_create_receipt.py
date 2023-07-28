from main import app
from fastapi.testclient import TestClient
from queries.receipts_queries import ReceiptQueries

test_db = [
    {
        "id": 5,
        "account": {
            "username": "Dalton",
            "first_name": "dalton",
            "last_name": "carl",
            "email": "mail@email.com",
            "current_ride": False,
        },
        "is_roundtrip": True,
        "roundtrip_date": None,
        "start_location": "3223",
        "end_location": "32323",
        "ride_status": "Requested",
        "datetime": "2023-08-20T18:41:30.755440",
        "vehicle_info": "f4f-1321",
        "comments": "Blue sticker on door",
        "driver": {
            "username": None,
            "first_name": None,
            "last_name": None,
            "email": None,
            "current_ride": None,
        },
    },
]


class CreateReceiptTest:
    def create(self, receipt):
        result = {
            "receipt_id": 1,
            "ride_id": 5,
            "account_id": 2,
            "total": "200",
        }
        result.update(receipt)

        return result


client = TestClient(app)


def test_init_2():
    assert 2 == 2


def test_create_receipt():
    app.dependency_overrides[ReceiptQueries] = CreateReceiptTest

    receipt = {"ride_id": 5, "account_id": 2, "total": 200}

    response = client.post("/api/receipts", json=receipt)

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "receipt_id": 1,
        "total": 200,
        "ride_id": 5,
        "account_id": 2,
    }
