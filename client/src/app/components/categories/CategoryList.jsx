import React, { Component } from 'react';
import * as actions from '../../actions/categories';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class CategoryList extends Component {
  componentWillMount() {
    this.props.fetchCategories();

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // renderCategories(categories) {
  //    return categories.map((c) => {
  //       c = c.trim();
  //       return (
  //         <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
  //       );
  //    });
  // }

  renderCategories() {
    const categories = this.props.categories || [];

    return categories.map((category, i) => {
      return 
      <Link style={{color:'black'}} to={"categories/" + category._id}>
        <li key={i}>{ category.description }</li>
      </Link>
    })
  }

  render() {
    return (
      <div className="content users">
        <h1>Hello { this.user.firstname }</h1>
        <p>Here are auth protected categories! :)</p>
        <ul>
          { this.renderCategories() }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { categories: state.category.list };
}

export default connect(mapStateToProps, actions)(CategoryList);