/**
 * Created by ZE on 2017/05/17.
 */
import React, {Component} from 'react';

import './vertical-timeline'
import './vertical-timeline.css'
import axios from 'axios'
import marked from 'marked'
// import jQuery from 'jquery'
export default class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], page: 1, prev_page_url: null, next_page_url: null, querying: false};
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage = this.handlePrevPage.bind(this)
  }

  handleNextPage(e) {
    e.preventDefault()
    if (this.state.next_page_url) {
      const page = this.state.page + 1
      this.setState({page})
      this.query(page)
    } else {
      alert('no next page')
    }
  };

  handlePrevPage(e) {
    e.preventDefault();
    if (this.state.prev_page_url) {
      const page = this.state.page - 1
      this.setState({page})
      this.query(page)
    } else {
      alert('no prev page')
    }
  }

  page(number) {
    return `https://blog.classfunc.com/blogs?api&page=${number}`
  };

  query(page) {
    if (page >= 1) {
      this.setState({querying: true})
      axios.get(this.page(page))
          .then((res) => {
            this.setState({querying: false})
            // console.log(res);
            const pages = res.data;
            // console.log(pages);
            this.setState({posts: pages.data, next_page_url: pages.next_page_url, prev_page_url: pages.prev_page_url});
          })
    }
  }

  componentDidMount() {
    this.query(1)
  }

  render() {
    const h3Style = {margin: 0}
    const posts = this.state.posts;
    return (
        <div>
          <button onClick={this.handlePrevPage} disabled={!this.state.prev_page_url || this.state.querying}>PrevPage</button>
          <button onClick={this.handleNextPage} disabled={!this.state.next_page_url || this.state.querying}>NextPage</button>
          <div id="timeLine">
            {
              posts.length > 0 &&
              posts.map(function (p) {
                const body = marked(p.body);
                return (
                    <div className="vtimeline">
                      <div className="vtimeline-point">
                        <div className="vtimeline-icon"/>
                        <div className="vtimeline-block"><span className="vtimeline-date">{p.date}</span>
                          <div className="vtimeline-content">
                            <h3 style={h3Style}>{p.title}</h3>
                            <p dangerouslySetInnerHTML={ {__html: body} }>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                )
              })
            }
          </div>
        </div>
    )
  }
}