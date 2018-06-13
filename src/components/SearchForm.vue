<template>
  <div id="searchForm">
    <div class="form-container">
      <form v-on:submit="formSubmit">
        <div class="form-row">
              <div class="form-group">
                  <label for="tagName">Hashtags</label>
                  <input type="text" class="form-control" v-model="tagName" placeholder="Enter Hashtags">
                  <span class="form-small-text">Example: #game #nba</span>
              </div>
              <div class="form-group">
                  <label for="resultCount">Number of Results</label>
                  <input type="number" class="form-control" v-model="resultCount" placeholder="Enter Number of Results (1-100)">
                  <span class="form-small-text">Default count: 15</span>
              </div>
              <div class="form-group">
                  <label for="resultType">Hashtags</label>
                  <select class="form-control" v-model="resultType">
                      <option value="popular">Popular</option>
                      <option value="recent">Most Recent</option>
                      <option value="mixed">Mixed</option>
                  </select>
              </div>
        </div>
        <div class="form-row">
          <div class="form-group fl-right">
            <button type="submit" class="btn-submit" value="Search">Search</button>
          </div>
        </div>
      </form>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'searchForm',
  data () {
    return {
      tagName: '',
      resultCount: '',
      resultType: 'popular'
    }
  },
  methods: {
    formSubmit(e) {
      if(validateHashtag(this.tagName) && validateCount(this.resultCount)){
        if(this.resultCount > 100){
          this.resultCount = 100;
        }
        this.$emit('formSubmit', this.tagName, this.resultCount, this.resultType)
      }
        
      e.preventDefault()
    }
  }
}

function validateHashtag(tagName) {
      let hashtags = tagName.split(' ');

      for (let i = 0; i < hashtags.length; i++) {
        // hashtag must be longer than 1 character or must start with #
        if (hashtags[i].length <= 1 || hashtags[i][0] !== '#') {
          alert('Hashtag(s) must be longer than 1 character or must start with #');
          return false;
        } 
        
        // take out # to evaluate the value
        let value = hashtags[i].slice(1);
        
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value)) {
          // hashtag contains special characters
          alert('Hashtag is invalid');
          return false;
        } else if (/[0-9]/g.test(value[0])) {
          alert('Hashtag is invalid');
          return false;
        }
      }
      return true;
    }

function validateCount(resultCount) {
  if(resultCount < 0){
    alert("Please enter a valid number for count");
    return false;
  }
  return true;
}
</script>

<style>

</style>
