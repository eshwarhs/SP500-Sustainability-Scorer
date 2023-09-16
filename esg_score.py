from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common import TimeoutException
import sys
import csv


class ESGScoreScraper:
    def __init__(self):
        # Initialize a web driver instance to control a Chrome window
        self.driver = webdriver.Chrome(
            service=ChromeService(ChromeDriverManager().install()))
        self.driver.set_window_size(1920, 1080)

    def get_esg_score(self, ticker):
        res = [None, None, None, None, None]
        try:
            url = 'https://finance.yahoo.com/quote/{}/sustainability?p={}'.format(
                ticker, ticker)
            # Visit the target page
            self.driver.get(url)

            esg = self.driver.find_element(
                By.CSS_SELECTOR, 'div[class="Fz(36px) Fw(600) D(ib) Mend(5px)"]')
            res[0] = esg.text

            env_score = self.driver.find_element(
                By.XPATH, '//div[@class="Va(t) D(ib) W(22%) smartphone_W(33%) Wow(bw) Bxz(bb) Px(5px)"][1]')
            res[1] = env_score.text.split('\n')[1]

            social_score = self.driver.find_element(
                By.XPATH, '//div[@class="Va(t) D(ib) W(22%) smartphone_W(33%) Wow(bw) Bxz(bb) Px(5px)"][2]')
            res[2] = social_score.text.split('\n')[1]

            gov_score = self.driver.find_element(
                By.XPATH, '//div[@class="Va(t) D(ib) W(22%) smartphone_W(33%) Wow(bw) Bxz(bb) Px(5px)"][3]')
            res[3] = gov_score.text.split('\n')[1]

            controversy_level = self.driver.find_element(
                By.CSS_SELECTOR, 'div[class="D(ib) Fz(36px) Fw(500)"]')
            res[4] = controversy_level.text
            return res
        except Exception as e:
            print(f"Error when fetching ESG data for {ticker}")
            return res

    def close(self):
        # Close the browser and free up the resources
        self.driver.quit()
