steps = [
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
            roundtrip_date TIMESTAMP DEFAULT NULL,
            start_location VARCHAR(150) NOT NULL,
            end_location VARCHAR(150) NOT NULL,
            ride_status VARCHAR(15) NOT NULL DEFAULT 'Requested',
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
