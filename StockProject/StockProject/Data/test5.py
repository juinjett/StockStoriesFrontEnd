import twitter
api = twitter.Api(consumer_key='PeYnBqYfF7Em1qmqM1taXM6Ds',
                      consumer_secret='7uo4fvgWPJdRTuVZSMsFeqaiORoVaOA8QsYmTwGQbvt56SmyWY',
                      access_token_key='929103145-d3zFIoFPeGuD6hdGoacLWGKoV1DcyvYUNzqdxfkY',
                      access_token_secret='PPxuF3PuNBsDs4D8LPc1PAsuGZi7ap9N7Gy6RpIJQYFa2')
search = api.GetSearch("APPL") # Replace happy with your search
for i in range(1,10):
    print(tweet.id, tweet.text)