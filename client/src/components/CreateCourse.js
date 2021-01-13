import React, { Component} from 'react';
import Form from './Form'
import axios from 'axios'

export default class CreateCourse extends Component {
  state = {
      userId: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      
      errors: [],
    }  
  
    
 
  render() {    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
  
        // console.log(this.props)
    
        
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    
    console.log(authUser.firstName )
        
    return ( 
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
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
                        <p>By {authUser.firstName} {authUser.lastName}</p>
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
    } = this.state;
    
    // create new course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    }
    
    // console.log(context)
    // console.log(this.props)
    console.log(course)
    
    context.data.createCourse(course)
    .then( errors => {
      if (errors.message) {
        this.setState( { errors: errors.message })
      } else {
        this.props.history.push('/')
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }
  
  cancel = () => {
      this.props.history.push('/');
  }
}
