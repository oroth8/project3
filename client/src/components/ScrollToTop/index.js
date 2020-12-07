import {Component} from "react";
import { withRouter } from 'react-router-dom';

// Component for Earn/Quiz components that brings location back to top of window
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
  
    render() {
      return this.props.children
    }
  }
  
  export default withRouter(ScrollToTop)