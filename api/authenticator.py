import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.account_queries import AccountQueries, AccountIn, AccountOut


class Authenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_account(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOut):
        # Return the encrypted password value from your
        # account object
        print("DICT",account)
        return account.hash_password

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        print("ACCOUNT",account)
        d = account.username
        print(d)

        return d, AccountOut(**account.dict())

authenticator = Authenticator(os.environ["SIGNING_KEY"])
