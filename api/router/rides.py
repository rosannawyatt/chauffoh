from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    status,
    HTTPException,
)
from typing import List
from queries.rides_queries import (
    RideQueries,
    RideIn,
    RideOut,
    DuplicateRideError,
    RideUpdate,
    GetRide,
)

router = APIRouter(tags=["rides"])


@router.post("/api/rides", response_model=RideOut)
async def create_ride(
    info: RideIn,
    request: Request,
    response: Response,
    repo: RideQueries = Depends(),
):
    try:
        ride = repo.create(info)
        return ride
    except DuplicateRideError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an ride with that informations",
        )


@router.get("/api/rides/{ride_id}", response_model=GetRide)
def get_ride(
    ride_id: int,
    response: Response,
    queries: RideQueries = Depends(),
):
    record = queries.get_ride(ride_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/rides", response_model=List[GetRide])
def get_all_rides(
    response: Response,
    queries: RideQueries = Depends(),
):
    record = queries.get_all_ride()
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/roundtrips", response_model=List[GetRide])
def get_all_roundtrips(
    response: Response,
    queries: RideQueries = Depends(),
):
    record = queries.get_all_roundtrips()
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/rides/history/{account_id}", response_model=List[GetRide])
def get_rides_by_account(
    account_id: int,
    response: Response,
    queries: RideQueries = Depends(),
):
    record = queries.get_rides_by_account(account_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.patch("/api/rides/set_status/{ride_id}", response_model=RideOut)
def update(
    ride_id: int,
    info: RideUpdate,
    response: Response,
    queries: RideQueries = Depends(),
):
    record = queries.update(ride_id, info)

    if record is None:
        response.status_code = 404
    else:
        return record
