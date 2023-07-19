from fastapi import FastAPI, Request
from pydantic import BaseModel
from queries.pool import pool
import os
from psycopg_pool import ConnectionPool


class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    is_employee: bool = False
    current_ride: bool = False

class AccountOut(BaseModel):
    id: int
    username: str
    hash_password: str
    first_name: str
    last_name: str
    email: str
    is_employee: bool
    current_ride: bool

class DuplicateAccountError(ValueError):
    pass



class AccountQueries:
    def create(self, account: AccountIn, hash_password: str) -> AccountOut:
        try:
            print("Username", account)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (
                            username,
                            hash_password,
                            first_name,
                            last_name,
                            email,
                            is_employee,
                            current_ride)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        username,
                        hash_password;
                        """,
                        [
                            account.username,
                            hash_password,
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.is_employee,
                            account.current_ride
                        ]
                    )
                    print("insert worked?")
                    id = result.fetchone()[0]
                    print("ID GOTTEN",id)
                    return AccountOut(
                        id=id,
                        username=account.username,
                        hash_password=hash_password,
                        first_name=account.first_name,
                        last_name=account.last_name,
                        email=account.email,
                        is_employee=account.is_employee,
                        current_ride=account.current_ride
                    )
        except Exception as e:
            return {"error": e}




    def get_account(self,username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )

                record = cur.fetchone()
                print('account row:', record)
                return self.record_to_account(record)

    def get_all_accounts(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""SELECT *
                                FROM accounts;
                                  """
                            )
                record = cur.fetchall()
                print('account row:', record)
                return self.record_to_all_account(record)

    def get_all_employees(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                            """
                            SELECT *
                            FROM accounts
                            WHERE is_employee = true;
                            """
                            )
                record = cur.fetchall()
                print('employee row:', record)
                return self.record_to_all_account(record)

    def get_current_employees(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                            """
                            SELECT *
                            FROM accounts
                            WHERE is_employee = true
                                AND
                                current_ride = true;
                            """
                            )
                record = cur.fetchall()
                print('employee row:', record)
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
        current_ride = record[7]
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
        current_ride = record[7]
        ))
        print(accounts)
        return accounts
