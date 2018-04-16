from newsapi import NewsApiClient
import json
output=[]
output_url=[]

newsapi = NewsApiClient(api_key='8a5dcbfa92fa47e6ba39d884d3506369')
data = newsapi.get_top_headlines(q='bitcoin',language='en')
for i in range(0,3):
	output.append(data['articles'][i]['title'])
	output_url.append(data['articles'][i]['url'])
print(output)
print(output_url)