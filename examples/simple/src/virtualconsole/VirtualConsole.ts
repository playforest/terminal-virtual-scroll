interface VirtualConsoleProps {
    totalLines: string[],
    viewableAreaHeight: number,
    lineHeight: number,
    visibleLineCount: number,
    currentScrollPosition: number,
    buffer: number,

}

export class VirtualConsole {
    private totalLines: string[];
    private viewablAreaHeight: number;
    private lineHeight: number;
    private visibleLineCount: number;
    private currentScrollPosition: number;
    private buffer: number;

    constructor(props: VirtualConsoleProps) {
        this.totalLines = props.totalLines;
        this.currentScrollPosition = props.currentScrollPosition;
        this.viewablAreaHeight = props.viewableAreaHeight;
        this.lineHeight = props.lineHeight;
        this.buffer = props.buffer;
        this.visibleLineCount = this.calculateVisibleLineCount(props.viewableAreaHeight, props.lineHeight)
    }

    public calculateVisibleLineCount(viewablAreaHeight: number, lineHeight: number): number {
        return Math.floor(viewablAreaHeight / lineHeight);
    }

    private calculateFirstVisibleElementIndex(): number {
        return Math.floor(this.currentScrollPosition / this.lineHeight);
    }

    private calculateLastVisibleElementIndex(): number {
        return this.calculateFirstVisibleElementIndex() + (this.viewablAreaHeight / this.lineHeight);
    }

    private calculateLeadingPlaceholderHeight(): number {
        return (this.totalLines.length - this.calculateFirstVisibleElementIndex() - this.buffer) * this.lineHeight;
    }

    private calculateTrailingPlaceholderHeight(): number {
        return (this.totalLines.length - this.calculateLastVisibleElementIndex() + this.buffer) * this.lineHeight;
    }
}