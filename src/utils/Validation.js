export const isEmailValid = (mail) => {
  if (
    // !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"a-zA-Z!#$%^&]+)*)
    // |(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])
    // |(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //   mail
    // )
    // eslint-disable-next-line max-len
    !/^[a-z0-9!#$%&'*+/=?^_{|}-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
      mail,
    )
  ) {
    return false
  }
  return true
}

export const passwordLength = (pass) => /^[\S]{8,}$/.test(pass) // 'At least 8 symbols required without spaces'

export const passwordSymbols = (pass) => {
  return /^(?=.*([A-Z]|[$@$!%*?&])).{1,}$/.test(pass) // 'One UPPERCASE or special symbols required'
}

export const emailLangWithSpaces = (email) => {
  return /^[a-zA-Z0-9@._ -!#$%^&]+$/.test(email)
}

export const emailLang = (email) => {
  return /^[a-zA-Z0-9@._-]+$/.test(email)
}

export const usernameLength = (username) => {
  return /^[\S]{3,15}$/.test(username)
}

export const usernameLang = (username) => {
  return /^[a-zA-Z0-9._ -]+$/.test(username)
}

export const usernameCase = (username) => {
  return /^[a-z0-9._ -]+$/.test(username)
}

export const nameValidation = (username) => {
  return /^.{2,16}$/.test(username)
}

export const lastnameValidation = (username) => {
  return /^.{2,26}$/.test(username)
}

export const isNameValid = (name) => /^[a-z ,.'-]{2,}\s[a-z ,.'-]{2,}$/i.test(name)

// export const isPassValid = (pass) =>
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/.test(pass);

export const commentLength = (comment) => {
  return /^[\S]{1,2000}$/.test(comment)
}
