from fastapi import FastAPI, Request
from pydantic import BaseModel
from queries.pool import pool
import os
from psycopg_pool import ConnectionPool

class RideIn(BaseModel):
    account_id: int
    is_roundtrip: bool
    start_location: str
    end_location: str
    vehicle_info: str
    comments: str

class RideOut(BaseModel):
    id: int
    account_id: int
    is_roundtrip: bool
    start_location: str
    end_location: str
    ride_status: str
    datetime: str
    vehicle_info: str
    comments: str | None

#LATER FOR UPDATE
class RideUpdate(BaseModel):
    is_roundtrip: bool | None
    start_location: str | None
    end_location: str | None
    ride_status: str | None
    datetime: str | None
    vehicle_info: str | None
    comments: str | None


class DuplicateRideError(ValueError):
    pass

class RideQueries:
    def create(self, ride: RideIn ) -> RideOut:
        try:
            print("Ride", ride)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO rides
                            (
                            account_id,
                            is_roundtrip,
                            start_location,
                            end_location,
                            vehicle_info,
                            comments
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        datetime,
                        ride_status;
                        """,
                        [
                            ride.account_id,
                            ride.is_roundtrip,
                            ride.start_location,
                            ride.end_location,
                            ride.vehicle_info,
                            ride.comments,
                        ]
                    )
                    print("insert worked?")
                    returned_values = result.fetchone()
                    print("ID GOTTEN",returned_values)
                    return RideOut(
                        id=returned_values[0],
                        account_id=ride.account_id,
                        is_roundtrip=ride.is_roundtrip,
                        start_location=ride.start_location,
                        end_location=ride.end_location,
                        ride_status=returned_values[2],
                        datetime=returned_values[1].isoformat(),
                        vehicle_info=ride.vehicle_info,
                        comments=ride.comments,
                    )

        except Exception as e:
            return {"error": e}

    def get_ride(self, ride_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM rides
                    WHERE id = %s;
                    """,
                    [ride_id],
                )

                returned_values = result.fetchone()
                print('ride: ', returned_values)
                return self.record_to_ride(returned_values)

    def get_rides_by_account(self, account_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM rides
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                print('values fetched \n\n\n')
                returned_values = result.fetchall()
                print('ride: ', returned_values)
                return [self.record_to_ride(returned_value)
                         for returned_value in returned_values]

    def get_all_ride(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM rides;
                    """,
                )

                returned_values = result.fetchall()
                print('ride: ', returned_values)
                return [self.record_to_ride(returned_value)
                         for returned_value in returned_values]

    def update_ride_status(self, _id, status):
        with pool.connection() as conn:
            with conn.cursor() as db:
                print('start update')
                result = db.execute(
                    """
                    UPDATE rides
                    SET ride_status = %s
                    WHERE id = %s
                    RETURNING *
                    """,
                    [status,_id],
                )
                print('updated')
                returned_values = result.fetchone()
                print('ride: ', returned_values)
                return self.record_to_ride(returned_values)


    def update(self, _id, RideUpdate):
        with pool.connection() as conn:
            with conn.cursor() as db:
                print('start update')
                returned_values  = None
                if RideUpdate.ride_status:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET ride_status = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.ride_status,_id],
                    )
                    # print('updated')
                    # returned_values = result.fetchone()

                if RideUpdate.is_roundtrip != None:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET is_roundtrip = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.is_roundtrip,_id],
                    )
                    # print('updated')
                    # returned_values = result.fetchone()

                if RideUpdate.start_location:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET start_location = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.start_location,_id],
                    )
                    # print('updated')
                    # returned_values = result.fetchone()

                if RideUpdate.end_location:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET end_location = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.end_location,_id],
                    )
                    # print('updated')
                    # returned_values = result.fetchone()

                if RideUpdate.datetime:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET datetime = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.datetime,_id],
                    )
                    # print('updated')
                    # returned_values = result.fetchone()

                if RideUpdate.vehicle_info:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET vehicle_info = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.vehicle_info,_id],
                    )
                    # print('updated')
                    # returned_values = result.fetchone()

                if RideUpdate.comments:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET comments = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.comments,_id],
                    )
                    # print('updated')
                returned_values = result.fetchone()
                print('ride: ', returned_values)
                return self.record_to_ride(returned_values)

    def record_to_ride (self, record):
        return RideOut(
                        id=record[0],
                        account_id=record[1],
                        is_roundtrip=record[2],
                        start_location=record[3],
                        end_location=record[4],
                        ride_status=record[5],
                        datetime=record[6].isoformat(),
                        vehicle_info=record[7],
                        comments=record[8],
                )
