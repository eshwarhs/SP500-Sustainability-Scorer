import requests
from parsel import Selector
from itertools import zip_longest


class CDPScoreScraper:
    def __init__(self):
        self.params = {"hl": "en"}
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}

    def get_cdp_score(self, ticker: str):  # ticker should be a string
        i = 1
        stockEx = {1 : 'NASDAQ',
                2 : 'NYSE',
                3 : 'CBOE'} 

        ticker_data = {
            "title": {},
            "quote": {},
            "current_price": {},
            "day_range": {},
            "year_range": {},
            "market_cap": {},
            "website": {},
            "revenue": {},
            "net_income": {},
            "cdp": {},
            "news": {"items": []}
        }
        try:
            while (i < 4):
                html = requests.get(
                    f"https://www.google.com/finance/quote/{ticker + ':' + stockEx.get(i)}", params=self.params, headers=self.headers, timeout=30)
                selector = Selector(text=html.text)

                # current price, quote, title extraction
                ticker_data["current_price"] = selector.css(".AHmHk .fxKbKc::text").get()

                if ticker_data["current_price"] == None :
                    i += 1
                    # print(i)
                    continue

                ticker_data["quote"] = selector.css(".PdOqHc::text").get().replace(" • ",":")
                ticker_data["title"] = selector.css(".zzDege::text").get()

                # about panel extraction
                about_panel_keys = selector.css(".gyFHrc .mfs7Fc::text").getall()
                about_panel_values = selector.css(".gyFHrc .P6K39c").xpath("normalize-space()").getall()
                
                for key, value in zip_longest(about_panel_keys, about_panel_values):
                    key_value = key.lower().replace(" ", "_")
                    ticker_data[key_value] = value
                
                # cdp extraction
                ticker_data["cdp"] = selector.css(".mU5Zd .P6K39c").xpath("normalize-space()").getall()
                
                # news extraction
                if selector.css(".yY3Lee").get():
                    for index, news in enumerate(selector.css(".yY3Lee"), start=1):
                        ticker_data["news"]["items"].append({
                            "title": news.css(".Yfwt5::text").get(),
                            "link": news.css(".z4rs2b a::attr(href)").get(),
                            "published": news.css(".Adak::text").get(),
                        })
                else: 
                    ticker_data["news"]["error"] = f"No news result from a {ticker}."

                #Finance data extraction
                table = selector.css('table.slpEwd')
                if table:
                    # Extract table data into a list of lists
                    rows = table.css('tr')
                    for i in range(1,len(rows)):
                        row_data = rows[i].css('.roXhBd .QXDnM::text').get()
                        if(i == 1):
                            ticker_data["revenue"] = row_data
                        elif(i == 3):
                            ticker_data["net_income"] = row_data
                        elif(i > 3):
                            break
                return ticker_data
        except Exception as e:
            print(f"Error when fetching CDP data for {ticker}")
            return ticker_data
    
# p = CDPScoreScraper()
# print(len(p.get_cdp_score("AOS").get("cdp")) > 0)