<template>
  <div class="home">
   
    <HelloWorld msg=""/>
    <img id="timg" crossorigin="anonymous" src="/allsky174.jpg" width="400" height="400">
    <img id="roofimg" crossorigin="anonymous" src="/roof.jpg" width="400" height="400">
    
    <div>
      <el-button type="warning" plain @click="closeRoof">关闭</el-button>
      <el-button type="danger" plain  @click="openRoof">打开</el-button>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Stomp from  'stompjs'
import jQuery from 'jquery'
var client;
var url = 'ws://msg.xastro.site:61614/stomp';
var destination_r = '/topic/equipment_status';
var destination_s = '/topic/NextRoof';
client = Stomp.client(url);
//client.debug = function(str) {};

var stomp_headers = {login: '',passcode: '','client-id': 'msgweb-'+Math.random()};
var onconnect = function() {
    client.debug("connected to Stomp");
    client.subscribe(destination_r, function(message) {
    var msgObj = jQuery.parseJSON(message.body);
        if(msgObj.msgType !== undefined && msgObj.deviceName !== undefined){
            jQuery("#"+msgObj.deviceName).css("background-color", "#63dd63");
            jQuery("#"+msgObj.deviceName).data("last-update" , new Date().getTime());
            if(msgObj.msgType =="ParkStatus"){
                var nowDate=new Date()
                var hourNumber = nowDate.getHours();
                this.$message("当前小时 :" + hourNumber);
                if(hourNumber>=8 && hourNumber<=20){
                    jQuery("#"+msgObj.deviceName+"_Park").css("background-color", "#880088");
                    var msg = new SpeechSynthesisUtterance(' XP5没有帕克!');
                    msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google 普通话（中国大陆）'; })[0];
                    speechSynthesis.speak(msg);
                }
            }

        }
    });
};

var error_callback = function(error) {
    this.$message(error.headers.message);
};

function bindEqmMessage(){
     client.connect(stomp_headers,onconnect,error_callback);
}


export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
      openRoof() {
        client.send(destination_s,{}, 'OPEN');
        this.$message('open');
      },
      closeRoof() {
        client.send(destination_s,{}, 'CLOSE');
        this.$message('close');
      },
  },
  created(){
      bindEqmMessage();
  }
  
}
</script>
