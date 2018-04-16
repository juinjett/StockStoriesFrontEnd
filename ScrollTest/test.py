from pandas.io import sql
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("user@password:database")
chunks = pd.read_csv('#stockname.csv', chunksize)
for chunk in chunks:
	chunk.to_sql(con=engine, tablename, if_exists='append')

data = newsapi.get_everything(
		q='Name of stock', 
		language='en', sources,
		sort_by='relevancy',
		from_date, to_date, page=1)
