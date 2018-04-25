<template>
	<div class="pan-item" :style="{zIndex:zIndex,height:height,width:width}">
		<div class="pan-info">
			<div class="pan-info-roles-container">
        <label for="upd"><i class="el-icon-plus"></i></label>
        <input id="upd" type="file" @change="addphoto($event)" alt="添加图片" accept="image/jpeg,image/jpg,image/png"/>
			</div>
		</div>
    <div class="pan-thumb"><img id="thumb-avatar"  :src="image"></div>
	</div>
</template>

<script>
export default {
  name: 'PanThumb',
  data(){
    return {
      picType:["jpg", "jpeg", "png"],
      picSize:30,
    }
  },
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 100
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    }
  },
  methods:{
    addphoto(e){
      var self=this;
      var fileselector = e.target;
      var selectedfile = fileselector.files[0];

      var selectType=selectedfile.type; //"image/jpeg", "image/png"
      if (selectType.indexOf("image") == -1) {
        this.$message.warning("请选择图片！");
        return;
      }
      var typeRight=false;
      var picT=this.picType
      for(var i=0;i<picT.length;i++){
        if(picT[i]==selectType.substr(6)){
          typeRight=true;
          break;
        }
      }
      if (!typeRight) {
        this.$message.warning("请选择" + self.picType.join("/") + "格式的图片！");
        return;
      }
      var sizeK=selectedfile.size/1024;
      if (sizeK > self.picSize) {
        this.$message.warning("文件大小不得超过" + self.picSize + "K！");
        return;
      }

      var fblob = new Blob([selectedfile], {
        type: selectedfile.type
      });
      var url = URL.createObjectURL(fblob);
      var img = document.getElementById("thumb-avatar");
      img.src = url;
      img.onload = function () {
        var base64= getBase64Image(img);
        self.$emit("changeAvatar", base64);
      };
    },
  }
}

function getBase64Image(img, width, height) {
  var canvas = document.createElement('canvas');
  var w = (width == undefined ? img.width : width);
  var h = (height == undefined ? (width == undefined ? img.height : img.height * width / img.width) : height);
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  var dataURL = canvas.toDataURL('image/png');
  return dataURL;
}
</script>

<style scoped>
.pan-item {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	display: inline-block;
	position: relative;
	cursor: default;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.pan-info-roles-container {
  width:inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
#upd{
  width:100%;
  height: 100%;
  display: none;
}
.pan-info .pan-info-roles-container label {
  width:100%;
  height: 100%;
  text-align: center;
  line-height: 150px;
  font-size:45px;
  color:#eee;
  font-weight: bold;
  cursor: pointer;
}
.pan-thumb {
	width: 100%;
	height: 100%;
	background-size: 100%;
	border-radius: 50%;
	overflow: hidden;
  background: #fff;
	position: absolute;
	transform-origin: 95% 40%;
	transition: all 0.3s ease-in-out;
}
#thumb-avatar{
  width:100%;
  height: 100%;
}
.pan-info {
	position: absolute;
	width: inherit;
	height: inherit;
	border-radius: 50%;
	overflow: hidden;
  border:1px solid #ddd;
	box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.15);
}
.pan-item:hover .pan-thumb {
	transform: rotate(-110deg);
}
</style>
