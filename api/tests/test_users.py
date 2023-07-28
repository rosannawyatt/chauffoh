from fastapi.testclient import TestClient
from main import app
from queries.account_queries import AccountQueries

client = TestClient(app)

fake_users_db = [
    {
        "id": 1,
        "username": "Joe23",
        "hash_password": "42vdfdrr53gddg43",
        "first_name": "Joe",
        "last_name": "Branch",
        "email": "joeyb23@email.com",
        "is_employee": False,
        "current_ride": False,
    },
    {
        "id": 2,
        "username": "Jason3",
        "hash_password": "45urn34igh36ghfg",
        "first_name": "Jason",
        "last_name": "Cruise",
        "email": "Jcruise@email.com",
        "is_employee": False,
        "current_ride": False,
    },
]


class TestUserAccountQueries:
    def update_account(self, _id, AccountUpdate):
        result = {
            "id": _id,
            "username": "Joe23",
            "hash_password": "42vdfdrr53gddg43",
            "first_name": "Joe",
            "last_name": "Branch",
            "email": "joeyb23@email.com",
            "is_employee": False,
            "current_ride": False,
        }
        result.update(AccountUpdate)
        return result


class TestCurrentUsers:
    def get_current_users(self):
        return fake_users_db


def test_init():
    assert 1 == 1


def test_get_current_users():
    app.dependency_overrides[AccountQueries] = TestCurrentUsers

    response = client.get("api/users/current")

    app.dependency_ovverides = {}

    assert response.status_code == 200
    assert response.json() == fake_users_db


def test_update_user_account():
    app.dependency_overrides[AccountQueries] = TestUserAccountQueries

    update = {
        "username": "Joe23",
        "first_name": "Joey",
        "last_name": "Branch",
        "email": "joeyb23@email.com",
        "is_employee": False,
        "current_ride": True,
    }

    response = client.patch("/api/accounts/3", json=update)

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "id": 3,
        "username": "Joe23",
        "hash_password": "42vdfdrr53gddg43",
        "first_name": "Joey",
        "last_name": "Branch",
        "email": "joeyb23@email.com",
        "is_employee": False,
        "current_ride": True,
    }
