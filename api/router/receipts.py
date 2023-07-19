from fastapi import APIRouter, Depends, Response, Request, status, HTTPException
from typing import List, Optional, Union
from pydantic import BaseModel
from queries.receipts_queries import ReceiptIn, ReceiptOut, DuplicateReceiptError, ReceiptQueries, ReceiptGet, ReceiptGetWithDriver



router = APIRouter()


@router.post("/api/receipts", response_model=ReceiptOut)
async def create_receipts(
    info: ReceiptIn,
    repo: ReceiptQueries = Depends(),
):
    try:
        print('info: ',info)
        print("trying")
        receipt = repo.create(info)
        print("receipt from create method",receipt)
        print("done trying")
        return receipt
    except DuplicateReceiptError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an ride with that informations",
        )


@router.delete('/api/receipts/rides/{ride_id}')
async def delete_receipt(
    ride_id : int,
    repo : ReceiptQueries = Depends(),
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
    print('record got: ', record)
    if record is None:
        response.status_code = 404
    else:
        return record

@router.get("/api/receipts/rides/{ride_id}", response_model=ReceiptGetWithDriver)
def get_receipt_by_ride_id_add_driver(
    ride_id: int,
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_receipt_by_ride_id(ride_id)
    print('record got: ', record)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/receipts/", response_model=List[ReceiptGet])
def get_all_receipts(
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_all_receipts()
    print('record got: ', record)
    if record is None:
        response.status_code = 404
    else:
        return record

@router.get("/api/receipts/history/{account_id}", response_model=List[ReceiptGet])
def get_receipts_by_account(
    account_id: int,
    response: Response,
    queries: ReceiptQueries = Depends(),
):
    record = queries.get_receipts_by_account(account_id)
    print('record got: ', record)
    if record is None:
        response.status_code = 404
    else:
        return record
