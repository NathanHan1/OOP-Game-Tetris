(function () {
    window.Block = function (mediator) {
        this.mediator = mediator
        this.arr = ['L', 'T', 'I', 'Z', 'J', 'O', 'S']
        //位置
        this.row = 0
        this.col = 4
        this.type = this.arr[Math.floor(Math.random() * this.arr.length)]
        this.direction = Math.floor(Math.random() * block_json[this.type].length)
        //形状
        this.code = block_json[this.type][this.direction]
        this.bindEvent()
    }

    Block.prototype.render = function () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.code[i][j] === 1) {
                    this.mediator.setColor(this.row + i, this.col + j, this.type)
                }
            }
        }
    }

    Block.prototype.down = function () {
        if (this.check(this.row + 1, this.col)) {
            this.goDie()
            return
        }
        this.row++
    }

    Block.prototype.check = function (row, col) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.code[i][j] !== 0 && this.mediator.map.code[row + i][col + j] !== 0) {
                    return true
                }
            }
        }
        return false
    }

    Block.prototype.bindEvent = function () {
        const _this = this
        window.addEventListener('keyup', function (e) {
            document.getElementById('audio').play()
            if (e.keyCode === 37) {
                _this.goLeft()
            } else if (e.keyCode === 38) {
                _this.rotate()
            } else if (e.keyCode === 39) {
                _this.goRight()
            } else if (e.keyCode === 40) {
                _this.goDown()
            }
        })
    }

    Block.prototype.goLeft = function () {
        if (this.check(this.row, this.col - 1)) return
        this.col--
    }
    Block.prototype.goRight = function () {
        if (this.check(this.row, this.col + 1)) return
        this.col++
    }
    Block.prototype.goDown = function () {
        while (!this.check(this.row + 1, this.col)) {
            this.down()
        }
    }
    Block.prototype.rotate = function () {
        const prev = this.code
        this.direction++

        let temp = this.direction % block_json[this.type].length
        this.code = block_json[this.type][temp]

        if (this.check(this.row, this.col)) {
            this.code = prev
        }
    }

    Block.prototype.goDie = function () {
        this.mediator.block = new Block(this.mediator)
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.code[i][j] !== 0) {
                    this.mediator.map.setMap(this.row + i, this.col + j, this.type)
                }
            }
        }
        //判断是否到顶
        if (this.mediator.map.code[0].includes(this.type)) {
            if (!alert('游戏结束')) document.location.reload()
        }
    }
})()