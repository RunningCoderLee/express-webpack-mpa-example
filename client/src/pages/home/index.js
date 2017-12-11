
import './style.less'

window.onload = function onload() {
  async function delayToPrint(time) {
    await setTimeout(() => {
      console.log(111)
    }, time)
  }

  delayToPrint(1000)

  const increaseBtn = document.getElementById('increase')
  console.dir(increaseBtn)
  increaseBtn.onclick = function () {
    const result = document.getElementById('result')
    console.log(result.innerHTML)
    result.innerHTML = parseInt(result.innerText, 10) + 1
  }
  console.log(11)
  console.log(22222)
  console.log(333)
  console.log(333)
  console.log(44)
  console.log(55)
  console.log(66)

  const h1 = document.getElementsByTagName('h1')[0]
  h1.innerHTML = '更改后的文字11222233344'
}


// if (module.hot) {
//   module.hot.accept()
// }
