<!--<template>-->
  <!--<div class="replenish-wrap">-->
    <!--<Step :type="'second'"></Step>-->
    <!--<div class="upload-wrap">-->
      <!--<p class="info">以下信息仅作认证使用，不会公开</p>-->
      <!--<div class="upload-img clear-fix">-->
        <!--<p class="title">医师执业证书</p>-->
        <!--<p class="small-title">上传带有执业地点详情页的图片，如有需要可补充一张照片</p>-->
        <!--<div class="img-container" :style="{ 'background-image': 'url(' + imgUrl1 + ')', 'background-size': '100% 100%'}">-->
          <!--<input type="file" class="file-input file-input-license" name="images" accept="image/*">-->
        <!--</div>-->
        <!--<div class="img-container md15" :style="{ 'background-image': 'url(' + imgUrl2 + ')', 'background-size': '100% 100%'}">-->
          <!--<input type="file" class="file-input file-input-license2" name="images" accept="image/*">-->
        <!--</div>-->
        <!--<p class="example">示例:</p>-->
        <!--<div class="img-preview">-->
          <!--<vue-preview :slides="slide1"></vue-preview>-->
          <!--<span class="enlarge-tag"></span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="upload-img clear-fix">-->
        <!--<p class="title">职称证书</p>-->
        <!--<p class="small-title">仅住院医师可上传工牌</p>-->
        <!--<div class="img-container" :style="{ 'background-image': 'url(' + imgUrl3 + ')', 'background-size': '100% 100%'}">-->
          <!--<input type="file" class="file-input file-input-card" name="images" accept="image/*">-->
        <!--</div>-->
        <!--<p class="example">示例:</p>-->
        <!--<div class="img-preview">-->
          <!--<vue-preview :slides="slide2"></vue-preview>-->
          <!--<span class="enlarge-tag"></span>-->
        <!--</div>-->
        <!--<div class="img-preview">-->
          <!--<vue-preview :slides="slide3"></vue-preview>-->
          <!--<span class="enlarge-tag"></span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="bottom-wrap clear-fix">-->
      <!--<div class="bottom-button forward-step" @click="goBack">上一步</div>-->
      <!--<div class="bottom-button next-step" @click="registerFinish">提交审核</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import Vue from 'vue'-->
  <!--import qs from 'qs'-->
  <!--import { Toast } from 'mint-ui'-->
  <!--import VuePreview from 'vue-preview'-->
  <!--import Step from './components/StepHeader'-->
  <!--import Qupload from 'static_widget/qiniu_upload/qiniu_upload_2.js'-->

  <!--Vue.use(VuePreview, {-->
    <!--shareEl: false-->
  <!--})-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--imgUrl1: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/a41f/a5738479079b_w184_h184_.png',-->
        <!--imgUrl2: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/a41f/a5738479079b_w184_h184_.png',-->
        <!--imgUrl3: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/a41f/a5738479079b_w184_h184_.png',-->
        <!--licenseFlag: false, // 标识是否上传了职业证书-->
        <!--cardFlag: false, // 标识是否上传了职称证书-->
        <!--slide1: [-->
          <!--{-->
            <!--src: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/b91f/d22cc101139b_w493_h497_.png',-->
            <!--msrc: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/b91f/d22cc101139b_w493_h497_.png',-->
            <!--alt: 'picture1',-->
            <!--title: '示例：医生职业证书',-->
            <!--w: 272,-->
            <!--h: 272-->
          <!--}-->
        <!--],-->
        <!--slide2: [-->
          <!--{-->
            <!--src: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/9254/24cb60d2f033_w496_h496_.png',-->
            <!--msrc: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/9254/24cb60d2f033_w496_h496_.png',-->
            <!--alt: 'picture1',-->
            <!--title: '示例：职称证书',-->
            <!--w: 272,-->
            <!--h: 272-->
          <!--}-->
        <!--],-->
        <!--slide3: [-->
          <!--{-->
            <!--src: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/f83d/0f1bea8abc16_w334_h334_.png',-->
            <!--msrc: '//media2.chunyuyisheng.com/@/media/images/2018/04/04/f83d/0f1bea8abc16_w334_h334_.png',-->
            <!--alt: 'picture1',-->
            <!--title: '示例：工牌',-->
            <!--w: 272,-->
            <!--h: 272-->
          <!--}-->
        <!--]-->
      <!--}-->
    <!--},-->
    <!--components: {-->
      <!--Step-->
    <!--},-->
    <!--created() {-->
      <!--this.getCardInfo()-->
    <!--},-->
    <!--mounted() {-->
      <!--this.uploadImg('.file-input-license', 'license_photo', 'imgUrl1')-->
      <!--this.uploadImg('.file-input-license2', 'license_photo_supply', 'imgUrl2')-->
      <!--this.uploadImg('.file-input-card', 'card_photo', 'imgUrl3')-->
    <!--},-->
    <!--methods: {-->
      <!--isEmptyObject(obj) {-->
        <!--for (var i in obj) {-->
          <!--return true-->
        <!--}-->
        <!--return false-->
      <!--},-->
      <!--// 获取医生已经上传的执照&工牌信息-->
      <!--getCardInfo() {-->
        <!--let cardInfoUrl = '/doctormgr_service/get_card_info/'-->
        <!--this.axios.get(cardInfoUrl).then((res) => {-->
          <!--let status = res.status-->
          <!--let data = res.data-->
          <!--if (status >= 200 & status <= 300) {-->
            <!--let cardInfo = data.card_info-->
            <!--if (this.isEmptyObject(cardInfo)) {-->
              <!--let len = cardInfo.license_photo_list.length-->
              <!--if (len === 2) {-->
                <!--this.imgUrl1 = cardInfo.license_photo_list[0]-->
                <!--this.imgUrl2 = cardInfo.license_photo_list[1]-->
                <!--this.licenseFlag = true-->
              <!--} else if (len === 1) {-->
                <!--this.imgUrl1 = cardInfo.license_photo_list[0]-->
                <!--this.licenseFlag = true-->
              <!--}-->
              <!--if (cardInfo.card_photo) {-->
                <!--this.imgUrl3 = cardInfo.card_photo-->
                <!--this.cardFlag = true-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--// 上一步-->
      <!--goBack() {-->
        <!--this.$router.go(-1)-->
      <!--},-->
      <!--// 提交审核-->
      <!--registerFinish() {-->
        <!--if (!this.licenseFlag) {-->
          <!--Toast('请上传医生职业证书')-->
          <!--return-->
        <!--}-->
        <!--if (!this.cardFlag) {-->
          <!--Toast('请上传职称证明')-->
          <!--return-->
        <!--}-->
        <!--this.$router.push({ name: 'register_finished' })-->
      <!--},-->
      <!--// 上传图片-->
      <!--uploadImg($selector, type, imgType) {-->
        <!--const that = this-->
        <!--let data = []-->
        <!--new Qupload({-->
          <!--btn: $selector,-->
          <!--max_file_size: 10 * 1024 * 1024,-->
          <!--nums: 1,-->
          <!--loginUrl: '/cooperation/wap/quick_login/?next=' + encodeURI(window.location.href),-->
          <!--// next: function(res) {-->
          <!--//     Toast('上传中，请耐心等待...')-->
          <!--// },-->
          <!--complete: function(res) {-->
            <!--Toast('上传成功')-->
            <!--if (res.success) {-->
              <!--switch (imgType) {-->
                <!--case 'imgUrl1':-->
                  <!--that.imgUrl1 = res.img_url-->
                  <!--that.licenseFlag = true-->
                  <!--break-->
                <!--case 'imgUrl2':-->
                  <!--that.imgUrl2 = res.img_url-->
                  <!--that.licenseFlag = true-->
                  <!--break-->
                <!--case 'imgUrl3':-->
                  <!--that.imgUrl3 = res.img_url-->
                  <!--that.cardFlag = true-->
                  <!--break-->
                <!--default:-->
                  <!--break-->
              <!--}-->
              <!--data = { type: res.img_url }-->
              <!--that.sendImg(data)-->
            <!--}-->
          <!--},-->
          <!--error: function(err) {-->
            <!--let tips = ''-->
            <!--switch (err.type) {-->
              <!--case 'numsError':-->
                <!--tips = '一次最多上传' + this.nums + '张图片'-->
                <!--break-->
              <!--case 'sizeError':-->
                <!--tips = '图片最大不超过10M'-->
                <!--break-->
              <!--default:-->
                <!--tips = err.message-->
                <!--break-->
            <!--}-->
            <!--Toast(tips)-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--// 提交图片-->
      <!--sendImg(data) {-->
        <!--let sendUrl = '/doctormgr/upload_card_photo'-->
        <!--this.axios({-->
          <!--url: sendUrl,-->
          <!--method: 'post',-->
          <!--data: qs.stringify(data)-->
        <!--}).then((res) => {-->
          <!--let status = res.status-->
          <!--if (status >= 200 && status <= 300) {-->
            <!--Toast('上传成功')-->
          <!--}-->
        <!--})-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

