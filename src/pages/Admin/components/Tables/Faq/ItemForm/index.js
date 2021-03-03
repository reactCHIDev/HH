import React, { useState } from 'react'
import T from 'prop-types'
import styles from './formitem.module.scss'

const FormItem = (props) => {
  const { question, answer, id, closemodal, editFaqAC, createFaqAC, mode } = props

  const [questionText, setQuestion] = useState(question)
  const [answerText, setAnswer] = useState(answer)

  const onChangeQuestion = (e) => setQuestion(e.target.value)
  const onChangeAnswer = (e) => setAnswer(e.target.value)

  const onSubmit = () => {
    if (mode === 'create') createFaqAC({ question: questionText, answer: answerText })
    if (mode === 'edit') editFaqAC({ id, answer: answerText })
    closemodal()
  }

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.form}>
        <div className={styles.title}>Question</div>
        <textarea
          className={styles.textarea}
          name="question"
          rows="5"
          cols="60"
          value={questionText}
          onChange={onChangeQuestion}
        />
        {!questionText && <p>This field is required</p>}

        <div className={styles.title}>Answer</div>
        <textarea
          className={styles.textarea}
          name="answer"
          rows="10"
          cols="60"
          value={answerText}
          onChange={onChangeAnswer}
        />
        {!answerText && <p>This field is required</p>}

        <input
          className={styles.submit_btn}
          onClick={onSubmit}
          value="SAVE"
          disabled={!questionText || !answerText}
        />
      </div>
    </div>
  )
}

FormItem.propTypes = {
  question: T.string,
  answer: T.string,
}

export default FormItem
