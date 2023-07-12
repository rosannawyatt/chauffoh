
steps = [
    [   """
        DROP TABLE rides;
        """,
        """
        DROP TABLE rides;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE rides (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT REFERENCES accounts (id) ON DELETE CASCADE,
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
        """
        DROP TABLE receipts;
        """,
        """
        DROP TABLE receipts;
        """
        ]
    ,
    [
        # "Up" SQL statement
        """
            CREATE TABLE receipts (
            id SERIAL PRIMARY KEY NOT NULL,
            ride_id INT UNIQUE REFERENCES rides (id) ON DELETE CASCADE,
            account_id INT REFERENCES accounts (id) ON DELETE CASCADE,
            total DECIMAL(10, 2) NOT NULL
            )
        """,
        # "Down" SQL statement
        """
        DROP TABLE receipts;
        """
    ]
]
