<template>
  <div class="hello">
    <canvas id="targetImg" width="300" height="300" />
    <div id="label-container"></div>
  </div>
</template>

<script>
// import {timer} from 'vue-timers'
import * as  tmImage from '@teachablemachine/image'


      // const URL = "https://teachablemachine.withgoogle.com/models/kJCGpkml/"
      const URL = "/"

      let model=''
      let labelContainer=''
      let maxPredictions=''
    async function initModel() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
      labelContainer = document.getElementById("label-container");
      for (let i = 0; i < maxPredictions; i++) { // and class labels
      labelContainer.appendChild(document.createElement("div"));
      }
    }


    async function predict() {
        window.console.log('predict-----')
        var cavT = document.getElementById('targetImg');
        const prediction = await model.predict(cavT);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

export default {
  // timers:[
  //   timer('log',5000,{autostart:true})
  // ],
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      timer:''  ,
      
    }
  },
  method:{
    log(){
      // this.msg = 'xxxx'
      window.console.log('--log-')
      // alert('--')
    },

  },
  created(){
     // this.timer = setInterval(this.log , 5000)
    window.console.log('-created-')
    //this.log()
    // log()

  },
  async mounted(){
    window.console.log(this)
    // var that = this
     await initModel()
    // this.log()
    this.timer = setInterval(async function(){
      // window.console.log('mounted-----')
      var cav1=document.getElementById('targetImg')
      var ctx1=cav1.getContext('2d')
      var bgImg=document.getElementById('timg')
      ctx1.drawImage(bgImg,0,0,300,300)
      await predict()
      // this.log()
      window.console.log('------p=======')
    } , 2000)
    // this.log()
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
