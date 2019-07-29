> 小程序对话框组件

**开发背景：小程序原生的wx.showModal组件不能任意控制显示/隐藏，在某些场景下需要手动函数控制关闭。**

### NPM

``` bash
npm install miniprogram-modal-x -save

// 注：并在开发者工具中，选择工具 => 构建npm
```
### Example

```
// 在当前页面的.json内注册为局部的（或者在app.json内，注册为全局的）
"usingComponents": {
  "customModal": "miniProgram-modal-x"
}

// 在.wxml内
<view>
    <customModal modal="{{modal}}" bind:modalCallback="modalCallback"></customModal>
</view>

// 在.js内
Page({
    data: {
      modal: {
        status: false,
        title: '操作提醒',
        content: '此操作不可逆，您确定要删除吗？',
        cancelText: '取消',
        confirmText: '确定',
        cancelColor: '#999'
      },
    },
    // 回调函数
    modalCallback(opts) {
      let type = opts.detail.type; // type => sure / cancel
      this.setData({
        modal: {
          ...this.data.modal,
          status: false
        }
      });
      if (type === 'sure') {
        // 确认
        // ...
      }
    },
    // 显示对话框
    showModal() {
      this.setData({
        modal: {
          ...this.data.modal,
          status: true
        }
      });
    }
   });
```

## Api
### 参数
| Name                        | Type        | Default      | Description                      |
|-----------------------------|-------------|--------------|--------------------------------------------------------------------|
| modal                      | `Object`    |              | 对话框描述、状态          |
| modal.status               | `Boolean`   | `false`      | 控制对话框，显示/隐藏            |
| modalPFn                   | `Function`  |              | 点击回调函数，包含type类型（sure => 确定, cancel => 取消）                      |


## 其他说明
1、其他字段不赘述，同 wx.showModal一样
<br>
2、此对话框组件的样式于原生的一致
