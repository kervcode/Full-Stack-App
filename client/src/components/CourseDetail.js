import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {
    state = {
      id: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      ownerFirstName: '',
      ownerLastName: '',
      ownerEmailAddress: '',
    }
  
  // When Component mounted
  componentDidMount() {
    this.getCourseDetail();
  }
   
  getCourseDetail = () => {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${id}`)
    .then((response) => {
      this.setState({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        estimatedTime: response.data.estimatedTime,
        materialsNeeded: response.data.materialsNeeded,
        ownerFirstName: response.data.Owner.firstName,
        ownerLastName: response.data.Owner.lastName,  
        ownerEmailAddress: response.data.Owner.emailAddress
      })
    })
    .catch(error => {
      /**
       * this block catches error messages and redirect the user to 
       * a specific route according to which error message status code that occurs
       */
      if(error.response.status === 404) {
        this.props.history.push('/notfound')
      } else if(error.response.status === 403) {
        this.props.history.push('/forbidden')
      } else {
        this.props.history.push('/error')
      }
    })
    }
  render() { 
    const { context } = this.props;
    
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      ownerFirstName,
      ownerLastName,
      ownerEmailAddress
    } = this.state; 

  
    return ( 
      <div>
      <div className="actions--bar">
      
        {
          // CREATE LOGIC TO RENDER UPDATE AND DELETE BUTTON ONLY IF THERE IS AN AUTHENTICATED USER.
          context.authenticatedUser !== null && context.authenticatedUser.emailAddress === ownerEmailAddress ?
            <React.Fragment>
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to={`/Courses/${id}/update`}>Update Course</Link>
                  <button className="button" onClick={this.delete}>Delete Course</button>
                </span>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
            </React.Fragment>
          :
            <React.Fragment>
              <div className="bounds">
                <div className="grid-100">
                  <Link className="button button-secondary" to="/">Return to List</Link></div>
              </div>
            </React.Fragment>
        }
      

      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{title}</h3>
            <p>By { ownerFirstName} {ownerLastName}</p>
          </div>
          <div className="course--description">
              <ReactMarkdown>
                {description}
              </ReactMarkdown>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  <ReactMarkdown>
                    {materialsNeeded}
                  </ReactMarkdown>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
     );
  }
  
  // to delete course on the backend
  delete = () => {
    const { context } = this.props;    
    const authUser = context.authenticatedUser;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password;

    // destructuring value from state
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state; 

    // course payload
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    }

      /**
     * delete a course
     *
     * @param {course}  The course payload to delete.
     * @param {id} id of the course to delete.
     * @param {emailAddress} emailAddress of the authenticate user.
     * @param {password} password of the authenticate user
     * @return {promise} resolved value is either an array of errors 
     * (sent from the API if the response is 400), or an empty array (if the response is 201)
     */
    context.data.deleteCourse(course, id, emailAddress, password)
      .then( errors => {
          if(errors.message) {
            this.setState({ errors: errors.message });
          } else {
            console.log('Course delete successfully');
            this.props.history.push("/");
          }
      })
      .catch( err => {
        this.props.history.push('/error');
      })
    }
}
 
export default CourseDetail;