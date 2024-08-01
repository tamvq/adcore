import pandas as pd
import requests
from io import StringIO

def download_and_normalize_csv(url: str) -> pd.DataFrame:
    response = requests.get(url)
    data = StringIO(response.text)
    df = pd.read_csv(data)
    df.columns = [
        'university', 'city', 'country', 'name', 'description',
        'startDate', 'endDate', 'price', 'currency'
    ]
    return df
