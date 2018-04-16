import datetime
from datetime import date
import csv
import os
from os.path import isfile, join
import glob
import MySQLdb

path = 'E:/Rutgers/CS 526/Project/Django/StockProject/StockProject/Data/daily_ADS.csv'
mydb = MySQLdb.connect(host='localhost',
    user='root',
    passwd='password',
    db='user_info')
cursor = mydb.cursor()

insert_stmt = ("INSERT INTO stockstories_historicaldata(organization, date, open, high, low, close, volume) VALUES (%s, %s, %s, %s, %s, %s, %s)")
print(insert_stmt)
with open(path, newline='') as csvfile:
	reader = csv.reader(csvfile)
	next(reader)
	for row in reader:
		cursor.execute(insert_stmt, row)
	print("Process complete!")