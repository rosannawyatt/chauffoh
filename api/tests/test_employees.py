from fastapi.testclient import TestClient
from main import app
from queries.account_queries import AccountQueries
from authenticator import authenticator

client = TestClient(app)

fake_employees_db = [
    {
        "id": 1,
        "username": "bobb",
        "hash_password": "89urnsduhn38u45giu",
        "first_name": "Bob",
        "last_name": "Belcher",
        "email": "bob@email.com",
        "is_employee": True,
        "current_ride": False
    },
    {
        "id": 2,
        "username": "lindab",
        "hash_password": "89urn76igh45giu",
        "first_name": "Linda",
        "last_name": "Belcher",
        "email": "linda@email.com",
        "is_employee": True,
        "current_ride": False
    }
]


def account_data():
    data = {
      "id": 1,
      "username": "bobb",
      "hash_password": "$2b$12$Bov1Aw6PZFYkRgaIlBWAVe1LVHWRRnqKni3g",
      "first_name": "Bob",
      "last_name": "Belcher",
      "email": "bob@burgers.com",
      "is_employee": True,
      "current_ride": False
    }
    return data


class TestAccountQueries:
    def update_account(self, _id, AccountUpdate):
        result = {
            "id": _id,
            "username": "bobb",
            "hash_password": "89urnsduhn38u45giu",
            "first_name": "Bob",
            "last_name": "Belcher",
            "is_employee": True,
            "current_ride": False
        }
        result.update(AccountUpdate)
        return result


class TestAllEmployees:
    def get_all_employees(self):
        return fake_employees_db


def test_init():
    assert 1 == 1


def test_get_all_employees():
    app.dependency_overrides[AccountQueries] = TestAllEmployees

    response = client.get("api/employees")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == fake_employees_db


def test_update_account():
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = account_data
    app.dependency_overrides[AccountQueries] = TestAccountQueries

    update = {
        "username": "bobb",
        "first_name": "Bob",
        "last_name": "Belcher",
        "email": "bob@burgers.com",
        "is_employee": True,
        "current_ride": False
    }

    response = client.patch("/api/accounts/3", json=update)

    app.dependency_overrides = {}
    print('test response', response.json())
    assert response.status_code == 200
    assert response.json() == {
        "id": 3,
        "username": "bobb",
        "hash_password": "89urnsduhn38u45giu",
        "first_name": "Bob",
        "last_name": "Belcher",
        "email": "bob@burgers.com",
        "is_employee": True,
        "current_ride": False
    }
