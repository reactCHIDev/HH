import { getItem } from 'utils/localStorage'

const getToken = () => {
  const token = getItem('authorization-token')
  const [, accessToken] = token.split('Bearer ')
  return accessToken
}

export const getSocket = () => {
  const accessToken = getToken()
  const socket = new WebSocket(`wss://hungryhugger.wildwebart.com/ws/v1?accessToken=${accessToken}`)
  socket.onopen = () =>
    socket.send(
      JSON.stringify({
        event: 'getNewMessages',
        data: {
          accessToken,
        },
      }),
    )
  return socket
}

export const closeSocket = (s) => s.close()

// const socket = getSocket()
/* socket.addEventListener('message', (data) => {
  console.log('%c   data   ', 'color: darkgreen; background: palegreen;', data.data)
}) */

export const getNewMessages = (socket) => {
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'getNewMessages',
      data: {
        accessToken,
      },
    }),
  )
}

export const getDialog = (socket, id) => {
  console.log('%c   id   ', 'color: white; background: salmon;', id)
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'getDialog',
      data: {
        accessToken,
        recipientId: id,
        startIndex: 0,
        limit: 25,
      },
    }),
  )
}

export const getDialogs = (socket) => {
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'getDialogs',
      data: {
        accessToken,
        startIndex: 0,
        limit: 25,
      },
    }),
  )
}

export const sendMessage = (socket, message) => {
  console.log('%c   socket   ', 'color: white; background: royalblue;', socket)
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'sendMessage',
      data: {
        accessToken,
        recipientId: 671,
        text: message,
        files: [],
      },
    }),
  )
}

export const setAsReviewed = (socket) => {
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'setAsReviewed',
      data: {
        accessToken,
        messageIds: [1, 2, 3, 4, 5],
      },
    }),
  )
}
