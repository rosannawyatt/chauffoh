from pydantic import BaseModel
from queries.pool import pool


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


class AccountUpdate(BaseModel):
    username: str | None
    password: str | None
    first_name: str | None
    last_name: str | None
    email: str | None
    is_employee: bool | None
    current_ride: bool | None


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
                    print("ID GOTTEN", id)
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

    def get_account(self, username: str):
        try:
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
        except Exception as e:
            return {"error": e}

    def get_all_accounts(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                                """
                                SELECT *
                                FROM accounts;
                                """
                                )
                    record = cur.fetchall()
                    print('account row:', record)
                    return self.record_to_all_account(record)
        except Exception as e:
            return {"error": e}
    
    def update_account(self, _id, AccountUpdate):
        with pool.connection() as conn:
            with conn.cursor() as db:
                returned_values = None
                if AccountUpdate.first_name:
                    print("printing first name")
                    result = db.execute(
                        """
                        UPDATE accounts
                        SET first_name = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [AccountUpdate.first_name,_id],
                    )

                if AccountUpdate.last_name:
                    print("printing last name")
                    result = db.execute(
                        """
                        UPDATE accounts
                        SET last_name = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [AccountUpdate.last_name,_id],
                    )

                if AccountUpdate.email:
                    print("printing email")
                    result = db.execute(
                        """
                        UPDATE accounts
                        SET email = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [AccountUpdate.email,_id],
                    )

                if AccountUpdate.current_ride:
                    print("printing current ride")
                    result = db.execute(
                        """
                        UPDATE accounts
                        SET current_ride = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [AccountUpdate.current_ride,_id],
                    )
                returned_values = result.fetchone()
                print('updates: ', returned_values)
                return self.record_to_account(returned_values)

    def get_all_employees(self):
        try:
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
        except Exception as e:
            return {"error": e}

    def get_current_employees(self):
        try:
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
                    records = cur.fetchall()
                    print('employee row:', records)
                    return self.record_to_all_account(records)
        except Exception as e:
            return {"error": e}

    def get_current_users(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                                """
                                SELECT *
                                FROM accounts
                                WHERE is_employee = false
                                    AND current_ride = true
                                """
                                )
                    record = cur.fetchall()
                    print('user row:', record)
                    return self.record_to_all_account(record)
        except Exception as e:
            return {"error": e}

    def record_to_account(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            hash_password=record[2],
            first_name=record[3],
            last_name=record[4],
            email=record[5],
            is_employee=record[6],
            current_ride=record[7]
            )

    def record_to_all_account(self, records):
        accounts = []
        for record in records:
            accounts.append(AccountOut(
                id=record[0],
                username=record[1],
                hash_password=record[2],
                first_name=record[3],
                last_name=record[4],
                email=record[5],
                is_employee=record[6],
                current_ride=record[7]
                ))
        print(accounts)
        return accounts
