import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

class CourseDetail extends Component {
  constructor({props}) {
    super({props});
    this.state = {
      data : [],
      // id: this.props.match.params.id
    }
  }
  
  // When Component mounted
  componentDidMount() {
    this.getCourseDetail();
  }
   
  getCourseDetail = () => {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${id}`)
    .then((response) => this.setState({data: response.data}))
    .catch(error => console.log('Error fetching course detail', error))
      
  }
  render() { 
    // console.log(this.props.match.params.id)
    const course = this.state.data
    console.log(course.Owner)
    return ( 
      <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100"><span>
            <Link className="button" to={`/Courses/${course.id}/Update`}>Update Course</Link>
            <Link className="button" to="#">Delete Course</Link></span>
            <Link className="button button-secondary" to="/">Return to List</Link></div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            <p>By {}</p>
          </div>
          <div className="course--description">
          {course.description}
             </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{course.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  {course.materialsNeeded}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
     );
  }
}
 
export default CourseDetail;