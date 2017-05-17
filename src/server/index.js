/**
 * Created by ZE on 2017/05/14.
 */
import axios from 'axios'
import * as server_constants from './constants'

export function token() {
  if (!window._token) {
    axios.get(server_constants.server_root_url + 'token')
        .then(function (res) {
          console.log(res);
          window._token = res.data;
          document.querySelector('meta[name="token"]').setAttribute("content", res.data);

          return res.data;
        })
        .catch(function (err) {
          console.log(err)
        });
  }
  return window._token;
}


export function root_url(url = '') {
  return server_constants.server_root_url + url
}