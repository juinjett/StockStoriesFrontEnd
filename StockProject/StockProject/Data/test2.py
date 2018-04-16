import csv
import webbrowser
url1 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=1NM560XCN7P79LTB&datatype=csv&outputsize=full&symbol="
with open('Book1.csv', 'r', newline='') as csvfile:
	for row in csvfile:
		url2 = row
		print(url1+url2)
		url = url1 + url2
		webbrowser.open_new(url1+url2)
#close the connection to the database.
print ("Done")