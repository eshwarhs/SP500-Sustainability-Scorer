import csv
from esg_score import ESGScoreScraper
from google_finance_api import CDPScoreScraper
from tqdm import tqdm


class Company:
    def __init__(self, ticker, name):
        self.ticker = ticker
        self.name = name    
        self.esg_score = None
        self.env_score = None
        self.social_score = None
        self.governance_score = None
        self.climate_score = None

    def write_company_to_csv(self):
        with open('scores.csv', 'a', newline='') as csvfile:
            spamwriter = csv.writer(csvfile, delimiter=',')
            t = []
            if self.esg_score:
                t.append(self.esg_score)
            else:
                t.append('NaN')
            if self.env_score:
                t.append(self.env_score)
            else:
                t.append('NaN')
            if self.social_score:
                t.append(self.social_score)
            else:
                t.append('NaN')
            if self.governance_score:
                t.append(self.governance_score)
            else:
                t.append('NaN')
            if self.climate_score:
                t.append(self.climate_score)
            else:
                t.append('NaN')
            spamwriter.writerow([self.ticker, self.name]+t)

# Define the CSV file path
csv_file_path = 'sp500_companies.csv'

# Create an instance of the ESGScoreScraper class
esg_scraper = ESGScoreScraper()
cdp_scraper = CDPScoreScraper()

# Open the CSV file and read data line by line
try:
    with open(csv_file_path, mode='r', newline='') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)  # Skip the header row if it exists

        for row in tqdm(csv_reader, desc="Processing"):
            if len(row) >= 2:
                company = Company(row[0], row[1])
                print(company.ticker)
                esg_score = esg_scraper.get_esg_score(company.ticker)
                cdp_score = cdp_scraper.get_cdp_score(company.ticker)
                company.esg_score = esg_score[0]
                company.env_score = esg_score[1]
                company.social_score = esg_score[2]
                company.governance_score = esg_score[3]
                company.climate_score = cdp_score
                company.write_company_to_csv()
                # if company.esg_score:
                #     print(f" Ticker: {company.ticker}, Name: {company.name}, ESG Score: {company.esg_score}")
                # else:
                #     print(f"Failed to retrieve ESG score for Ticker: {company.ticker}, Name: {company.name}")
                


finally:
    # Close the ESGScoreScraper
    esg_scraper.close()
