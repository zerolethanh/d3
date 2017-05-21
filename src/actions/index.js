import axios from 'axios'
import { BLOG_URL } from '../constants'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREV_PAGE = 'PREV_PAGE'
export const SELECT_PAGE = 'SELECT_PAGE'


export function nextPage(next_page_url) {
  return {
    type: NEXT_PAGE,
    next_page_url
  }
}
export function selectPage(page) {
  return {
    type: SELECT_PAGE,
    page
  }
}
export const prevPage = () => ({
      type: PREV_PAGE
    }
)

export const requestPosts = (page) => (
    {
      type: REQUEST_POSTS,
      page
    }
)
export const receivePosts = (page, json) => (
    {
      type: RECEIVE_POSTS,
      page,
      items: json.data,
      next_page_url: json.next_page_url,
      prev_page_url: json.prev_page_url,
      receivedAt: new Date(),
      from: json.from,
      to: json.to
    }
)

export function fetchApiPage(page) {
  return function (dispatch, getState) {
    dispatch(requestPosts(page))
    axios.get(`${BLOG_URL}?api&page=${page}`)
        .then(res => {
          const json = res.data;
          dispatch(receivePosts(page, json))
        })
  }
}