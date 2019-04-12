> 小程序授权管理组件

**开发背景：小程序1.3.0之后版本，需要用户主动点击按钮触发授权弹框；**
**<a href="https://developers.weixin.qq.com/miniprogram/dev/component/button.html">详情查看官方文档</a>**
<br/><br/>
**实现策略：在页面添加此组件，会在用户未授权的状态下自动显示，已授权则不会显示**

<img src="http://wenba-ooo-qiniu.xueba100.com/89e4c1ca6d7ff26f3b9932b93dde62aa.png" alt="表单预览" width="300" height="330">


### NPM

``` bash
npm install wxMiniProgram-auth-x -D
注：并在开发者工具中，选择工具 => 构建npm
```
### Example

```
// 在.json内
"usingComponents": {
  "authorize": "wxMiniProgram-auth-x"
}

// 在.wxml内
<view>
    <authorize apiUrl="{{apiUrl}}" getUnionid="{{getUnionid}}" bind:authorizeSuccessCFn="authorizeSuccessPFn" bind:authorizeFailCFn="authorizeFailPFn"></authorize>
</view>

// 在.js内
Page({
     data: {
       apiUrl: "https://1v1-activity.xueba100.com/onebook/code",
       getUnionid: true,
       // 用户先前授权过，可以直接从storage获取
       userInfo: wx.getStorageSync('userInfo'), // 用户数据，包含昵称、图像、城市等
       hasUserInfo: wx.getStorageSync('hasUserInfo'), // 类型：Boolean， 用户授权状态，此状态同 userInfo 一样，一旦获取永久保存于storage内
       openid: wx.getStorageSync('openid'),
       unionid: wx.getStorageSync('unionid')
     },
     // 授权成功回调函数
     authorizeSuccessPFn: function () {
       this.setData({
         userInfo: wx.getStorageSync('userInfo'),
         hasUserInfo: wx.getStorageSync('hasUserInfo'),
         openid: wx.getStorageSync('openid'),
         unionid: wx.getStorageSync('unionid')
       });
       console.log('success')
     },
     // 授权失败回调函数
     authorizeFailPFn: function () {
       console.log('fail')
     }
   });
```

## Api
### 参数
| Name                        | Type        | Default      | Description                      |
|-----------------------------|-------------|--------------|--------------------------------------------------------------------|
| apiUrl                      | `String`    |              | 获取openid或者unionid接口地址，注意：getUnionid必须为true才可以          |
| getUnionid                  | `Boolean`   | `false`      | 是否需要获取openid 或者 unionid，注意：apiUrl必须为true才可以             |
| authorizeSuccessCFn         | `Function`  |              | 授权成功回调                      |
| authorizeFailCFn            | `Function`  |              | 授权失败回调                      |



