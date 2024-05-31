import pymysql
from flask import *
from decimal import Decimal, InvalidOperation
from flask import request, jsonify

app = Flask(__name__)

# MySQL configurations
db_host = 'localhost'
db_user = 'root'
db_password = ''
db_name = 'petrol_management_system'

# Connect to the database
connection = pymysql.connect(host=db_host, user=db_user, password=db_password, db=db_name, cursorclass=pymysql.cursors.DictCursor)

@app.route('/')
def index():
    return render_template('new.html')


@app.route('/update_data', methods=['POST'])
def update_data():
    if request.method == 'POST':
        data = request.json
        pyclosing_cash_meter = data.get('closingCashMeter')
        pyclosing_liters_meter = data.get('closingLitersMeter')
        pyclosing_deeps_str = data.get('closingDeeps')
        date = data.get('date')
        dateStock = data.get('date')

        try:
            cursor = connection.cursor()

            # Get previous values from station table
            cursor.execute("SELECT * FROM station ORDER BY date DESC LIMIT 1")
            fetchData = cursor.fetchone()

            # Convert string values to Decimal
            station_id = fetchData['id']
            previous_cash_meter = Decimal(fetchData['closing_cash_meter'])
            previous_liters_meter = Decimal(fetchData['closing_liters_meter'])
            closing_cash_meter = Decimal(pyclosing_cash_meter)
            closing_liters_meter = Decimal(pyclosing_liters_meter)
            closing_deeps = Decimal(pyclosing_deeps_str)

            # Get previous values from stock table
            cursor.execute("SELECT * FROM stock ORDER BY date DESC LIMIT 1")
            fetchStockData = cursor.fetchone()

            # Convert string values to Decimal
            stockClosingDeep = Decimal(fetchStockData['closing_deep'])

            # Calculate actual values
            actual_cash = closing_cash_meter - previous_cash_meter
            actual_liters = closing_liters_meter - previous_liters_meter

            # Insert new data into station table
            sql_station = 'INSERT INTO station (closing_cash_meter, closing_liters_meter, date, previous_cash_meter, previous_liters_meter) VALUES (%s, %s, %s, %s, %s)'
            stationData = (closing_cash_meter, closing_liters_meter, date, previous_cash_meter, previous_liters_meter)
            cursor.execute(sql_station, stationData)

            # Insert new data into stock table
            sql_stock = 'INSERT INTO stock (id_sale, closing_deep, opening_deep, date) VALUES (%s, %s, %s, %s)'
            stockData = (station_id, closing_deeps, stockClosingDeep, dateStock)
            cursor.execute(sql_stock, stockData)

            connection.commit()

            return jsonify({'message': 'Data updated successfully'}), 200

        except Exception as e:
            connection.rollback()
            print("An error occurred while updating data:", str(e))
            return jsonify({'error': 'An error occurred while updating data'}), 500


@app.route('/daily_sales_report', methods=['GET'])
def daily_sales_report():
    try:
        with connection.cursor() as cursor:
            sql = 'SELECT date, closing_cash_meter - previous_cash_meter AS actual_cash, closing_liters_meter - previous_liters_meter AS actual_liters FROM station'
            cursor.execute(sql)
            sales_data = cursor.fetchall()

        return jsonify(sales_data)

    except Exception as e:
        print("An error occurred while fetching daily sales report:", str(e))
        return jsonify({'error': 'An error occurred while fetching daily sales report'}), 500


@app.route('/current_sales', methods=['GET'])
def current_sales():
    try:
        with connection.cursor() as cursor:
            sql = """
                SELECT 
                    s.date, 
                    s.closing_cash_meter - s.previous_cash_meter AS actual_cash, 
                    s.closing_liters_meter - s.previous_liters_meter AS actual_liters, 
                    s.closing_cash_meter, 
                    s.closing_liters_meter, 
                    (SELECT IFNULL(closing_deep, 0) FROM stock ORDER BY reg_date DESC LIMIT 1) AS closing_deep
                FROM 
                    station s
                ORDER BY 
                    s.date DESC
                LIMIT 1
            """
            cursor.execute(sql)
            csales_data = cursor.fetchone()
            data = []
            data.append(csales_data)

        return jsonify(data)

    except Exception as e:
        print("An error occurred while fetching current sales:", str(e))
        return jsonify({'error': 'An error occurred while fetching current sales'}), 500


@app.route('/latest_stock_report', methods=['GET'])
def latest_stock_report():
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT date, closing_cash_meter, closing_liters_meter FROM station ORDER BY date DESC LIMIT 1")
            latest_stock_data = cursor.fetchall()

        return jsonify(latest_stock_data)

    except Exception as e:
        print("An error occurred while fetching latest stock report:", str(e))
        return jsonify({'error': 'An error occurred while fetching latest stock report'}), 500


@app.route('/monthly_sales_report', methods=['GET'])
def monthly_sales_report():
    try:
        with connection.cursor() as cursor:
            # Get the total sales for each month with month name
            sql = """
                SELECT YEAR(date) AS year, 
                       MONTHNAME(date) AS month_name,
                       SUM(closing_cash_meter - previous_cash_meter) AS total_cash,
                       SUM(closing_liters_meter - previous_liters_meter) AS total_liters
                FROM station
                GROUP BY YEAR(date), MONTH(date)
                """
            cursor.execute(sql)
            monthly_sales_data = cursor.fetchall()

        return jsonify(monthly_sales_data)

    except Exception as e:
        print("An error occurred while fetching monthly sales report:", str(e))
        return jsonify({'error': 'An error occurred while fetching monthly sales report'}), 500


@app.route('/new_stock', methods=['POST'])
def new_stock():
    if request.method == 'POST':
        data = request.json
        new_deeps_str = data.get('newDeeps')
        StockDate = data.get('StockDate')

        try:
            cursor = connection.cursor()

            # Get previous values from stock table
            cursor.execute("SELECT * FROM stock ORDER BY reg_date DESC LIMIT 1")
            fetchdata = cursor.fetchone()

            # Convert string values to Decimal
            closingDeep = Decimal(fetchdata['closing_deep'])

            # Convert string values to Decimal
            new_deeps = Decimal(new_deeps_str)

            # Calculate new actual stock
            newOpeningDeep = (closingDeep + new_deeps)

            # Insert new data into stock table
            sql = 'INSERT INTO stock (closing_deep, opening_deep, added_deeps, date) VALUES (%s, %s, %s, %s)'
            data = (newOpeningDeep, closingDeep, new_deeps, StockDate)
            cursor.execute(sql, data)
            connection.commit()

            return jsonify({'message': 'New Stock Updated Successfully'}), 200

        except Exception as e:
            connection.rollback()
            print("An error occurred while updating new stock:", str(e))
            return jsonify({'error': 'An error occurred while updating new stock'}), 500


if __name__ == '__main__':
    app.run(debug=True)
