from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import sqlite3, random

app = FastAPI()

def connect_db():
    conn = sqlite3.connect('apartment.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    return c, conn

def disconnect_db(conn):
    conn.commit()
    conn.close()

# http://127.0.0.1:8000/add_bill?apartment_id=1&bill_type=water&amount=200&consumed_value=200
@app.post("/add_bill")
def add_bill(apartment_id, bill_type, amount, consumed_value):
    db, conn = connect_db()
    db.execute("INSERT INTO Bill (apartment_id, type, amount, consumed_value) VALUES (?, ?, ?, ?);", (apartment_id, bill_type, amount, consumed_value))
    disconnect_db(conn)

@app.get("/chart", response_class=HTMLResponse)
def show_chart():
    db, conn = connect_db()
    db.execute("SELECT * FROM Bill;")
    rows = db.fetchall()
    data = {}
    for row in rows:
        bill_type = row['type']
        amount = row['amount']
        if bill_type in data:
            data[bill_type] += amount
        else:
            data[bill_type] = amount
    disconnect_db(conn)
    html_content = f"""
    <html>
    <head>
        <!--Load the AJAX API-->
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {{'packages':['corechart']}});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {{

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Type');
            data.addColumn('number', 'Amount');
            data.addRows([
            ['Water', {data["water"]}],
            ['Electricity', {data["electricity"]}],
            ['Waste', {data["waste"]}],
            ['Other', {data["other"]}]
            ]);

            // Set chart options
            var options = {{'title':'Home bills',
                        'width':400,
                        'height':300}};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }}
        </script>
    </head>

    <body>
        <!--Div that will hold the pie chart-->
        <div id="chart_div"></div>
    </body>
    </html>
    """
    return html_content