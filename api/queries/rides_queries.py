from pydantic import BaseModel
from queries.pool import pool


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
    driver_id: int | None


class RideAccount(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    current_ride: bool


class RideDriver(BaseModel):
    username: str | None
    first_name: str | None
    last_name: str | None
    email: str | None
    current_ride: bool | None


class GetRide(BaseModel):
    id: int
    account: RideAccount
    is_roundtrip: bool
    start_location: str
    end_location: str
    ride_status: str
    datetime: str
    vehicle_info: str
    comments: str | None
    driver: RideDriver | None


class RideUpdate(BaseModel):
    is_roundtrip: bool | None
    start_location: str | None
    end_location: str | None
    ride_status: str | None
    datetime: str | None
    vehicle_info: str | None
    comments: str | None
    driver_id: int | None


class DuplicateRideError(ValueError):
    pass


class RideQueries:
    def create(self, ride: RideIn) -> RideOut:
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
                    print("ID GOTTEN", returned_values)
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
                    SELECT r.*, a.username, a.first_name, a.last_name, a.email,
                      a.current_ride, d.username, d.first_name, d.last_name,
                        d.email, d.current_ride
                    FROM rides r
                    INNER JOIN accounts AS a ON (r.account_id = a.id)
                    LEFT JOIN accounts AS d ON (r.driver_id = d.id)
                    WHERE r.id = %s;
                    """,
                    [ride_id],
                )

                returned_values = result.fetchone()
                print('ride: ', returned_values)
                return self.get_ride_record(returned_values)

    def get_rides_by_account(self, account_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT r.*, a.username, a.first_name, a.last_name, a.email,
                      a.current_ride, d.username, d.first_name,
                        d.last_name, d.email, d.current_ride
                    FROM rides r
                    INNER JOIN accounts AS a ON (r.account_id = a.id)
                    LEFT JOIN accounts AS d ON (r.driver_id = d.id)
                    WHERE a.id = %s;
                    """,
                    [account_id],
                )
                print('values fetched \n\n\n')
                returned_values = result.fetchall()
                print('ride: ', returned_values)
                return [self.get_ride_record(returned_value)
                        for returned_value in returned_values]

    def get_all_ride(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT r.*, a.username, a.first_name, a.last_name, a.email,
                      a.current_ride, d.username, d.first_name, d.last_name,
                        d.email, d.current_ride
                    FROM rides r
                    INNER JOIN accounts AS a ON (r.account_id = a.id)
                    LEFT JOIN accounts AS d ON (r.driver_id = d.id);
                    """,
                )

                returned_values = result.fetchall()
                print('ride: ', returned_values)
                return [self.get_ride_record(returned_value)
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
                    RETURNING *;
                    """,
                    [status, _id],
                )
                print('updated')
                returned_values = result.fetchone()
                print('ride: ', returned_values)
                return self.record_to_ride(returned_values)

    def update(self, _id, RideUpdate):
        with pool.connection() as conn:
            with conn.cursor() as db:
                print('start update')
                returned_values = None
                if RideUpdate.ride_status:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET ride_status = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.ride_status, _id],
                    )

                if RideUpdate.is_roundtrip is not None:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET is_roundtrip = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.is_roundtrip, _id],
                    )

                if RideUpdate.start_location:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET start_location = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [RideUpdate.start_location, _id],
                    )

                if RideUpdate.end_location:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET end_location = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.end_location, _id],
                    )

                if RideUpdate.datetime:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET datetime = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.datetime, _id],
                    )

                if RideUpdate.vehicle_info:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET vehicle_info = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.vehicle_info, _id],
                    )

                if RideUpdate.comments:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET comments = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.comments, _id],
                    )

                if RideUpdate.driver_id:
                    result = db.execute(
                        """
                        UPDATE rides
                        SET driver_id = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [RideUpdate.driver_id, _id],
                    )
                returned_values = result.fetchone()
                print('ride: ', returned_values)
                return self.record_to_ride(returned_values)

    def record_to_ride(self, record):
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
                        driver_id=record[9]
                    )

    def get_ride_record(self, record):
        return GetRide(
                        id=record[0],
                        account=RideAccount(
                            username=record[10],
                            first_name=record[11],
                            last_name=record[12],
                            email=record[13],
                            current_ride=record[14]
                            ),
                        is_roundtrip=record[2],
                        start_location=record[3],
                        end_location=record[4],
                        ride_status=record[5],
                        datetime=record[6].isoformat(),
                        vehicle_info=record[7],
                        comments=record[8],
                        driver=RideDriver(
                            username=record[15],
                            first_name=record[16],
                            last_name=record[17],
                            email=record[18],
                            current_ride=record[19]
                        )
                    )
