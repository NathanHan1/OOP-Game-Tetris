(function () {
    window.Game = function () {
        this.dom = null
        this.init()
        this.block = new Block(this)
        this.map = new Map(this)
        this.start()
    }

    Game.prototype.init = function () {
        this.dom = document.createElement('table')
        let tr, td
        for (let i = 0; i < 20; i++) {
            tr = document.createElement('tr')
            this.dom.appendChild(tr)
            for (let j = 0; j < 12; j++) {
                td = document.createElement('td')
                tr.appendChild(td)
            }
        }
        document.getElementById('app').appendChild(this.dom)
    }

    Game.prototype.setColor = function (row, col, className) {
        document.querySelectorAll('tr')[row].children[col].className = className
    }

    Game.prototype.clear = function () {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 12; j++) {
                this.setColor(i, j, '')
            }
        }
    }

    Game.prototype.start = function () {
        const _this = this
        let f = 0

        setInterval(function () {
            f++
            //清屏
            _this.clear()
            //渲染地图
            _this.map.render()
            //判断是否消行
            _this.map.clearLine()
            //渲染砖块
            _this.block.render()
            f % 20 === 0 && _this.block.down()
        }, 30)
    }
})()