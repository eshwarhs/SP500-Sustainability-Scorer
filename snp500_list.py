import requests
import pandas as pd

print("----------------------- Fetching S&P 500 Company List  -----------------------")

# Define the URL of the Wikipedia page containing the S&P 500 companies list
url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Parse the HTML content of the page
html = response.text

# Find the table on the page that contains the S&P 500 company data
tables = pd.read_html(html)

# The first table usually contains the S&P 500 company data
sp500_df = tables[0]

# Extract the list of company tickers (symbols) from the DataFrame
sp500_symbols = sp500_df['Symbol'].tolist()
sp500_comps = sp500_df['Security'].tolist()

# Specify the file path where you want to create or write to the text file
file_path = "sp500_companies.csv"

# Open the file in write mode ('w' for writing)
# If the file doesn't exist, it will be created
# If it does exist, its contents will be overwritten
with open(file_path, 'w') as file:
    # Write each company name to the file with a newline character
    for company, security in zip(sp500_symbols, sp500_comps):
        file.write(f"{company},{security}\n")

print("----------------------- S&P 500 Company List Fetched!  -----------------------")