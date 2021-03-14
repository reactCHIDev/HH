import React, { useEffect } from 'react'
import cls from 'classnames'
import { Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getFaqAC } from 'actions/admin'
import { useDispatch, useSelector } from 'react-redux'
import styles from './faq.module.scss'
import './faq.less'

const FAQSection = () => {
  const dispatch = useDispatch()
  const faq = useSelector((state) => state.admin.faq)

  useEffect(() => {
    dispatch(getFaqAC())
    // eslint-disable-next-line
  }, [])

  const { Panel } = Collapse

  return (
    <>
      <p id="faqanchor" className={styles.faq_heading}>
        Frequently Asked Questions
      </p>
      <section className={cls(styles.section_faq, 'faq')}>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIconPosition="right"
          expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 45 : 0} />}
        >
          {faq.map((f) => (
            <Panel header={f.question} key={f.id} className="site-collapse-custom-panel">
              <p>{f.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </section>
    </>
  )
}

export default FAQSection
