import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import instaIcon from 'assets/icons/svg/hh.svg'
import fbIcon from 'assets/icons/svg/fb.svg'
import hhIcon from 'assets/icons/svg/insta.svg'
import Heading from '../../components/heading'
import styles from './socials.module.scss'

const Socials = (props) => {
  const {
    properties: { value },
    onSubmit,
  } = props

  const [curHHValue, setHHValue] = useState(value[0])
  const [curFBValue, setFBValue] = useState(value[1])
  const [curInstaValue, setInstaValue] = useState(value[2])

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  const fb = useRef()
  const insta = useRef()

  useEffect(() => {
    setHHValue(value[0])
    setFBValue(value[1])
    setInstaValue(value[2])
  }, [value])

  const fixedText = ['www.', 'www.facebook.com/', 'www.instagram.com/']
  const setters = [setHHValue, setFBValue, setInstaValue]

  const onChange = (e) => {
    const { value, id } = e.target
    if (value.substring(0, fixedText[id].length) === fixedText[id]) setters[id](value)
  }

  const submitData = {
    socialURL: [curHHValue, curFBValue, curInstaValue],
  }

  return (
    <div className={styles.container}>
      <Heading category="Contact info (not-public)" name="Social / Website url" />
      <form className={styles.form} onSubmit={handleSubmit(() => onSubmit(submitData))}>
        <div className={styles.input_wrapper}>
          <input
            name="hh"
            placeholder="url"
            id={0}
            value={curHHValue}
            type="text"
            onChange={onChange}
            ref={register({
              /* pattern: {
                value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                message: 'Invalid name symbols',
              }, */
            })}
          />
          {errors?.hh?.type === 'required' && <p>This field is required</p>}
          {errors?.hh?.type === 'pattern' && <p>Invalid symbols or format</p>}
          <img className={styles.icon} src={hhIcon} alt="ico" />
          {/*  {
            <button type="button" className={styles.next} onClick={() => fb.current.focus()}>
              {'>'}
            </button>
          } */}
        </div>

        <div className={styles.input_wrapper}>
          <input
            name="fb"
            placeholder="url"
            id={1}
            value={curFBValue}
            type="text"
            onChange={onChange}
            ref={(e) => {
              fb.current = e
              register(e, {
                pattern: {
                  value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                  message: 'Invalid name symbols',
                },
              })
            }}
          />
          {errors?.fb?.type === 'required' && <p>This field is required</p>}
          {errors?.fb?.type === 'pattern' && <p>Invalid symbols or format</p>}
          <img className={styles.icon} src={fbIcon} alt="ico" />

          {/* {
            <button type="button" className={styles.next} onClick={() => insta.current.focus()}>
              {'>'}
            </button>
          } */}
        </div>

        <div className={styles.input_wrapper}>
          <input
            name="insta"
            placeholder="url"
            id={2}
            value={curInstaValue}
            type="text"
            onChange={onChange}
            ref={(e) => {
              insta.current = e
              register(e, {
                pattern: {
                  value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                  message: 'Invalid name symbols',
                },
              })
            }}
          />
          {errors?.insta?.type === 'required' && <p>This field is required</p>}
          {errors?.insta?.type === 'pattern' && <p>Invalid symbols or format</p>}
          <img className={styles.icon} src={instaIcon} alt="ico" />

          {/* {
            <button type="button" className={styles.next} onClick={() => {}}>
              {'>'}
            </button>
          } */}
        </div>
        <button className={styles.submit} disabled={false} type="submit">
          {'Next >'}
        </button>
      </form>
    </div>
  )
}

Socials.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.array,
  }),
  onSubmit: T.func,
}

export default Socials
