import os
from fastapi import Depends, APIRouter
from jwtdown_fastapi.authentication import Authenticator
from queries.account_queries import AccountQueries, AccountOut

router = APIRouter(tags=["users"])


class Authenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        return accounts.get_account(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOut):
        return account.hash_password

    def get_account_data_for_cookie(self, account: AccountOut):
        d = account.username
        return d, AccountOut(**account.dict())


authenticator = Authenticator(os.environ["SIGNING_KEY"])
