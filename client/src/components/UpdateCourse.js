import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';

class UpdateCourse extends Component {
  state = {
    data: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  componentDidMount() {
    this.getCourseDetail();
    console.log(this.data)
  }

  getCourseDetail = () => {
    const id = this.props.match.params.id;
    console.log(id)
    axios.get(`http://localhost:5000/api/courses/${id}`)
    .then((response) => this.setState({data: response.data}))
    .catch(error => console.log('Error fetching course detail', error))
  }

  render() { 
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;


    console.log(this.data)
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
                                    value={this.title}
                                    onChange={this.change} />
                            </div>
                          <p>By Joe Smith</p>
                        </div>
                        
                        <div className="course--description">
                          <div>
                              <textarea 
                                  id="description" 
                                  name="description" 
                                  className="" 
                                  value={this.description}
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
                                    value={this.estimatedTime}
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
}
 
export default UpdateCourse;