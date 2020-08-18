/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params={}, headers={}){
    return new Promise((resolve, reject) => {
    this.$axios.get(url,{
     params: params,
     headers: headers
    })
    .then(response => {
     resolve(response.data);
    })
    .catch(err => {
     reject(err)
    })
    })
   }
   /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url, data = {}){
    return new Promise((resolve, reject) => {
    this.$axios.post(url, data)
     .then(response => {
     resolve(response.data);
     }, err => {
     reject(err)
     })
    })
}