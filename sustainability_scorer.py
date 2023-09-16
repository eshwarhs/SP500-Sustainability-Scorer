import csv
from esg_score import ESGScoreScraper


class Company:
    def __init__(self, ticker, name):
        self.ticker = ticker
        self.name = name    
        self.esg_score = None
        self.env_score = None

    def write_company_to_csv(self):
        with open('scores.csv', 'a', newline='') as csvfile:
            spamwriter = csv.writer(csvfile, delimiter=',')
            spamwriter.writerow([self.ticker, self.name, self.esg_score, self.env_score])

# Define the CSV file path
csv_file_path = 'sp500_companies.csv'

# Create an instance of the ESGScoreScraper class
esg_scraper = ESGScoreScraper()

# Open the CSV file and read data line by line
try:
    with open(csv_file_path, mode='r', newline='') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)  # Skip the header row if it exists

        for row in csv_reader:
            if len(row) >= 2:
                company = Company(row[0], row[1])
                # print(ticker)
                esg_score = esg_scraper.get_esg_score(company.ticker)
                company.esg_score = esg_score[0]
                company.env_score = esg_score[1]
                company.write_company_to_csv()
                if company.esg_score:
                    print(f"Ticker: {company.ticker}, Name: {company.name}, ESG Score: {company.esg_score}")
                else:
                    print(f"Failed to retrieve ESG score for Ticker: {company.ticker}, Name: {company.name}")
                


finally:
    # Close the ESGScoreScraper
    esg_scraper.close()
