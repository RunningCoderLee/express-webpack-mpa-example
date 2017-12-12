import Dialog from 'art-dialog/dist/dialog-plus'
import _ from 'lodash'


// import 'font-awesome/scss/font-awesome.scss'
// import '../../fontAwesomeConfiguration/font-awesome.config'
import '../../fontAwesomeConfiguration/index'

$(() => {
  async function delayToPrint(time) {
    await setTimeout(() => {
      console.log(111)
    }, time)
  }

  delayToPrint(1000)

  $('#increase').click(() => {
    $('#result').html(parseInt($('#result').html(), 10) + 1)
  })

  $('#dialog').click(() => {
    const d = Dialog({
      title: '欢迎',
      contentL: '欢迎使用',
    })
    d.show()
  })

  _.forEach([1, 2, 3], item => console.log(item))
})


// if (module.hot) {
//   module.hot.accept()
// }
