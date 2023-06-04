interface VirtualConsoleProps {
    _totalLines: string[],
    _viewableAreaHeight: number,
    _lineHeight: number,
    _currentScrollPosition: number,
    _buffer: number,
    // _leadingPlaceholderHeight: number,
    // _trailingDivHeight: number
}

export class VirtualConsole {
    private _totalLines: string[];
    private _viewablAreaHeight: number;
    private _lineHeight: number;
    private _visibleLineCount: number;
    private _currentScrollPosition: number;
    private _buffer: number;
    private _leadingPlaceholderHeight: number = 0;
    // private _trailingDivHeight: number;

    constructor(props: VirtualConsoleProps) {
        this._totalLines = props._totalLines;
        this._viewablAreaHeight = props._viewableAreaHeight;
        this._lineHeight = props._lineHeight;
        this._currentScrollPosition = props._currentScrollPosition;
        this._buffer = props._buffer;
        this._visibleLineCount = this.visibleLines(this._viewablAreaHeight, this._lineHeight);

        this.updateLeadingPlaceholderHeight();
    }

    // Getters & Setters
    public get totalLines(): string[] {
        return this._totalLines;
    }

    public set totalLines(value: string[]) {
        this._totalLines = value;
    }

    public get viewablAreaHeight(): number {
        return this._viewablAreaHeight;
    }

    public set viewablAreaHeight(value: number) {
        this._viewablAreaHeight = value;
        this._visibleLineCount = this.visibleLines(this._viewablAreaHeight, this._lineHeight); // Recalculate visibleLineCount
    }

    public get lineHeight(): number {
        return this._lineHeight;
    }

    public set lineHeight(value: number) {
        this._lineHeight = value;
        this._visibleLineCount = this.visibleLines(this._viewablAreaHeight, this._lineHeight); // Recalculate visibleLineCount
    }

    public get currentScrollPosition(): number {
        return this._currentScrollPosition;
    }

    public set currentScrollPosition(value: number) {
        this._currentScrollPosition = value;
    }

    public get buffer(): number {
        return this._buffer;
    }

    public set buffer(value: number) {
        this._buffer = value;
    }

    // VisibleLineCount only has a getter since it's calculated based on other properties
    public get visibleLineCount(): number {
        return this._visibleLineCount;
    }

    public visibleLines(viewablAreaHeight: number, lineHeight: number): number {
        return Math.floor(viewablAreaHeight / lineHeight);
    }

    public firstVisibleElementIndex(): number {
        return Math.floor(this._currentScrollPosition / this._lineHeight) ?? 0;
    }

    public firstRenderedElementIndex(): number {
        if (this.firstVisibleElementIndex() < this._buffer) {
            return 0;
        }
        return this.firstVisibleElementIndex() - this._buffer
    }

    private lastVisibleElementIndex(): number {
        return this.firstVisibleElementIndex() + (this._viewablAreaHeight / this._lineHeight);
    }

    private lastRenderedElementIndex(): number {
        if (this.lastVisibleElementIndex() < (this.totalLines.length - this._buffer)) {
            return this.lastVisibleElementIndex() + this._buffer;
        } else {
            return this.lastVisibleElementIndex() + (this._buffer % this.lastVisibleElementIndex());
        }
    }

    public get leadingPlaceholderHeight(): number {
        return this._leadingPlaceholderHeight;
    }

    public updateLeadingPlaceholderHeight() {
        let maxHeight: number = this.totalLines.length * this.lineHeight;

        console.table({
            'firstRenderedElementIndex: ': this.firstRenderedElementIndex(),
            'firstVisibleElementIndex: ': this.firstVisibleElementIndex(),
            'currentScrollPosition': this.currentScrollPosition,
            'lineHeight: ': this.lineHeight,
            'totalLinesLength: ': this.totalLines.length,
            'maxHeight: ': maxHeight
        })

        if (this.leadingPlaceholderHeight <= maxHeight) {
            if (this.firstVisibleElementIndex() > this.buffer) {
                this._leadingPlaceholderHeight = (this.firstVisibleElementIndex() - this.buffer) * this.lineHeight;
            } else {
                this._leadingPlaceholderHeight = 0;
            }
        }
    }

    private trailingPlaceholderHeight(): number {
        return (this.totalLines.length - this.lastVisibleElementIndex() + this._buffer) * this._lineHeight;
    }

    public getProperties() {
        return {
            leadingPlaceholderHeight: this._leadingPlaceholderHeight,
            firstRenderedElementIndex: this.firstRenderedElementIndex(),
            lastRenderedElementIndex: this.lastRenderedElementIndex(),
            trailingPlaceholderHeight: this.trailingPlaceholderHeight()
        }
    }
}