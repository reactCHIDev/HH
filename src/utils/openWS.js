import { getItem } from 'utils/localStorage'

const getToken = () => {
  const token = getItem('authorization-token')
  const [, accessToken] = token.split('Bearer ')
  return accessToken
}

export const getSocket = () => {
  const accessToken = getToken()
  const socket = new WebSocket(`wss://hungryhugger.wildwebart.com/ws/v1?accessToken=${accessToken}`)
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        event: 'getNewMessages',
        data: {
          accessToken,
        },
      }),
    )
  }
  socket.onclose = () => {
    console.log('%c   SOCKET CLOSED !!!   ', 'color: white; background: salmon;')
  }
  socket.onerror = () => {
    console.log('%c   SOCKET ERROR !!!   ', 'color: white; background: salmon;')
  }
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

export const getDialog = (socket, id, startIndex = 0, limit = 25) => {
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'getDialog',
      data: {
        accessToken,
        recipientId: id,
        startIndex,
        limit,
      },
    }),
  )
}

export const getDialogs = (socket, id) => {
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

export const sendMessage = (socket, message, files, id) => {
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'sendMessage',
      data: {
        accessToken,
        recipientId: id,
        text: message,
        files,
      },
    }),
  )
}

export const setAsReviewed = (socket, messageIds) => {
  const accessToken = getToken()
  socket.send(
    JSON.stringify({
      event: 'setAsReviewed',
      data: {
        accessToken,
        messageIds,
      },
    }),
  )
}
