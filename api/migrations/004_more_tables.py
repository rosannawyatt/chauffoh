
steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE rides (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INTEGER NOT NULL,
            is_roundtrip BOOLEAN NOT NULL,
            start_location VARCHAR(150) NOT NULL,
            end_location VARCHAR(150) NOT NULL,
            ride_status VARCHAR(15) NOT NULL DEFAULT 'requested',
            datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            vehicle_info TEXT NOT NULL,
            comments TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE rides;
        """
    ],
    [
        # "Up" SQL statement
        """
            CREATE TABLE receipts (
            id SERIAL PRIMARY KEY NOT NULL,
            ride_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            total INTEGER NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE receipts;
        """
    ]
]
