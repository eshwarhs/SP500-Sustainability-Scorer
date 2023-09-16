import requests
from parsel import Selector


class CDPScoreScraper:
    def __init__(self):
        self.params = {"hl": "en"}
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}

    def get_cdp_score(self, ticker: str):  # ticker should be a string
        i = 1
        stockEx = {1 : 'NASDAQ1',
                2 : 'NYSE',
                3 : 'CBOE'} 

        ticker_data = {
            "ticker_data": {},
            "about_panel": {},
            "cdp": {},
            "news": {"items": []},
            "finance_perfomance": {"table": []}, 
            "people_also_search_for": {"items": []},
            "interested_in": {"items": []}
        }

        
        cdp = None
        while (i < 4):
            html = requests.get(
                f"https://www.google.com/finance/quote/{ticker + ':' + stockEx.get(i)}", params=self.params, headers=self.headers, timeout=30)
            selector = Selector(text=html.text)

            # current price, quote, title extraction
            ticker_data["ticker_data"]["current_price"] = selector.css(".AHmHk .fxKbKc::text").get()

            if ticker_data["ticker_data"]["current_price"] == None :
                i += 1
                continue

            ticker_data["ticker_data"]["quote"] = selector.css(".PdOqHc::text").get().replace(" • ",":")
            ticker_data["ticker_data"]["title"] = selector.css(".zzDege::text").get()

            # about panel extraction
            about_panel_keys = selector.css(".gyFHrc .mfs7Fc::text").getall()
            about_panel_values = selector.css(".gyFHrc .P6K39c").xpath("normalize-space()").getall()
            
            for key, value in zip_longest(about_panel_keys, about_panel_values):
                key_value = key.lower().replace(" ", "_")
                ticker_data["about_panel"][key_value] = value
            
            # description "about" extraction
            ticker_data["about_panel"]["description"] = selector.css(".bLLb2d::text").get()
            ticker_data["about_panel"]["extensions"] = selector.css(".w2tnNd::text").getall()
            ticker_data["cdp"] = selector.css(".mU5Zd .P6K39c").xpath("normalize-space()").getall()
            
            
            # news extarction
            if selector.css(".yY3Lee").get():
                for index, news in enumerate(selector.css(".yY3Lee"), start=1):
                    ticker_data["news"]["items"].append({
                        "position": index,
                        "title": news.css(".Yfwt5::text").get(),
                        "link": news.css(".z4rs2b a::attr(href)").get(),
                        "source": news.css(".sfyJob::text").get(),
                        "published": news.css(".Adak::text").get(),
                        "thumbnail": news.css("img.Z4idke::attr(src)").get()
                    })
            else: 
                ticker_data["news"]["error"] = f"No news result from a {ticker}."

            # finance perfomance table
            if selector.css(".slpEwd .roXhBd").get():
                fin_perf_col_2 = selector.css(".PFjsMe+ .yNnsfe::text").get()           # e.g. Dec 2021
                fin_perf_col_3 = selector.css(".PFjsMe~ .yNnsfe+ .yNnsfe::text").get()  # e.g. Year/year change
                
                for fin_perf in selector.css(".slpEwd .roXhBd"):
                    if fin_perf.css(".J9Jhg::text , .jU4VAc::text").get():
                        perf_key = fin_perf.css(".J9Jhg::text , .jU4VAc::text").get()   # e.g. Revenue, Net Income, Operating Income..
                        perf_value_col_1 = fin_perf.css(".QXDnM::text").get()           # 60.3B, 26.40%..   
                        perf_value_col_2 = fin_perf.css(".gEUVJe .JwB6zf::text").get()  # 2.39%, -21.22%..
                        
                        ticker_data["finance_perfomance"]["table"].append({
                            perf_key: {
                                fin_perf_col_2: perf_value_col_1,
                                fin_perf_col_3: perf_value_col_2
                            }
                        })
            else:
                ticker_data["finance_perfomance"]["error"] = f"No 'finence perfomance table' for {ticker}."
            return ticker_data
        
        return None
    
p = CDPScoreScraper()
p.get_cdp_score("GOOG")