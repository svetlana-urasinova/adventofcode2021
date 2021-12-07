export class Canvas {
    #content = [];
    #diagonal = false;
    #x_max = 0;
    #y_max = 0;

    constructor(diagonal) {
        this.#diagonal = diagonal;
    }

    parseCoords (str) {
        const res = str.split(',').map(el => +el);
        return { x: res[0], y: res[1] };
    }

    enlargeCanvas () {
        for (let i = 0; i <= this.#y_max; i++) {
            if (!this.#content[i]) { this.#content[i] = []; }
            for (let j = 0; j <= this.#x_max; j++) {
                if (this.#content[i][j] === undefined) { this.#content[i][j] = 0; }
            }
        }
    } 

    draw (x0, y0, x1, y1) {
        if (x0 === x1) {
            const d = y0 > y1 ? -1 : 1;
            let i = y0;
            while (i - d !== y1) {
                this.#content[i][x0]++;
                i += d;
            }
        } else if (y0 === y1) {
            const d = x0 > x1 ? -1 : 1;
            let i = x0;
            while (i - d !== x1) {
                this.#content[y0][i]++;
                i += d;
            }
        } else if (this.#diagonal && (Math.abs(x1 - x0) === Math.abs(y1 - y0))) {
            const d = y0 > y1 ? -1 : 1;
            let i = y0;
            let j = x0;
            while (i - d !== y1) {
                this.#content[i][j]++;
                i += d;
                j += x0 > x1 ? -1 : 1;
            }
        }
    }

    adjust (x0, y0, x1, y1) {
        const x_max = Math.max(x0, x1);
        const y_max = Math.max(y0, y1);
        if (x_max > this.#x_max || y_max > this.#y_max) {
            if (x_max > this.#x_max) { this.#x_max = x_max; }
            if (y_max > this.#y_max) { this.#y_max = y_max; }   
            this.enlargeCanvas();
        }
    }

    getContent() {
        return this.#content;
    }
}