<template>

</template>

<script>
export default {
  created () {
    this.handleSpinCustom()
  },
  methods: {
    handleSpinCustom () {
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 18
              }
            }),
            h('div', 'Loading')
          ])
        }
      });
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
    }
  }
}
</script>

<style>
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
</style>
