Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasUserInfo: {
      type: Boolean,
      value: wx.getStorageSync('hasUserInfo')
    },
    apiUrl: {
      type: String,
      value: ''
    },
    getUnionid: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */ 
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    // 封装ajax接口
    wxRequest: function (params, url) {
      params.data = params.data || {};
      var reqData = params.data;
      wx.request({
        url,
        method: params.method || 'POST',
        data: reqData,
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          if (params.success) {
            params.success(res);
          }
        },
        fail(res) {
          if (params.fail) {
            params.fail(res);
          } else {
            wx.showToast({
              title: 'err',
              icon: 'none',
              duration: 2000
            })
          }
        },
        complete(res) {
          if (params.complete) {
            params.complete(res);
          }
        }
      });
    },
    // 获取openid 和 unionid
    getOpenid: function (params) {
      this.wxRequest(params, this.data.apiUrl);
    },
    getOpenidHelpFn: function (objData, callback) {
      wx.showLoading({
        title: '玩命加载中'
      });
      const _this = this;
      wx.login({
        success: function (res) {
          if (res.code) {
            //获取openid
            let reqData = {};
            reqData['code'] = res.code;
            if (objData) {
              reqData['encryptedData'] = objData.encryptedData;
              reqData['iv'] = objData.iv;
            }
            _this.getOpenid({
              data: reqData,
              success: function (res) {
                if (res.data.success) {
                  wx.setStorageSync('openid', res.data.data.openid);
                  if (!wx.getStorageSync('unionid')) {
                    wx.setStorageSync('unionid', res.data.data.unionid);
                  }
                  if (callback) {
                    callback();
                  }
                  wx.hideLoading();
                } else {
                  wx.showToast({
                    title: '获取openid失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
              }
            })
          } else {
            wx.showToast({
              title: '获取code失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      });
    },
    // 授权
    getUserInfoFn: function (e) {
      if (e.detail.errMsg == 'getUserInfo:ok' || e.detail.userInfo) {
        // 同意授权
        const _this = this;
        wx.setStorageSync('userInfo', e.detail.userInfo);
        wx.setStorageSync('hasUserInfo', true);
        this.setData({
          hasUserInfo: true
        });
        var objData = {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        // 获取unionid 和 openid 回调，注：需要getUnionid为true
        if (this.data.getUnionid) {
          this.getOpenidHelpFn(objData, () => {
            this.triggerEvent('authorizeSuccessCFn');
          });
        } else {
          // 授权成功通知父组件
          this.triggerEvent('authorizeSuccessCFn');
        }
      } else {
        // 拒绝授权
        this.triggerEvent('authorizeFailCFn');
      }
    }
  },
  attached: function () {
  }
})
