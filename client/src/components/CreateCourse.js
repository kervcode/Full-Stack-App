import React, { Component} from 'react';
import Form from './Form'

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
      errors
    } = this.state;
        
    const { context } = this.props;
    const authUser = context.authenticatedUser;
        
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
  
/**
 * this submit function triggers when the user clicks on the create course button 
 * on the create course page.
 * 
 * context component is destructured from this.props and from there emailAddress and the password of the user get extracted from 
 *  context to then use on the createCourse component as the credentials of the authenticated user. 
 */
  submit = () => {
   
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    
    // create new course
    const course = {
      title: title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded,
      userId: authUser.id
    }

      /**
     * create a new course
     *
     * @param {course}  The course payload to create.
     * @param {emailAddress} emailAddress of the authenticate user.
     * @param {password} password of the authenticate user
     * @return {promise} resolved value is either an array of errors 
     * (sent from the API if the response is 400), or an empty array (if the response is 201)
     */
    context.data.createCourse(course, emailAddress, password)
      .then(
        errors => {
          if(errors.message) {
            this.setState({ errors: errors.message })
          } else {
            console.log('Course created sussessfully');
            this.props.history.push("/")
          }
        }
      )
         /**
       * this block catches error messages and redirect the user to 
       * a specific route according to which error message status code that occurs
       */
      .catch( err => {
        console.log(err)
        this.props.history.push('/error');
      })
  }
  
  cancel = () => {
      this.props.history.push('/');
  }
}
