from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    status,
    HTTPException,
)
from typing import List
from pydantic import BaseModel
from queries.account_queries import (
    AccountQueries,
    AccountOut,
    AccountIn,
    DuplicateAccountError,
    AccountUpdate,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

router = APIRouter(tags=["users"])


@router.get("/api/accounts/{username}", response_model=AccountOut)
def get_account(
    username: str,
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_account(username)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/accounts", response_model=List[AccountOut])
def get_all_account(
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_all_accounts()
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/users/current", response_model=List[AccountOut])
def get_current_users(
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_current_users()
    if record is None:
        response.status_code = 404
    else:
        return record


@router.patch("/api/accounts/{username}", response_model=AccountOut)
def update(
    username: str,
    info: AccountUpdate,
    response: Response,
    queries: AccountQueries = Depends(),
):
    print(response)
    record = queries.update_account(username, info)
    print("record got: ", record)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/employees", response_model=List[AccountOut])
def get_all_employees(
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_all_employees()
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/employees/current", response_model=List[AccountOut])
def get_current_employees(
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_current_employees()
    if record is None:
        response.status_code = 404
    else:
        return record


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


@router.get("/api/protected", response_model=bool)
async def get_token_protected(
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
):
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post(
    "/api/accounts", response_model=AccountToken | HttpError, tags=["users"]
)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hash_password = authenticator.hash_password(info.password)
    try:
        print("trying")
        account = repo.create(info, hash_password)
        print("account from create method", account)
        print("done trying")
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    print("here we are now")
    form = AccountForm(username=info.username, password=info.password)
    print("Testing ")
    token = await authenticator.login(response, request, form, repo)
    print("token", token)
    return AccountToken(account=account, **token.dict())
