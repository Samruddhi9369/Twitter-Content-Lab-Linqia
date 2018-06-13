
import Api from '@/service/Api'
let tweets = [];
export default {
    fetchTweets (tagName, resultCount, resultType) {
        console.log(tagName);
        let uri = 'search';
        
        let params = {
          tagName: tagName, 
          resultCount: resultCount, 
          resultType: resultType
        }
        return Api().get(uri,{params: params})
    }
  }