import React from "react";

import {Provider} from "react-redux";
import moduleReducer from "../reducers/moduleReducer";
import lessonReducer from "../reducers/lessonReducer";
import topicReducer from "../reducers/topicReducer";
import widgetReducer from "../reducers/widgetReducer";
import ModuleListContainer from "./ModuleListContainer";
import {combineReducers, createStore} from "redux";
import LessonTabsContainer from "./LessonTabsContainer";
import TopicPillsContainer from "./TopicPillsContainer";
import WidgetListContainer from "./WidgetListContainer";
import CourseEditorNavBarComponent from "../components/courseEditor/CourseEditorNavBarComponent";

const rootReducer = combineReducers({
    moduleReducer,
    lessonReducer,
    topicReducer,
    widgetReducer,
})

const store = createStore(rootReducer);

class CourseEditorContainer extends React.Component {
    state = {
        courseTitle: this.props.location.state.courseTitle,
        layout: this.props.location.state.layout
    };

    render() {
        return (
            <Provider store={store}>
                <div>
                    <div className="container-fluid p-0">
                        <CourseEditorNavBarComponent
                            courseTitle = {this.state.courseTitle}
                            layout = {this.state.layout}
                        />
                    </div>

                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-3">
                                <ModuleListContainer
                                    courseId = {this.props.match.params.courseId}
                                    courseTitle = {this.state.courseTitle}
                                    layout = {this.state.layout}
                                    params = {this.props.match.params}
                                    history = {this.props.history}/>

                            </div>
                            <div className="col-9">
                                <div className="my-2">
                                    <LessonTabsContainer
                                        courseId = {this.props.match.params.courseId}
                                        moduleId = {this.props.match.params.moduleId}
                                        courseTitle = {this.state.courseTitle}
                                        layout = {this.state.layout}
                                        params = {this.props.match.params}
                                        history = {this.props.history}/>

                                </div>

                                <div>
                                    <TopicPillsContainer
                                        courseId = {this.props.match.params.courseId}
                                        moduleId = {this.props.match.params.moduleId}
                                        lessonId = {this.props.match.params.lessonId}
                                        courseTitle = {this.state.courseTitle}
                                        layout = {this.state.layout}
                                        params = {this.props.match.params}
                                        history = {this.props.history}/>
                                </div>
                                <div>
                                    {this.props.match.params.topicId !== undefined &&
                                    <WidgetListContainer
                                        courseId = {this.props.match.params.courseId}
                                        moduleId = {this.props.match.params.moduleId}
                                        lessonId = {this.props.match.params.lessonId}
                                        topicId = {this.props.match.params.topicId}
                                        courseTitle = {this.state.courseTitle}
                                        layout = {this.state.layout}
                                        params = {this.props.match.params}
                                        history = {this.props.history}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}
export default CourseEditorContainer