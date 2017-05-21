/**
 * Created by ZE on 2017/05/21.
 */
import React from 'react'
import { connect } from 'react-redux'

const PageNav = ({
                   onNextPage,
                   onPrevPage,
                   selectedPage,
                   isFetching,
                   canBeNext,
                   canBePrev
                 }) => {

  return (
      <div>
        <p>Page:{selectedPage}</p>
        <button href="#"
                onClick={onPrevPage}
                disabled={isFetching || !canBePrev }>Prev
        </button>
        <button href="#" onClick={onNextPage}
                disabled={isFetching || !canBeNext}>Next
        </button>
      </div>
  )
}
export default PageNav;