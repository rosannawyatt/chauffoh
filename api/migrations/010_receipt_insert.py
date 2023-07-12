steps = [
        [
        # "Up" SQL statement
        """
        INSERT INTO receipts VALUES
        (1, 1, 1, 12),
        (2, 2, 1, 13);
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]
