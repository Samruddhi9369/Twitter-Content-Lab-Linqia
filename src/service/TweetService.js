
//import Api from '@/service/Api'
import axios from 'axios'
let tweets = [];
export default {
    fetchTweets (tagName, resultCount=15, resultType) {
        let uri = 'search';
        
        let params = {
          tagName: tagName, 
          resultCount: resultCount, 
          resultType: resultType
        }
        //return Api().get(uri,{params: params})
        return axios.get(uri,{params: params})
    }
  }