(function () {
    window.Map = function (mediator) {
        this.mediator = mediator
        this.code = (function () {
            const arr = []
            for (let i = 0; i < 20; i++) {
                arr.push([])
                for (let j = 0; j < 12; j++) {
                    arr[i].push(0)
                }
            }
            arr.push(new Array(12).fill(1))
            return arr
        })()
    }
    Map.prototype.render = function () {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 12; j++) {
                if (this.code[i][j] !== 0) {
                    this.mediator.setColor(i, j, this.code[i][j])
                }
            }
        }
    }
    Map.prototype.setMap = function (i, j, type) {
        this.code[i][j] = type
    }

    Map.prototype.clearLine = function () {
        for (let i = 0; i < this.code.length - 1; i++) {
            if (this.code[i].indexOf(0) === -1) {
                this.code.splice(i, 1)
                this.code.unshift(new Array(12).fill(0))
            }
        }
    }
})()