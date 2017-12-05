
import './style.less';

window.onload = function onload() {
  async function delayToPrint(time) {
    await setTimeout(() => {
      console.log(111)
    }, time);
  }

  delayToPrint(1000);
};
