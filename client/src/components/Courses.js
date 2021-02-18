import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import axios from  'axios'

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    }
  }

  componentDidMount() {
    this.getData();
  }

  // Get all course from the api backend
  getData = () => {
    axios.get('https://fullstackreactapp01.herokuapp.com/api/courses')
      .then((response)=> this.setState({data: response.data}))
      .catch(error => {
        if(error.response.status === 403) {
          this.props.history.push('/forbidden');
        } else if(error.response.status === 404) {
          this.props.history.push('/notfound');
        } else if(error.response.data === 500) {
          this.props.history.push('/error');
        } else {
          this.props.history.push('/error');
        }
      })
  }

  // Render course component
  render() { 
    // Render all Courses
    let courses = this.state.data.map( course => (
      
      <div className="grid-33" key={course.id}><NavLink className="course--module course--link" to={`/courses/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </NavLink>
      </div>
    ))


    return ( 
        <div className="bounds">
          {courses}
          <div className="grid-33"><NavLink className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </NavLink>
          </div>
        </div>
     );
  }
}
 
export default Courses;
