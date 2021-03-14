/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Table, Button, Space } from 'antd'
import { getFaqAC, createFaqAC, deleteFaqAC, editFaqAC } from 'actions/admin'
import Modal from 'components/UniversalModal'
import { connect } from 'react-redux'
import FormItem from './ItemForm'

const FaqTable = ({ faq, requesting, getFaqAC, createFaqAC, deleteFaqAC, editFaqAC }) => {
  const [visible, setVisible] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [id, setId] = useState('')
  const [mode, setMode] = useState('')

  useEffect(() => {
    getFaqAC()
    // eslint-disable-next-line
  }, [])

  const createFAQ = () => {
    setMode('create')
    setQuestion('')
    setAnswer('')
    setId('')
    setVisible(true)
  }

  const editFAQ = (data) => {
    setMode('edit')
    setQuestion(data.question)
    setAnswer(data.answer)
    setId(data.id)
    setVisible(true)
  }

  const deleteFAQ = (id) => {
    deleteFaqAC(id)
  }

  const closeModal = () => setVisible(false)

  const columns = [
    {
      title: 'question',
      dataIndex: 'question',
      key: 'question',
      width: '70px',
    },
    {
      title: 'answer',
      dataIndex: 'answer',
      key: 'answer',
      width: '200px',
    },
    {
      title: 'actions',
      key: 'actions',
      width: '30px',
      render: (text, record) => (
        <>
          <button
            type="button"
            style={{ display: 'block', width: 70, marginBottom: 3 }}
            onClick={() => editFAQ(record)}
          >
            Edit
          </button>
          <button
            type="button"
            style={{ display: 'block', width: 70, marginBottom: 3 }}
            onClick={() => deleteFAQ(record.id)}
          >
            Remove
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={createFAQ}>Add FAQ item</Button>
      </Space>
      <Table columns={columns} dataSource={faq} scroll={{ x: 768 }} loading={requesting} sticky />
      {visible && (
        <Modal closeFunc={closeModal} mode="dark">
          <FormItem
            editFaqAC={editFaqAC}
            createFaqAC={createFaqAC}
            question={question}
            answer={answer}
            id={id}
            mode={mode}
          />
        </Modal>
      )}
    </>
  )
}

FaqTable.propTypes = {
  faq: T.shape(),
  requesting: T.bool,
  getFaqAC: T.func,
  createFaqAC: T.func,
  deleteFaqAC: T.func,
  editFaqAC: T.func,
}

export default connect(({ admin: { faq, requesting } }) => ({ faq, requesting }), {
  getFaqAC,
  createFaqAC,
  deleteFaqAC,
  editFaqAC,
})(FaqTable)
