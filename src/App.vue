<template>
  <div id="app">
    <h1>Twitter Content Lab</h1>
    <SearchForm v-on:formSubmit="searchTweet"></SearchForm>
    <SearchOutput v-bind:tweets="tweets" v-on:sortTweets="sortTweet"></SearchOutput>
  </div>
</template>

<script>
import axios from 'axios';
import TweetService from './service/TweetService'
import SearchForm from './components/SearchForm'
import SearchOutput from './components/SearchOutput'


export default {
  name: 'app',
  components: {
    SearchForm,
    SearchOutput
  },
  data: function(){
    return {
      tweets:[]
    }
  },
  methods: {
    async searchTweet(tagName, resultCount, resultType) {
      const response =  await TweetService.fetchTweets(tagName, resultCount, resultType)
      let prev_tweets = response.data.slice()
        prev_tweets.sort((a, b) => {
          return b.favorites - a.favorites;
        });
      this.tweets = prev_tweets
    },
    sortTweet(prev_tweets, sortBy) {
      if (sortBy === 'favorites') {
        prev_tweets.sort((a, b) => {
          return b.favorites - a.favorites;
        });
      } else if (sortBy === 'retweets') {
        prev_tweets.sort((a, b) => {
          return b.retweets - a.retweets;
        });
      } else {
        prev_tweets.sort((a, b) => {
          return b.id - a.id;
        });
      }
      this.tweets = prev_tweets;
    }
  }
}
</script>

<style>
@import url('./assets/styles/style.css');
</style>
