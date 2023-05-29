export class DataStream {
    private name: string;
    private updateFrequency: number;
    private isActive: boolean;
    private data: string[];
    private dataLength: number;
    private onDataReceived: (line: string) => void;

    constructor(name: string, updateFrequency: number = 100, isActive: boolean = true, dataLength: number = 100, onDataReceived: (line: string) => void) {
        this.name = name;
        this.updateFrequency = updateFrequency;
        this.isActive = isActive;
        this.data = [];
        this.dataLength = dataLength;
        this.onDataReceived = onDataReceived;
    }

    private getRandomBetween(min: number, max: number): number {
        return Number((Math.random() * (max - min) + max).toFixed(2));
    }

    private generateData() {
        // this method returns dummy accelerometer data:
        // `X:-132.90 Y:-70.70 Z:-100.40 qw:0.78 qx:0.07 qy:-0.42 qz:-0.37`

        setInterval(() => {
            let x: number = this.getRandomBetween(-180, 180);
            let y: number = this.getRandomBetween(-180, 180);
            let z: number = this.getRandomBetween(-180, 180);
            let qw: number = this.getRandomBetween(-1, 1);
            let qx: number = this.getRandomBetween(-1, 1);
            let qy: number = this.getRandomBetween(-1, 1);
            let qz: number = this.getRandomBetween(-1, 1);

            let line: string = `X:${x} Y:${y} Z:${z} qw:${qw} qx:${qx} qy:${qy} qz:${qz}`;
            this.data.push(line);

            this.onDataReceived(line)

        }, this.updateFrequency)
    }


    public getDataStream() {
        return {
            name: this.name,
            updateFrequency: this.updateFrequency,
            active: this.isActive,
            data: this.data,
            dataLength: this.dataLength
        }
    }
}