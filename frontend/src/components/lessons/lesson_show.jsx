//lesson_show.jsx
import React from "react";
import LeftSidebar from "../left_sidebar/left_sidebar_container";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

class LessonShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      quizzes: this.props.quizzes,
      users: this.props.users
    }
  }

  componentDidMount() {
    const { fetchLesson, fetchQuiz, fetchQuestions, lessonId, fetchUsers } = this.props;
    fetchLesson(lessonId)
      .then(lesson => fetchQuiz(lesson.lesson._id))
      .then(quiz => fetchQuestions(quiz.quiz._id))
      .then(() => fetchUsers())
      .then(() => {
        console.log(this.state);
        // debugger;
      })
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    this.setState({ quizzes: nextProps.quizzes, questions: nextProps.questions, users: nextProps.users })
    // console.log(nextProps.questions)
    // console.log(nextProps.quizzes)
  }

  renderLessonContent() {

  }
  //{this.props.users[this.props.lesson.authorId].email}
  render() {
    // console.log(this.state.questions.length);
    console.log(this.props.currentUserId);

    // console.log(this.state.users);
    let currentUserEmail;
    if (this.state.users) Object.values(this.state.users).forEach(user => { if (user._id === this.props.lesson.authorId) currentUserEmail = user.email });
    console.log(currentUserEmail);
    if (!this.props.lesson) {
      return null
    }
    else {
      let quizId, questionsLength;
      if (this.state.quizzes) quizId = Object.keys(this.state.quizzes)[0];
      if (this.state.questions) questionsLength = Object.keys(this.state.questions).length;
      const { currentUserId } = this.props;
      const authorId = this.props.lesson.authorId;
      const takeQuiz = this.state.questions.length > 0 ? <Link className="lesson-quiz-redirect-button" to={`/quiz/${quizId}`}>Take Quiz</Link> : <></>;

      // debugger;
      return (
        <div className="lesson-show-wrap">
          <LeftSidebar />

          {this.props.lesson ?

            (
              <div className="lesson-show-container ql-editor">

                <div className="lesson-show-title">{this.props.lesson.title} <span className='author' >by {currentUserEmail}</span> </div>

                <div id="lesson-html-content">{parse(this.props.lesson.content)}</div>

                {currentUserId === authorId ? (
                  <>
                    <Link to={`/lesson/${this.props.match.params.lessonId}/edit`}><button>Edit Lesson</button></Link>
                    <div className="lesson-quiz-redirect-wrap">
                      <Link className="lesson-quiz-redirect-button" to={`/quiz/${quizId}/edit`}>Edit Quiz</Link>
                    </div>
                  </>)
                  :
                  // {takeQuiz}
                  <button>Take Quiz Button</button>
                }
              </div>
            )
            : null
          }
        </div>

      )



    }
  }
}

export default LessonShow; 