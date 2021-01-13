import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';

class UpdateCourse extends Component {
  state = {
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
    const id = this.props.match.params.id;
    // console.log(id);
    axios.get(`http://localhost:5000/api/courses/${id}`)
    .then((response) => {
      console.log(response.data)
      this.setState({
        title: response.data.title,
        description: response.data.description,
        estimatedTime: response.data.estimatedTime,
        materialsNeeded: response.data.materialsNeeded,
        ownerFirstName: response.data.Owner.firstName,
        ownerLastName: response.data.Owner.lastName
    })})
    .catch(error => console.log('Error fetching course detail', error))
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
const { context } = this.props;
const authUser = context.authenticatedUser;

console.log(authUser)
    
    
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
    
    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      ownerFirstName,
      ownerLastName,
    } = this.state;
    
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      ownerFirstName,
      ownerLastName,
    }
    
    console.log(course) 
    
    if (course.title === '' || course.description === '') {
      console.log('Empty')
    } else {
      console.log('not empty')
    }
    
    
    
  }
  
  
  cancel = () => {
    this.props.history.push('/');
  }
}
 
export default UpdateCourse;