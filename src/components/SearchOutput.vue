<template>
  <div id="searchOutput">
    <div class="tweet-container">
      <div class="form-row">
      <h2 class="fl-left">Tweets</h2>
        <div class="form-group fl-right">
          <label for="sortBy">Sort By</label>
          <select class="form-control" v-model="sortBy" v-on:change="sortTweets">
            <option value="favorites">Most Favorited</option>
            <option value="retweets">Most Retweeted</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>
      <div class="clear"></div>
      <ul>
          <li v-for="tweet in tweets" :key="tweet.id" class="tweet-card">
          <div class="tweet-header">
          <span class="tweet-name">{{ tweet.name }}</span>  <a :href="'http://www.twitter.com/@'+tweet.handle">@{{ tweet.handle }}</a> <span class="tweet-date">{{ tweet.created_at.split(' ').slice(0,4).join(' ') }}</span></div>
          <p>{{ tweet.text }}</p>
          <div class="">Retweets:{{ tweet.retweets }} Favourites:{{ tweet.favorites }}</div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchOutput',
  props:['tweets'],
  data () {
    return {
      sortBy: 'favorites'
    }
  },
  watch: {
    sortBy(newValue){
      this.$emit('selectedSortValue',newValue);
    }
  },
  methods: {
    sortTweets(e) {
      this.$emit('sortTweets', this.tweets, this.sortBy)
      e.preventDefault()
    }
  }
}
</script>

<style>
</style>