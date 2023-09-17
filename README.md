# SP500 Sustainability Scorer

This project was developed as part of the Shellhacks2023 hackathon.

## Problem Statement 

**Schonfeld Sustainability Challenge**

Help us visualize our stock picks through the lens of sustainability - we'd like to create a database/platform through which our investment teams can view the overall sustainability of companies on the S&P 500. How you do this is up to you, but we want to see creativity- particularly in how you develop your sustainability scales, what factors you see as important in contributing to an overall "score", and how you present your findings.

## Project description 

In this project, we develop a sustainability indicator for the S&P500 companies. The sustainability of companies is assessed by their impact on the environment, society and the future financial health of the company. To this end, we gathered crucial sustainability parameters and used them to generate a weighted sustainability score for each company. This data is then displayed using a custom-built web interface.

The dataset has the following columns:
* Ticker: a unique series of letters assigned to a security for trading purposes. 
* Name: registered name of the securities being traded
* ESG risk score: ESG Risk Ratings assess the degree to which a company’s enterprise business value is at risk driven by environmental, social and governance issues. The rating employs a two-dimensional framework that combines an assessment of a company’s exposure to industry-specific material ESG issues with an assessment of how well the company is managing those issues. The final ESG Risk Ratings scores are a measure of unmanaged risk on an absolute scale of 0-100, with a lower score signalling less unmanaged ESG Risk. [Sustainalytics](https://www.sustainalytics.com/)
* Environment risk score: a score that reflects the environmental risk of companies
* Social risk score: a score that reflects the social risk of companies
* Governance risk score: a score that reflects the governance risk of companies
* Controversy level: Sustainalytics’ Controversies Research identifies companies involved in incidents and events that may negatively impact stakeholders, the environment or the company’s operations. Controversies are rated on a scale from one to five with five denoting the most serious controversies with the largest potential impact.
* CDP (Carbon Disclosure Project) score: A [CDP](https://www.cdp.net/en/scores/cdp-scores-explained) score is a snapshot of a company's environmental disclosure and performance. A score from D- to A is given to companies based on their responses to one or more of the climate change, forests and water security questionnaires. 


## Methodology

* Prepare a list of S&P500 companies by scrapping the Wikipedia page.
* The parameters ESG risk score, Environment risk score, Social risk score, Governance risk score and Controversy levels are scrapped from Yahoo Finance. Other parameters are scrapped from the Google Finance website. All this data is then saved as a CSV file for easy handling. The overall sustainability score is then calculated by aggregating the sum of normalized ESG, Controversies and CDP scores. All this is handled by script sustainability_scorer.py.
* The gathered information is then displayed on an interactive webpage.

  ![System Aechitecture](/images/System_architecture.jpg "System Architecture")

## Usage
* Install the required libraries
  ```
  pip install -r requirements.txt
  ```
* Generate the s&p500 companies list by running the snp500_list.py script
  ```
  python snp500_list.py
  ```
* Next, gather the dataset and calculate sustainability scores by running the sustainability_scorer.py script
  ```
  python sustainability_scorer.py
  ```
* To start the react webpage, run the following commands
  ```
  cd snp-dashboard
  nmp i
  nmp run
  ```
  Access the webpage on your localhost.

## Built with
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Selenium](https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white)
* Parsel
  
