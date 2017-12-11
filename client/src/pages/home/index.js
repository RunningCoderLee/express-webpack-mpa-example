import Dialog from 'art-dialog/dist/dialog-plus'
import './style.less'

$(() => {
  async function delayToPrint(time) {
    await setTimeout(() => {
      console.log(111)
    }, time)
  }

  delayToPrint(1000)

  $('#increase').click(() => {
    $('#result').html(parseInt($('#result').html(), 10) + 1)
    const d = Dialog({
      title: '欢迎',
      contentL: '欢迎使用',
    })
    d.show()
  })
})


// if (module.hot) {
//   module.hot.accept()
// }
