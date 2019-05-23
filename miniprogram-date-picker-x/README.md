> 小程序自定义时间选择器组件

**开发背景：原生时间组件不能满足UI设计需求，及开发需求**
<br/><br/>

<img src="https://raw.githubusercontent.com/misterxu1567/img-static/master/time.png" alt="时间组件预览" width="200">


### NPM

``` bash
npm install miniprogram-date-picker-x -save

// 注：并在开发者工具中，选择工具 => 构建npm
```
### Example

```
// 在.json内
"usingComponents": {
  "custom-date-picker": "miniprogram-date-picker-x"
}

// 在.wxml内
<view>
    <custom-date-picker bind:dataChangeCFn="dataChangePFn"></custom-date-picker>
</view>

// 在.js内
Page({
     data: {
       date: {}
     },
     // 时间变化成功回调函数
     dataChangePFn (options) {
        let date = options.detail.data; // date => {year: '2019', month: '05', day: '20'}
        this.setData({
            date: date
        });
     }
   });
```

## Api
### 参数
| Name                        | Type        | Default      | Description                      |
|-----------------------------|-------------|--------------|--------------------------------------------------------------------|
| dataChangePFn               | `Function`  |              | 时间变化成功回调函数                 |
