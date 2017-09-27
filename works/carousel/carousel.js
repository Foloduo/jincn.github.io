;(function(window) {
  function Carousel(totalSize, singleSize) {
    const prev = document.querySelector('.prev')
    const next = document.querySelector('.next')
    const imgBox = document.querySelector('.img-container')
    const main = document.querySelector('.main')
    const buttons = document.querySelectorAll('.btn')

    this.FULL_SIZE = totalSize
    this.SINGLE = singleSize
    this.props = {
      offset: 0,
      activeIndex: 0,
      timer: 0,
      animated: 0
    }
    this.view = { prev, next, main, imgBox, buttons }
  }

  Carousel.prototype = {
    constructor: Carousel,
    bindListener: function() {
      const limit = this.FULL_SIZE - this.SINGLE
      this.view.prev.addEventListener('click', () => {
        this.props.offset === 0 ? (this.props.offset = limit) : (this.props.offset -= this.SINGLE)
        this.handleBtnFollowPic()
        this.changeOffset(this.props.offset)
      })

      this.view.next.addEventListener('click', () => {
        this.props.offset >= limit ? (this.props.offset = 0) : (this.props.offset += this.SINGLE)
        this.handleBtnFollowPic()
        this.changeOffset(this.props.offset)
      })

      this.view.main.addEventListener('mouseover', () => {
        clearTimeout(this.props.timer)
        cancelAnimationFrame(this.props.animateId)
      })

      this.view.main.addEventListener('mouseout', () => {
        this.startLoop()
      })

      // btn click to correct pic
      this.view.buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          this.props.offset = i * this.SINGLE
          this.changeBtnStyle(i)
          this.changeOffset(this.props.offset)
        })
      })
    },
    changeOffset: function(offset) {
      this.view.imgBox.style.transform = `translateX(-${offset}px)`
    },
    changeBtnStyle: function(index) {
      this.view.buttons[this.props.activeIndex].classList.remove('active')
      this.props.activeIndex = index
      this.view.buttons[index].classList.add('active')
    },
    handleBtnFollowPic: function() {
      const index = this.props.offset / this.SINGLE
      this.changeBtnStyle(index)
    },
    autoLoop: function() {
      const limit = this.FULL_SIZE - this.SINGLE
      this.props.offset >= limit ? (this.props.offset = 0) : (this.props.offset += this.SINGLE)
      this.handleBtnFollowPic()
      this.changeOffset(this.props.offset)
      this.startLoop()
    },
    startLoop: function() {
      this.props.timer = setTimeout(() => {
        this.props.animateId = requestAnimationFrame(this.autoLoop.bind(this))
      }, 2000)
    },
    run: function() {
      this.bindListener()
      this.startLoop()
    }
  }

  window.Carousel = Carousel
})(window)

c = new Carousel(2048, 512)
c.run()
