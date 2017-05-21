/**
 * Created by ZE on 2017/05/21.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { BLOG_URL } from '../constants'
import md from 'marked'
let html,body;
const Posts = ({ items, from, to }) => (
    <ul type="none">
      {
        items.map((item, index) => {
          from = index === 0 ? from : from + 1;
          html = md(item.body).substring(0, 100);
          {/*body = md(item.body.substring(0,100))*/}
          return (
              <li key={item.id} style={{
                backgroundColor: 'rgb(139, 219, 70)',
              }}>
                <a href={`${BLOG_URL}/${item.id}`}
                   title={body}>
                  <p>{from}.{item.title}</p>
                </a>
                <div dangerouslySetInnerHTML={{ __html: html }}
                     style={{ paddingLeft: 10,paddingBottom:10 }}
                />
              </li>
          )
        })
      }
    </ul>
)

Posts.propTypes = {
  items: PropTypes.array.isRequired
}

export default Posts;
