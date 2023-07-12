from fastapi import FastAPI, Request
from pydantic import BaseModel, Field
from decimal import Decimal
from queries.pool import pool
import os
from psycopg_pool import ConnectionPool

class ReceiptIn(BaseModel):
    ride_id: int
    account_id : int
    total: float

class ReceiptOut(BaseModel):
    id: int
    ride_id: int
    account_id : int
    total: float

class DuplicateReceiptError(ValueError):
    pass

class ReceiptQueries:
    def create(self, receipt:ReceiptIn) -> ReceiptOut:
        try:
            print('receipt: ', receipt)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print('connected to db')
                    result = db.execute(
                        """
                        INSERT INTO receipts
                        (
                        ride_id,
                        account_id,
                        total
                        )
                        VALUES
                        (%s,%s,%s)
                        RETURNING
                        id,ride_id,account_id,total;
                        """,
                        [receipt.ride_id,
                         receipt.account_id,
                         receipt.total]
                    )
                    print('inserted')
                    returned_value = result.fetchone()
                    print(returned_value)
                return self.record_to_receipt(returned_value)
        except Exception as e:
            return {'error': e}

    def refund(self, ride_id):
        try:
            print('ride_id: ', ride_id)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE receipts
                        SET total = -total
                        WHERE ride_id = %s
                        """,
                        [ride_id]
                    )
        except Exception as e:
            return {'error' : e}

    def delete(self, ride_id):
        try:
            print('ride_id: ', ride_id)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM receipts
                        WHERE ride_id = %s
                        """,
                        [ride_id]
                    )
                    return {'message': 'Deleted'}
        except Exception as e:
            return {'error' : e}

    def get_receipts_by_account(self, account_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM receipts
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                print('values fetched \n\n\n')
                returned_values = result.fetchall()
                print('receipts: ', returned_values)
                return [self.record_to_receipt(returned_value)
                         for returned_value in returned_values]

    def get_receipt(self, receipt_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM receipts
                    WHERE id = %s;
                    """,
                    [receipt_id],
                )

                returned_values = result.fetchone()
                print('receipt: ', returned_values)
                return self.record_to_receipt(returned_values)

    def get_all_receipts(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM receipts;
                    """,
                )

                returned_values = result.fetchall()
                print('receipts: ', returned_values)
                return [self.record_to_receipt(returned_value)
                         for returned_value in returned_values]

    def record_to_receipt (self, record):
        return ReceiptOut(
                        id=record[0],
                        ride_id=record[1],
                        account_id=record[2],
                        total=record[3],
                )
