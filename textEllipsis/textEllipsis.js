// components/textEllipsis/textEllipsis.js
/**
 * 长文本内容展开与收起
 * @param {String} content  长文本内容
 * @param {Number} maxline  最多展示行数[只允许 1-5 的正整数]
 * @param {String} position  展开收起按钮位置[可选值为 left right]
 * @param {Boolean} foldable  点击长文本是否展开收起
 */
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['textStyle', 'actionStyle'],
  properties: {
    content: {
      type: String,
      observer(val) {
        // console.log(val)
        if (this.data.onReady) {
          setTimeout(() => this.checkFold(), 10)
        }
      }
    },
    maxline: {
      type: Number,
      value: 1,
      observer(value) {
        if (!(/^[1-5]$/).test(value)) {
          throw new Error(`Maxline field value can only be digits (1-5), Error value: ${value}`)
        } else if (this.data.onReady) {
          setTimeout(() => this.checkFold(), 10)
        }
      }
    },
    foldable: {
      type: Boolean,
      value: true
    },
    PublicImgUrl: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    onFold: false,
    showFold: false,
    onReady: false
  },
  ready() {
    this.checkFold()
    this.data.onReady = true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkFold() {
      const query = wx.createSelectorQuery().in(this);
      query.selectAll(".showArea, .hideArea").boundingClientRect(res => {
        console.log('res--------------', res[0].height, res[1].height);
        this.setData({
          showFold: res[0].height < res[1].height
        })
      }).exec()
    },
    handleFold() {
      this.setData({
        onFold: !this.data.onFold
      })
    }
  }
})