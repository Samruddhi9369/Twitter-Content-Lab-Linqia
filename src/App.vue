<template>
  <div id="app">
    <h1>Twitter Content Lab</h1>
    <SearchForm v-on:formSubmit="searchTweet"></SearchForm>
    <SearchOutput v-bind:tweets="tweets" v-on:sortTweets="sortTweet" @selectedSortValue="changeSortBy"></SearchOutput>
  </div>
</template>

<script>
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
      tweets:[],
      sortBy:'favorites'
    }
  },
  methods: {
    changeSortBy(value){
			this.sortBy = value;
		},
    async searchTweet(tagName, resultCount, resultType) {
      const response =  await TweetService.fetchTweets(tagName, resultCount, resultType)
      let prev_tweets = response.data.slice()
      let sortBy = this.sortBy
      this.sortTweet(prev_tweets, sortBy)
    },
    // sortTweet(prev_tweets, sortBy) {
    //   if (sortBy === 'favorites' || sortBy === 'retweets') {
    //     prev_tweets.sort((a, b) => {
    //       return b.sortBy - a.sortBy;
    //     });
    //   } else {
    //     prev_tweets.sort((a, b) => {
    //       return b.id - a.id;
    //     });
    //   }
    //   this.tweets = prev_tweets;
    //   this.sortBy = sortBy;
    // }

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
      this.sortBy = sortBy;
    }
  }
}
</script>

<style>
@import url('./assets/styles/style.css');
</style>
