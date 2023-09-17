from taipy.gui import Gui
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


data = pd.read_csv('../scores.csv', names=["Ticker","Company","ESG Risk score","Environment Risk Score","Social Risk Score","Governance Risk Score","Controversy Level","CDP Score", "Sustainability Score"])

page = """
<|{data}|table|>
<|message|indicator|value={30}|min=0|max=100|>
"""

Gui(page=page).run(port=3000)
