function predictShipping() {
    var Warehouse_Block = document.getElementById('Warehouse_Block').value;
    var Mode_of_shipment = document.getElementById('Mode_of_shipment').value;
    var Customer_care_calls = document.getElementById('Customer_care_calls').value;
    var Customer_rating = document.getElementById('Customer_rating').value;
    var Cost_of_the_Product = document.getElementById('Cost_of_the_Product').value;
    var Prior_purchases = document.getElementById('Prior_purchases').value;
    var Product_importance = document.getElementById('Product_importance').value;
    var Gender = document.getElementById('Gender').value;
    var Discount_offered = document.getElementById('Discount_offered').value;
    var Weight_in_gms = document.getElementById('Weight_in_gms').value;

    // Get other input values similarly

    // Create a data object to send to the server
    var data = {
        warehouseBlock: warehouseBlock,
        Mode_of_shipment: Mode_of_shipment,
        Customer_care_calls: Customer_care_calls,
        Customer_rating: Customer_rating,
        Cost_of_the_Product: Cost_of_the_Product,
        Prior_purchases: Prior_purchases,
        Product_importance: Product_importance,
        Gender: Gender,
        Discount_offered: Discount_offered,
        Weight_in_gms: Weight_in_gms
    };

    // Send a POST request to the server endpoint '/predict'
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Display prediction result in the HTML
        document.getElementById('predictionResult').innerHTML = "<p>Shipping Prediction: " + result.prediction + "</p>";
        // Process other parts of the prediction result if needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
