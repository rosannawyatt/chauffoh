steps = [
    [
        """
        insert into "rides" ("account_id", "comments", "datetime", "end_location", "id", "is_roundtrip", "ride_status", "start_location", "vehicle_info") values (1, '', '2023-06-29 22:34:34.453921', 'end', 1, false, 'requested', 'start', 'car');
        insert into "rides" ("account_id", "comments", "datetime", "end_location", "id", "is_roundtrip", "ride_status", "start_location", "vehicle_info") values (1, NULL, '2023-06-29 22:45:45.855714', 'e', 2, true, 'requested', 's', 'car');
        """,
        """
        DROP TABLE accounts;
        """
    ]
]
