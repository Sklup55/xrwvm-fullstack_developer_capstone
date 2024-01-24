import json
import random

# Function to generate a realistic price based on car make
def generate_realistic_price(make):
    prices = {
        "Audi": 70000,
        "Kia": 15000,
        "Nissan": 30000,
        "Mercedes": 60000,
        "Toyota": 25000
        # Add more makes and prices as needed
    }

    # Default to a random price if make is not in the dictionary
    return prices.get(make, random.randint(10000, 50000))

# Read the JSON file
with open('car_records.json', 'r') as file:
    data = json.load(file)

# Iterate through each car object and add a new "price" field
for car in data['cars']:
    car['price'] = generate_realistic_price(car['make'])

# Write the modified data back to the JSON file
with open('car_records_with_price.json', 'w') as file:
    json.dump(data, file, indent=2)

print("Price added to each car object. Check 'car_records_with_price.json' for the updated data.")
