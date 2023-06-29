from fastapi import FastAPI, Request
from pydantic import BaseModel
from queries.pool import pool
import os
from psycopg_pool import ConnectionPool

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    is_employee: bool

class AccountOut(BaseModel):
    id: int
    username: str
    hash_password: str
    first_name: str
    last_name: str
    email: str
    is_employee: bool



class AccountQueries:
    def get_account(self,account_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE id = %s
                    """,
                    [account_id],
                )

                record = cur.fetchone()
                print('account row:', record)
                return self.record_to_account(record)

    def get_all_accounts(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""SELECT *
                                FROM accounts
                                  """
                            )
                record = cur.fetchall()
                print('account row:', record)
                return self.record_to_all_account(record)


    def record_to_account (self, record):
        return AccountOut(
        id = record[0],
        username = record[1],
        hash_password = record[2],
        first_name = record[3],
        last_name = record[4],
        email = record[5],
        is_employee = record[6],
        )

    def record_to_all_account (self, records):
        accounts = []
        for record in records:
            accounts.append(AccountOut(
        id = record[0],
        username = record[1],
        hash_password = record[2],
        first_name = record[3],
        last_name = record[4],
        email = record[5],
        is_employee = record[6],
        ))
        print(accounts)
        return accounts
