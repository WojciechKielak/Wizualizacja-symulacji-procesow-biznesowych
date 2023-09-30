class CustomCurve {
    private _context: CanvasRenderingContext2D;
    private _t: number;
    private _line!: number;
    private _point!: number;
    private _x!: number;
    private _y!: number;
  
    constructor(context: CanvasRenderingContext2D, t: number) {
      this._context = context;
      this._t = t;
    }
  
    areaStart() {
      this._line = 0;
    }
  
    areaEnd() {
      this._line = NaN;
    }
  
    lineStart() {
      this._x = this._y = NaN;
      this._point = 0;
    }
  
    lineEnd() {
      if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
    }
  
    point(x: number, y: number) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2;
        this._context.lineTo(this._x, y);
        this._context.lineTo(x, y);
        break;
        default: {
          this._context.lineTo(x, this._y);
          this._context.lineTo(x, y);
          break;
        }
      }
      this._x = x, this._y = y;
    }
  }
  
  export default function (context: CanvasRenderingContext2D) {
    return new CustomCurve(context,1);
  }
  