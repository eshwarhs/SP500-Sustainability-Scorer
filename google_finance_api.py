import requests
from parsel import Selector


class CDPScoreScraper:
    def __init__(self):
        self.params = {"hl": "en"}
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}

    def get_cdp_score(self, ticker: str):  # ticker should be a string
        i = 1
        stockEx = {1: 'NASDAQ',
                   2: 'NYSE',
                   3: 'CBOE'}
        cdp = None
        while (i < 4):
            html = requests.get(
                f"https://www.google.com/finance/quote/{ticker + ':' + stockEx.get(i)}", params=self.params, headers=self.headers, timeout=30)
            selector = Selector(text=html.text)

            cdp = selector.css(".mU5Zd .P6K39c").xpath(
                "normalize-space()").getall()
            if cdp:
                break
            i += 1
        if cdp:
            return cdp[0]
        return None
