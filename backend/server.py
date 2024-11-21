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
    month = data.get("date")
    
    # Convert month to a proper date structure (assuming the year is the current year)
    date = f"{month} 01, {datetime.now().year}"
    
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
    data = {"Water": 0, "Electricity": 0, "Wifi": 0}
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
    disconnect_db(conn)
    return JSONResponse(content=bills)