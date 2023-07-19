steps = [
        [   """
        DROP TABLE accounts CASCADE;
        """,
        """
        DROP TABLE accounts;
        """
    ],
    [
        # "Up" SQL statement
        """
         CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            hash_password VARCHAR(72) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            is_employee BOOLEAN NOT NULL DEFAULT FALSE,
            current_ride BOOLEAN NOT NULL DEFAULT FALSE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ],
]
