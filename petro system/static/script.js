function loadStock() {
    // Load the stock management content here
    document.getElementById("dynamic-content").innerHTML = `
        
        <form id="newStockForm" class="col-md-6 card shadow p-5 bg-secondary">
            <h3 class="text-light">Add New Stock</h3>
            <div class="form-group">
                <label for="newDeeps">Number of Liters</label>
                <input type="number" class="form-control" id="newDeeps" name="newDeeps" required>
            </div>
            <div class="form-group">
                <label for="date">Date of the New Stock</label>
                <input type="date" class="form-control" id="StockDate" name="date" required>
            </div>
            <button type="submit" class="btn btn-primary text-light ">Submit</button>
        </form>
    `;

    // Attach event listener to form submission
    document.getElementById("newStockForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const newDeeps = document.getElementById("newDeeps").value;
        const StockDate = document.getElementById("StockDate").value;

        // Make AJAX request to add new stock
        fetch('/new_stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newDeeps: newDeeps,
                StockDate: StockDate
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display success message
            alert(data.message);
            // Reload the page to update the stock information
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    });
}

function dailySales(){
    // Load the stock management content here
    document.getElementById("dynamic-content").innerHTML = `
        <div class="col-md-6 bg card  shadow p-5">
        <h2>Today Sales Update</h2>
        <form id="updateForm">
            <div class="form-group">
                <label for="closingCashMeter">Closing Cash Meter</label>
                <input type="number" class="form-control" id="closingCashMeter" name="closingCashMeter" required>
            </div>
            <div class="form-group">
                <label for="closingLitersMeter">Closing Liters Meter</label>
                <input type="number" class="form-control" id="closingLitersMeter" name="closingLitersMeter" required>
            </div>
            <div class="form-group">
                <label for="closingDeeps">Closing Deeps</label>
                <input type="number" class="form-control" id="closingDeeps" name="closingDeeps" required>
            </div>
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" class="form-control" id="date" name="date" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        </div>
    `;

    // Attach event listener to form submission
    document.getElementById("updateForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const closingCashMeter = document.getElementById("closingCashMeter").value;
        const closingLitersMeter = document.getElementById("closingLitersMeter").value;
        const closingDeeps = document.getElementById("closingDeeps").value;
        const date = document.getElementById("date").value;

        // Make AJAX request to update daily sales
        fetch('/update_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                closingCashMeter: closingCashMeter,
                closingLitersMeter: closingLitersMeter,
                closingDeeps: closingDeeps,
                date: date
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display success message
            alert(data.message);
            // Reload the page to update the stock information
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    });

}


  function loadSalesReport() {
    // Load the daily sales report content here
        document.getElementById("dynamic-content").innerHTML = `
            <div class="bg-info text-light card shadow p-5">
            <h1>Daily Sales Report</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Actual Cash</th>
                        <th>Actual Liters</th>
                    </tr>
                </thead>
                <tbody id="dailySalesReport"></tbody>
            </table>
            </div>
        `;

        // Fetch and display daily sales report
        fetch('/daily_sales_report')
            .then(response => response.json())
            .then(data => {
                data.forEach(row => {
                    const rowHtml = `
                        <tr>
                            <td>${row.date}</td>
                            <td>${row.actual_cash}</td>
                            <td>${row.actual_liters}</td>
                        </tr>
                    `;
                    document.getElementById("dailySalesReport").innerHTML += rowHtml;
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }


function loadDashboard() {
    // Load the dashboard content here
    document.getElementById("dynamic-content").innerHTML = `
      <h4>Petrol Management System Dashboard</h4>

      <div class="bg-info text-light card shadow pl-5 pr-5 pt-2">
            <h5>Daily Sales Report</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Actual Cash</th>
                        <th>Actual Liters</th>
                        <th>Cash Meter</th>
                        <th>Liters Meter</th>
                        <th>Deeps</th>
                    </tr>
                </thead>
                <tbody id="current_sales"></tbody>
            </table>
            </div>

    
      <canvas id="dailySalesChart" width="800" height="250"></canvas>
    `;
    // Fetch data from the server
    fetch('/current_sales')
    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            const rowHtml = `
                <tr>
                    <td>${row.date}</td>
                    <td>${row.actual_cash}</td>
                    <td>${row.actual_liters}</td>
                    <td>${row.closing_cash_meter}</td>
                    <td>${row.closing_liters_meter}</td>
                    <td>${row.closing_deep}</td>
                </tr>
            `;
            document.getElementById("current_sales").innerHTML += rowHtml;
        });
    })
    .catch(error => console.error('Error fetching data:', error));
  
    // Fetch data from the server
    fetch('/daily_sales_report')
      .then(response => response.json())
      .then(data => {
        const dates = data.map(item => item.date);
        const actualCash = data.map(item => item.actual_cash);
        const actualLiters = data.map(item => item.actual_liters);
  
        // Create Chart.js chart
        var ctx = document.getElementById('dailySalesChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Actual Cash',
              data: actualCash,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'cash',
            }, {
              label: 'Actual Liters',
              data: actualLiters,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: false,
              yAxisID: 'liters',
            }]
          },
          options: {
            scales: {
              yAxes: [{
                id: 'cash',
                type: 'linear',
                position: 'left',
                scaleLabel: {
                  display: true,
                  labelString: 'Actual Cash (K)'
                }
              }, {
                id: 'liters',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                  display: true,
                  labelString: 'Actual Liters'
                }
              }]
            }
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  

  function loadMonthlyReport() {
    fetch('/monthly_sales_report') // endpoint to fetch monthly sales data
        .then(response => response.json())
        .then(data => {
            // Generate HTML based on the received data
            let html = `
                <div class="container-fluid col-md bg-info text-light card shadow p-5">
                    <h1>Monthly Sales Report</h1>
                    <table class="table text-dark">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Total Cash (KES)</th>
                                <th>Total Liters</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            // Loop through the data and add rows to the table
            data.forEach(row => {
                html += `
                    <tr>
                        <td>${row.year}</td>
                        <td>${row.month_name}</td>
                        <td>${row.total_cash}</td>
                        <td>${row.total_liters}</td>
                    </tr>
                `;
            });

            // Close the table and container div
            html += `
                        </tbody>
                    </table>
                </div>
            `;

            // Set the generated HTML to the dynamic-content element
            document.getElementById("dynamic-content").innerHTML = html;
        })
        .catch(error => console.error('Error fetching monthly sales data:', error));
    }
