import { combineReducers } from 'redux'
import {
  REQUEST_POSTS, RECEIVE_POSTS,
  PREV_PAGE, NEXT_PAGE, SELECT_PAGE
} from '../actions'

const selectedPage = (state = 1, action) => {
  switch (action.type) {
    case PREV_PAGE:
      if (state > 1) {
        return state - 1;
      }
      return state = 1;
    case NEXT_PAGE:
      if (action.next_page_url) {
        return state + 1
      }
      return state;
    case SELECT_PAGE:
      return action.page;
    default:
      return state
  }
}

const page = (state = {
                isFetching: false,
                items: [],
                next_page_url: null,
                prev_page_url: null,
                lastUpdated: null,
                from: 0,
                to: 0
              }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        next_page_url: action.next_page_url,
        prev_page_url: action.prev_page_url,
        from: action.from,
        to: action.to
      }
    default:
      return state
  }
}

const rootReducers = combineReducers({ page, selectedPage, })

export default rootReducers;