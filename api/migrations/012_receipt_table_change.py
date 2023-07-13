
steps = [
        [
        """
        DROP TABLE accounts CASCADE;


        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            hash_password VARCHAR(72) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            is_employee BOOLEAN NOT NULL DEFAULT FALSE
        );
        """,
    """_summary_
    """
    ],
    [
        """
        DROP TABLE receipts CASCADE;
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
            ride_id INT UNIQUE REFERENCES rides (id) ON DELETE CASCADE NOT NULL,
            account_id INT REFERENCES accounts (id) ON DELETE CASCADE NOT NULL,
            total DECIMAL(10, 2) NOT NULL
            )
        """,
        # "Down" SQL statement
        """
        DROP TABLE receipts;
        """
    ],
        [   """
        DROP TABLE rides CASCADE;
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
            account_id INT REFERENCES accounts (id) ON DELETE CASCADE NOT NULL,
            is_roundtrip BOOLEAN NOT NULL,
            start_location VARCHAR(150) NOT NULL,
            end_location VARCHAR(150) NOT NULL,
            ride_status VARCHAR(15) NOT NULL DEFAULT 'requested',
            datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            vehicle_info TEXT NOT NULL,
            comments TEXT,
            driver_id INT REFERENCES accounts (id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE rides;
        """
    ],
]
