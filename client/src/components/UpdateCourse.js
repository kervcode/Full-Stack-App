import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';

class UpdateCourse extends Component {
  state = {
    courseId: '',
    userId: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    ownerFirstName: '',
    ownerLastName: '',
    errors: [],
  }

  componentDidMount() {
    this.getCourseDetail();
  }

  /**
   * use axios to submit a get request for a course by it's ID
   * then set the response data to the state object
   */
  getCourseDetail = () => {

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const currentUserEmail = authUser.emailAddress;
    // console.log("Context:", context);
    const id = this.props.match.params.id;
  
    
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((response) => {

        const ownerEmail = response.data.Owner.emailAddress;

        if (ownerEmail !== currentUserEmail) {
          this.props.history.push('/forbidden')
        } else {
        this.setState({
          userId: response.data.Owner.id,
          title: response.data.title,
          description: response.data.description,
          estimatedTime: response.data.estimatedTime,
          materialsNeeded: response.data.materialsNeeded,
          ownerFirstName: response.data.Owner.firstName,
          ownerLastName: response.data.Owner.lastName
        });
      }
    })
    .catch(error => {
      if(error.response.status === 404) {
        this.props.history.push('/notfound')
      }
    })
    
  }

  render() { 
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      ownerFirstName,
      ownerLastName,
      errors
    } = this.state;
    
    
/**
 * Render an update form that allows user the user a course that he owns
 */    
    return ( 
      <div className="bounds course--detail">
        <h1>Update Course</h1>
          <div>
            <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
                <React.Fragment>
                  <div>
                      <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                              <input 
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..."
                                    defaultValue={title}
                                    onChange={this.change} />
                            </div>
                          <p>By {ownerFirstName} {ownerLastName}</p>
                        </div>
                        
                        <div className="course--description">
                          <div>
                              <textarea 
                                  id="description" 
                                  name="description" 
                                  className="" 
                                  value={description}
                                  onChange={this.change}
                                  placeholder="Course description...">                                  
                              </textarea>
                            </div>
                        </div>
                      </div>
                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <div>
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text" 
                                    className="course--time--input"
                                    placeholder="Hours" 
                                    defaultValue={estimatedTime}
                                    onChange={this.change}                                   
                                  />
                              </div>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <div>
                                  <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded" 
                                    className="" 
                                    placeholder="List materials..."
                                    value={materialsNeeded}
                                    onChange={this.change}
                                  ></textarea>
                                </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                </React.Fragment>
              )  
            }
            />
          </div>
      </div>
    );
  }
  
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }
  
  submit = () => {  
    const { context } = this.props;    
    const authUser = context.authenticatedUser;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    
    const {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    
    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    }
    
    const id = this.props.match.params.id;
    
    context.data.updateCourse(course, id, emailAddress, password)
      .then( errors => {
        if(errors){
          if(errors.message) {
            this.setState({ errors: errors.message })
        }
            console.log('Course updated sussessfully');
            this.props.history.push("/")
        }
      })
      .catch(error => {
        if(error.response) {
          this.props.history.push('/notfound')
        }
      })
    }
    
    
    
  
  
  
  cancel = () => {
    this.props.history.go(-1);
  }
}
 
export default UpdateCourse;