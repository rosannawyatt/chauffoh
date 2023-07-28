from fastapi import APIRouter, Depends, Response, status, HTTPException
from typing import List
from queries.receipts_queries import (
    ReceiptIn,
    ReceiptOut,
    DuplicateReceiptError,
    ReceiptQueries,
    ReceiptGet,
    ReceiptGetWithDriver,
)


router = APIRouter(tags=["receipts"])


@router.post("/api/receipts", response_model=ReceiptOut)
async def create_receipts(
    info: ReceiptIn,
    repo: ReceiptQueries = Depends(),
):
    try:
        receipt = repo.create(info)
        return receipt
    except DuplicateReceiptError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an ride with that informations",
        )


@router.delete("/api/receipts/rides/{ride_id}")
async def delete_receipt(
    ride_id: int,
    repo: ReceiptQueries = Depends(),
):
    delete = repo.delete(ride_id)
    return delete


@router.get("/api/receipts/{receipt_id}", response_model=ReceiptGet)
def get_receipt(
    receipt_id: int,
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_receipt(receipt_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get(
    "/api/receipts/rides/{ride_id}", response_model=ReceiptGetWithDriver
)
def get_receipt_by_ride_id_add_driver(
    ride_id: int,
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_receipt_by_ride_id(ride_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/receipts", response_model=List[ReceiptGet])
def get_all_receipts(
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_all_receipts()
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get(
    "/api/receipts/history/{account_id}", response_model=List[ReceiptGet]
)
def get_receipts_by_account(
    account_id: int,
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_receipts_by_account(account_id)
    if record is None:
        response.status_code = 404
    else:
        return record
