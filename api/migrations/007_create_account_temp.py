steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO accounts VALUES
        (1, 'user', 'password', 'grp9','chauffoh','email@email.com', false);
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]
