from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
import sqlite3, random
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()
esp_ip = "192.168.1.21"

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
    rows = [dict(row) for row in rows][::-1]
    recorded_data = []
    for row in rows:
        if row['type_name'] == 'Light Bulb':
            status = "Turned On" if row['value'] == 1 else "Turned Off"
            recorded_data.append(f"Light in Room {row['room_id']} {status} on {row['measurement_date']}")
        else:
            recorded_data.append(f"{row['type_name']} in Room {row['room_id']} recorded {row['value']} {row['unit_of_measure']} on {row['measurement_date']}")
    disconnect_db(conn)
    return JSONResponse(content=recorded_data)

@app.get("/turn_on_light")
async def turn_on_light():
    url = f"http://{esp_ip}/LED_ON"
    response = requests.get(url)
    if response.status_code == 200:
        db, conn = connect_db()
        db.execute("INSERT INTO RecordedData (device_id, value) VALUES (?, ?)", (3, 1))  # Assuming device_id 1 is the light
        disconnect_db(conn)
        return {"status": "success"}
    else:
        return {"status": "failed"}

@app.get("/turn_off_light")
async def turn_off_light():
    url = f"http://{esp_ip}/LED_OFF"
    response = requests.get(url)
    if response.status_code == 200:
        db, conn = connect_db()
        db.execute("INSERT INTO RecordedData (device_id, value) VALUES (?, ?)", (3, 0))  # Assuming device_id 1 is the light
        disconnect_db(conn)
        return {"status": "success"}
    else:
        return {"status": "failed"}
    
@app.get("/temp_hum")
async def get_temp_hum():
    url = f"http://{esp_ip}/Temp_Hum"
    response = requests.get(url)
    if response.status_code == 200:
        db, conn = connect_db()
        db.execute("Insert into RecordedData (device_id, value) VALUES (?, ?)", (1, response.json()['temperature']))
        db.execute("Insert into RecordedData (device_id, value) VALUES (?, ?)", (2, response.json()['humidity']))
        disconnect_db(conn)
        return response.json()
    else:
        return {"status": "failed"}
# curl -X GET "http://127.0.0.1:8000/turn_on_light"
