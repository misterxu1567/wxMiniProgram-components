/*
 * @module 自定义modal组件，官方的不支持代码关闭
 */
Component({
  properties: {
    modal: {
      type: Object,
      value: {
        status: false,
        title: '标题',
        content: "描述",
        cancelText: '取消',
        confirmText: '确定',
        cancelColor: ''
      }
    }
  },
  data: {},
  methods: {
    ctrl (e) {
      let type = e.target.dataset.type;
      this.triggerEvent('modalCallback', { type });
    }
  }
})