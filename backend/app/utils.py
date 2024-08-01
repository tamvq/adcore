import pandas as pd
import requests
from io import StringIO

def download_and_normalize_csv(url: str) -> pd.DataFrame:
    response = requests.get(url)
    data = response.content.decode('utf-8')
    df = pd.read_csv(StringIO(data), encoding='utf-8')
    df.columns = [
        'university', 'city', 'country', 'name', 'description',
        'startDate', 'endDate', 'price', 'currency'
    ]
    return df
