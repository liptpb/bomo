<template>
  <div class="index-container">
    <van-sidebar active-key='0'>
  <van-sidebar-item title="标签名" />
  <van-sidebar-item title="标签名" />
  <van-sidebar-item title="标签名" />
</van-sidebar>
    <van-grid>
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
     <div class='aa'>ddddd</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  computed: {},

  mounted() { 
    console.log(this.HOST)

  },

  methods: {
    onChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
    },
  }
}
</script>
<style scoped>
  .aa{
    width: 200px;
    height: 200px;
    border: 1PX solid #000
  }
</style>