from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
import sqlite3, random
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def connect_db():
    conn = sqlite3.connect('apartment.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    return c, conn

def disconnect_db(conn):
    conn.commit()
    conn.close()

@app.post("/add_bill")
async def add_bill(request: Request):
    data = await request.json()
    apartment_id = data.get("apartment_id")
    bill_type = data.get("bill_type")
    amount = data.get("amount")
    date = data.get("date")
    
    db, conn = connect_db()
    db.execute("INSERT INTO Bill (apartment_id, type, amount, consumed_value, date) VALUES (?, ?, ?, ?, ?);", 
               (apartment_id, bill_type, amount, amount, date))
    disconnect_db(conn)
    return {"status": "success"}

@app.get("/last_month_utilities")
def get_last_month_utilities():
    db, conn = connect_db()
    one_month_ago = datetime.now() - timedelta(days=30)
    db.execute("""
        SELECT type, SUM(amount) as total_amount
        FROM Bill
        WHERE date >= ?
        GROUP BY type
    """, (one_month_ago,))
    rows = db.fetchall()
    data = {"Water": 0, "Electricity": 0, "Wifi": 0, "Gas": 0, "Waste Management": 0}
    for row in rows:
        bill_type = row['type']
        total_amount = row['total_amount']
        if bill_type in data:
            data[bill_type] = total_amount
    print(data)

    disconnect_db(conn)
    return JSONResponse(content=data)

@app.get("/bills")
async def get_bills():
    db, conn = connect_db()
    db.execute("SELECT * FROM Bill")
    rows = db.fetchall()
    bills = [dict(row) for row in rows]
    for bill in bills:
        bill_date = datetime.strptime(bill['date'], "%B %Y")
        bill['date'] = bill_date.strftime("%B %Y")
    disconnect_db(conn)
    return JSONResponse(content=bills)

@app.get("/monthly_utilities")
def get_monthly_utilities():
    db, conn = connect_db()
    db.execute("""
        SELECT strftime('%m', date) as month, SUM(amount) as total_amount
        FROM Bill
        GROUP BY strftime('%Y-%m', date)
        ORDER BY strftime('%Y-%m', date)
    """)
    rows = db.fetchall()
    monthly_data = [0] * 12
    for row in rows:
        month = row['month']
        if month is not None:
            month = int(month) - 1
            total_amount = row['total_amount']
            monthly_data[month] = total_amount

    print(monthly_data)
    disconnect_db(conn)
    return JSONResponse(content=monthly_data)

@app.get("/recorded_data")
async def get_recorded_data():
    db, conn = connect_db()
    db.execute("""
        SELECT r.room_id, dt.type_name, rd.value, dt.unit_of_measure, rd.measurement_date
        FROM RecordedData rd
        JOIN Device d ON rd.device_id = d.device_id
        JOIN Room r ON d.room_id = r.room_id
        JOIN DeviceType dt ON d.type_id = dt.type_id
    """)
    rows = db.fetchall()
    recorded_data = [f"Room ID: {row['room_id']}, Type: {row['type_name']}, Value: {row['value']} {row['unit_of_measure']}, Date: {row['measurement_date']}" for row in rows]
    disconnect_db(conn)
    return JSONResponse(content=recorded_data)