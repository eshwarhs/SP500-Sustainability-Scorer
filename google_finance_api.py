import requests, json, re
from parsel import Selector
from itertools import zip_longest

class CDPScoreScraper:
    def __init__(self):
        self.params = {"hl": "en"}
        self.headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}
        self.cdpScoreMap = {'A': '7', 
             'B': '6', 
             'B-': '5', 
             'C': '4', 
             'C-': '3',
             'D': '2',
             'D-': '1',
             'F': '0'}

             

    def get_cdp_score(self, ticker: str): # ticker should be a string
        i = 1
        stockEx = {1 : 'NASDAQ',
                2 : 'NYSE',
                3 : 'CBOE'} 
        cdp = None
        while(i < 4): 
            html = requests.get(f"https://www.google.com/finance/quote/{ticker + ':' + stockEx.get(i)}", params=self.params, headers=self.headers, timeout=30)
            selector = Selector(text=html.text)

            cdp = selector.css(".mU5Zd .P6K39c").xpath("normalize-space()").getall()
            if cdp:
                break
            i += 1
        print(cdp)
        if(cdp):
            return self.cdpScoreMap.get(cdp[0])
        return None