import React, { Component } from 'react';
import { connect } from 'react-redux'
import Posts from './components/Posts'
import PageNav from './components/PageNav'
import { nextPage, prevPage, fetchApiPage } from './actions'
import VerticalTimeline from './components/VerticalTimeline/TimeLine'
class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchApiPage(1))
    // const {dispatch, page} = this.props;
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage = this.handlePrevPage.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPage !== this.props.selectedPage) {
      const { dispatch, selectedPage } = nextProps;
      dispatch(fetchApiPage(selectedPage))
    }
  }

  handleNextPage(e) {
    e.preventDefault()
    const { next_page_url } = this.props;
    if (next_page_url) {
      this.props.dispatch(nextPage(next_page_url))
    }
  }

  handlePrevPage(e) {
    e.preventDefault()
    const { prev_page_url } = this.props;
    if (prev_page_url) {
      this.props.dispatch(prevPage(prev_page_url))
    }
  }

  render() {
    const { selectedPage } = this.props;
    const {
      isFetching, items, prev_page_url, next_page_url,
      from, to
    } = this.props.page;
    const canBeNext = next_page_url !== null;
    const canBePrev = prev_page_url !== null;
    return (
        <div className="App">
          {/*<PageNav onNextPage={this.handleNextPage}*/}
                   {/*onPrevPage={this.handlePrevPage}*/}
                   {/*selectedPage={selectedPage}*/}
                   {/*isFetching={isFetching}*/}
                   {/*canBeNext={canBeNext}*/}
                   {/*canBePrev={canBePrev}*/}
          {/*/>*/}
          {/*<span hidden={!isFetching}>Loading...</span>*/}
          {/*<div style={{ opacity: isFetching ? 0.5 : 1 }}>*/}
            {/*<Posts items={items} from={from} to={to}/>*/}
          {/*</div>*/}
          {/*<UploadComponent />*/}
          <VerticalTimeline />
          {/*any else component*/}

        </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { page, selectedPage, from, to } = state;
  return {
    selectedPage,
    from, to,
    page,
    next_page_url: page.next_page_url,
    prev_page_url: page.prev_page_url,
    lastUpdated: page.lastUpdated
  }
}
export default connect(mapStateToProps)(App)
