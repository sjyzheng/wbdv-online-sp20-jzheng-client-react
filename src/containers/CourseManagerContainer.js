import React from "react";
import CourseHeadingComponent from "../components/courseList/CourseHeadingComponent";
import CourseTableComponent from "../components/courseList/CourseTableComponent";
import CourseGridComponent from "../components/courseList/CourseGridComponent";
import CourseService from "../services/CourseService";
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import CourseEditorComponent from "../components/courseEditor/CourseEditorComponent";


const courseService = new CourseService();

class CourseManagerContainer extends React.Component {
    date;

    state = {
        // layout: 'table',
        newCourseTitle: '',
        courses: [],
    }

    componentDidMount() {
        courseService.findAllCourses()
            .then(courses => {
                this.setState({
                    courses: courses
                })
            })
    }

    // toggle = () => {
    //     this.setState(prevState => ({
    //             layout: prevState.layout === 'table'? 'grid': 'table'
    //         })
    //     )
    // }

    deleteCourse = (courseToDelete) => {
        courseService.deleteCourse(courseToDelete._id)
            .then(() => {
                courseService.findAllCourses()
                    .then(courses => {
                        this.setState({
                            courses: courses
                        })
                    })
            })
    }

    addCourse = () => {
        this.date = new Date();
        this.state.newCourseTitle === ''? alert('Please Enter a Valid Course Title!'):
        courseService.createCourse({
            title: this.state.newCourseTitle,
            // editing: 'false',
            dateModified: this.date.getMonth()+1 + '/' + this.date.getDate() + '/' + this.date.getFullYear()
        }).then(() => {
            courseService.findAllCourses()
                .then(courses => {
                    this.setState({
                        courses: courses,
                        newCourseTitle: '',
                    })
                })
        })
    }

    updateFormState = (event) => {
        this.setState({
            newCourseTitle: event.target.value
        })
    }

    editCourse = (course) => {
        this.setState(prevState => ({
                courses: prevState.courses.map (crs => {
                    crs.editing = course._id === crs._id;
                    return crs
                })
            })
        )
    }

    updateCourse = (course) => {
        this.date = new Date();
        course.dateModified =  this.date.getMonth()+1 + '/' + this.date.getDate() + '/' + this.date.getFullYear();
        courseService.updateCourse(course._id, course)
            .then(() => {
                courseService.findAllCourses()
                    .then(courses => {
                            this.setState({
                                courses: courses
                            })
                    })
            })
    }


    render() {
        return (
            <div className="container-fluid p-0">
                <Router>
                    <Redirect from="/" to="/table"/>
                    <Route path="/table" render={(props) =>
                        <div>
                            <CourseHeadingComponent
                                updateFormState = {this.updateFormState}
                                newCourseTitle = {this.state.newCourseTitle}
                                addCourse = {this.addCourse}/>
                            <CourseTableComponent
                                {...props}
                                deleteCourse={this.deleteCourse}
                                editCourse={this.editCourse}
                                updateCourse={this.updateCourse}
                                // toggle={this.toggle}
                                courses={this.state.courses}/>
                        </div>
                    }/>

                    <Route path="/grid" render={(props) =>
                        <div>
                            <CourseHeadingComponent
                                updateFormState = {this.updateFormState}
                                newCourseTitle = {this.state.newCourseTitle}
                                addCourse = {this.addCourse}/>
                            <CourseGridComponent
                                {...props}
                                deleteCourse={this.deleteCourse}
                                editCourse={this.editCourse}
                                updateCourse={this.updateCourse}
                                toggle={this.toggle}
                                courses={this.state.courses}/>
                        </div>
                    }/>

                    <Route path="/courses/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId" component={CourseEditorComponent}/>
                </Router>



                {/*{this.state.layout === 'grid' && <CourseGridComponent*/}
                {/*    deleteCourse={this.deleteCourse}*/}
                {/*    editCourse={this.editCourse}*/}
                {/*    updateCourse={this.updateCourse}*/}
                {/*    toggle={this.toggle}*/}
                {/*    courses={this.state.courses}/>}*/}
                {/*{this.state.layout === 'table' && <CourseTableComponent*/}
                {/*    deleteCourse={this.deleteCourse}*/}
                {/*    editCourse={this.editCourse}*/}
                {/*    updateCourse={this.updateCourse}*/}
                {/*    toggle={this.toggle}*/}
                {/*    courses={this.state.courses}/>}*/}
            </div>
        )
    }
}


export default CourseManagerContainer