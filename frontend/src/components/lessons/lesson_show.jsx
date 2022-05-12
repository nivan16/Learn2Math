import React from "react";
import LeftSidebar from "../left_sidebar/left_sidebar";
import parse from 'html-react-parser';

class LessonShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() { 
    this.props.fetchLesson(this.props.lessonId).then((res) => {
      console.log(res);
    }); 
  }

  renderLessonContent(){

  }

  render(){


    
    return (
      <div className="lesson-show-wrap">
        <LeftSidebar />
          
        {this.props.lesson ? 
        
          (
            <div className="lesson-show-container ql-editor">
              <div>
                <div className="lesson-show-category"> {this.props.lesson.category}</div>
              </div>

              <div className="lesson-show-title">{this.props.lesson.title} </div>
          
              <div id="lesson-html-content">{parse(this.props.lesson.content)}</div>

            </div> 
          )
          : null
        }
      </div>
  
    )

  }
}

export default LessonShow; 