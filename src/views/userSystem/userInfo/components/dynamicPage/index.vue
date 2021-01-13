<template>
  <div class="dynamic-wrapper">
    <div class="active-wrapper">
      <div class="dynamic-title">活跃度统计图</div>
      <active-line />
    </div>
    <div class="timeline-wrapper">
      <div class="dynamic-title">近期动态</div>
      <a-timeline class="padding24" mode="left" style="margin-top:35px">
        <a-timeline-item v-for="(item, index) in timelineList" :key="index" :color="item.color">
          <p>{{ item.time }}</p>
          {{ item.title }}
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script>
import activeLine from './activeLine.vue';
export default {
  name: 'dynamic',
  components: { activeLine },
  data() {
    return {
      timelineList: [
        {
          title: '这个页面不想写接口了，保存信息再写吧',
          time: '2021-01-14',
          color: 'red'
        },
        {
          title: 'mysql太难了吧，学不会啊。。。',
          time: '2021-01-13',
          color: 'blue'
        },
        {
          title: '搬砖中....',
          time: '2021-01-12',
          color: 'gray'
        },
        {
          title: '添加登录token和拦截',
          time: '2021-01-11',
          color: 'gray'
        },
        {
          title: '开始搭建node express',
          time: '2021-01-10',
          color: 'gray'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.dynamic-title {
  font-size: 1rem;
  margin-bottom: 15px;
}
.timeline-wrapper {
  margin-top: 24px;
}
</style>
