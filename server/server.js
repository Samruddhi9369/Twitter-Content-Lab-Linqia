const express = require('express')
const path = require('path')
const env = require('dotenv')
const Twitter = require('twitter')
const bodyParser = require('body-parser')
const app = express()
env.config()

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname + '/../dist')))

app.get('/search', function (req, res) {
    let params = {
      q: req.query.tagName,
      count: req.query.resultCount,
      resultType: req.query.resultType,
      tweet_mode: 'extended' // to get full text from Search API
    };
    console.log(params)
    client.get('search/tweets', params, function (error, tweets, response) {
        if (error) {
          console.log(error)
        }
        values = tweets['statuses'].map( tweet => {
          return  {
              id:tweet.id,
              created_at : tweet.created_at,
              text : tweet.full_text,
              retweets : tweet.retweet_count,
              favorites : tweet.favorite_count,
              name: tweet.user.name,
              handle: tweet.user.screen_name
          }
      });
        return res.json(values);
      })
})

app.get('/', function(req, res){
  res.sendFile('index.html');
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Running on 4000')
})
