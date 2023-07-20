from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator

import os
from router import accounts, rides, receipts

tags_metadata = [
    {
        "name": "users",
    },
    {
        "name": "rides",
    },
        {
        "name": "receipts",
    },
]


app = FastAPI(openapi_tags=tags_metadata)

app.include_router(accounts.router)
app.include_router(rides.router)
app.include_router(receipts.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}
