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
      })
    })
    .catch(error => {
        if(error.response.status === 404) {
          this.props.history.push('/notfound')
        }
      })
    }
  render() { 
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      ownerFirstName,
      ownerLastName,
    } = this.state; 

  
    return ( 
      <div>
      <div className="actions--bar">
      
        {
          // CREATE LOGIC TO RENDER UPDATE AND DELETE BUTTON ONLY IF THERE IS AN AUTHENTICATED USER.
          authUser ?
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

  delete = () => {
    const { context } = this.props;    
    const authUser = context.authenticatedUser;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password;

    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state; 

    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    }

    context.data.deleteCourse(course, id, emailAddress, password)
      .then( errors => {
          if(errors.message) {
            this.setState({ errors: errors.message })
          } else {
            console.log('Course delete sussessfully');
            this.props.history.push("/")
          }
      })
      .catch(
        error => {
          if(error.response) {
            this.props.history.push('/notfound')
          }
        }
      )
  }
}
 
export default CourseDetail;