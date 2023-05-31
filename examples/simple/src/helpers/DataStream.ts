interface DataStreamProps {
    name: string;
    updateFrequency: number;
    isActive?: boolean;
    immediate?: boolean;
    dataLength?: number;
    onDataReceived: (line: string) => void;
}

export class DataStream {
    private name: string;
    private updateFrequency: number;
    private immediate: boolean;
    private isActive: boolean;
    private data: string[];
    private dataLength: number;
    private onDataReceived: (line: string) => void;

    constructor(props: DataStreamProps) {
        this.name = props.name;
        this.updateFrequency = props.updateFrequency;
        this.immediate = props.immediate ?? false;
        this.isActive = props.isActive ?? true;
        this.data = [];
        this.dataLength = props.dataLength ?? 40;
        this.onDataReceived = props.onDataReceived;
    }

    public connect() {
        this.isActive = true;
        this.generateData();
    }

    private getRandomBetween(min: number, max: number): number {
        return Number((Math.random() * (max - min) + max).toFixed(2));
    }

    private generateData() {
        let id: number = 0;
        let line: string = '';

        const generateSingleData = () => {
            id = this.data.length;

            if (this.data.length >= this.dataLength) {
                return;
            }

            let x: number = this.getRandomBetween(-180, 180);
            let y: number = this.getRandomBetween(-180, 180);
            let z: number = this.getRandomBetween(-180, 180);
            let qw: number = this.getRandomBetween(-1, 1);
            let qx: number = this.getRandomBetween(-1, 1);
            let qy: number = this.getRandomBetween(-1, 1);
            let qz: number = this.getRandomBetween(-1, 1);

            // we generate dummy data that you can expect from an accelerometer:
            line = `[${id}] X:${x} Y:${y} Z:${z} qw:${qw} qx:${qx} qy:${qy} qz:${qz}`;
            this.onDataReceived(line);
            this.data.push(line);
        }

        if (this.immediate) {
            while (this.data.length < this.dataLength) {
                generateSingleData();
            }
        } else {
            const intervalId = setInterval(() => {
                generateSingleData();
                if (this.data.length >= this.dataLength) {
                    clearInterval(intervalId);
                }
            }, this.updateFrequency)
        }
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