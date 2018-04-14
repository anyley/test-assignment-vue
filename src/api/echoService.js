export const connect = ({ onmessage, onopen, onerror, onclose }) => {
  const ws = new WebSocket('ws://echo.websocket.org/')
  let requestId = 0

  ws.onmessage = e => {
    onmessage(JSON.parse(e.data))
  }

  ws.onopen = onopen
  ws.onerror = onerror
  ws.onclose = onclose

  const sendData = data => ws.send(JSON.stringify(data))

  return {
    ws,
    deleteComment: id => {
      requestId++
      setTimeout(() => sendData({ requestId, id, type: 'delete' }), Math.random() * 5000)
      return requestId
    },
    undeleteComment: id => {
      requestId++
      sendData({ requestId, id, type: 'undelete' })
      return requestId
    },
    disconnect: () => ws.close()
  }
}
