import sqlite3, random

# Connect to database
conn = sqlite3.connect('apartment.db')
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Add randomally generated records for all the available devices
def add_records(max_device_id, n):
    for _ in range(n):
        device_id = random.randint(1, max_device_id)
        value = random.randint(0, 100)
        c.execute("INSERT INTO RecordedData (device_id, value) VALUES (?, ?);", (device_id, value))

def add_bills(apartment_id, n):
    for _ in range(n):
        # INSERT INTO Bill (apartment_id, type, amount, consumed_value) VALUES (1, 'water', 50.00, 30.00);
        bill_type = random.choice(['water', 'electricity', 'waste', 'other'])
        amount = random.randint(0, 100)
        consumed_value = random.randint(0, 100)
        c.execute("INSERT INTO Bill (apartment_id, type, amount, consumed_value) VALUES (?, ?, ?, ?);", (apartment_id, bill_type, amount, consumed_value))

def add_bill(apartment_id, bill_type, amount, consumed_value):
    c.execute("INSERT INTO Bill (apartment_id, type, amount, consumed_value) VALUES (?, ?, ?, ?);", (apartment_id, bill_type, amount, consumed_value))

def select_bills():
    c.execute("SELECT * FROM Bill;")
    rows = c.fetchall()
    data = {}
    for row in rows:
        bill_type = row['type']
        amount = row['amount']
        if bill_type in data:
            data[bill_type] += amount
        else:
            data[bill_type] = amount
    print(data)
select_bills()

# Close connection
conn.commit()
conn.close()