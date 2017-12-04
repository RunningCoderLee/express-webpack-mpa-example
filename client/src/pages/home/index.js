
import './style.less';

window.onload = function () {
  delayToPrint(1000)


  async function delayToPrint(time) {
    await setTimeout(() => {
      console.log(111)
    }, time);
  }
};