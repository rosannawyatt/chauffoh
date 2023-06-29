from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from pydantic import BaseModel
from queries.account_queries import AccountQueries, AccountOut
router = APIRouter()


@router.get("/api/accounts/{account_id}", response_model=AccountOut)
def get_account(
    account_id: int,
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_account(account_id)
    if record is None:
        response.status_code = 404
    else:
        return record

@router.get("/api/accounts/", response_model=List[AccountOut])
def get_all_account(
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_all_accounts()
    if record is None:
        response.status_code = 404
    else:
        return record
