import { Context, Schema } from 'koishi'

export const name = 'num-theory-analyzer'
export const usage = `## 输入 📥

单个整数，可以用逗号(中英文逗号均可)或空格分隔多个整数。

## 输出 📤

- 是否为质数(是/否) 🌟
- 因数个数 🧮
- 所有因数列表 📋
- 是否可以表示为两个整数的平方和(是/否) 🚀
- 如果可以,输出两个整数 🎲
- 是否满足格式 1+2+3+...+n 的和(是/否) 🌈
- 如果满足,输出整数 n 🎯`

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

class NumberTheoryAnalysis {
  private input: number;

  constructor(input: number) {
    this.input = input;
  }

  isPrime(): boolean {
    if (this.input <= 1) {
      return false;
    }
    for (let i = 2; i * i <= this.input; i++) {
      if (this.input % i === 0) {
        return false;
      }
    }
    return true;
  }

  getFactors(): number[] {
    let factors: number[] = [];
    for (let i = 1; i <= this.input; i++) {
      if (this.input % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  }

  isSumOfSquares(): boolean {
    for (let a = 0; a * a <= this.input; a++) {
      let bSquared = this.input - a * a;
      if (Number.isInteger(Math.sqrt(bSquared))) {
        return true;
      }
    }
    return false;
  }

  findSquaresSumNumbers(): [number, number] | [] {
    for (let a = 0; a * a <= this.input; a++) {
      let bSquared = this.input - a * a;
      if (Number.isInteger(Math.sqrt(bSquared))) {
        return [a, Math.sqrt(bSquared)];
      }
    }
    return [];
  }

  isSumOfSequence(): [boolean, number?] {
    let sum = 0;
    for (let n = 1; ; n++) {
      sum += n;
      if (sum === this.input) {
        return [true, n];
      }
      if (sum > this.input) {
        return [false];
      }
    }
  }

  showAnalysis(): string[] {
    let output: string[] = [];
    output.push("\n数字:" + this.input);
    if (this.isPrime()) {
      output.push("质数判断:是");
    } else {
      output.push("质数判断:否");
    }
    let factors = this.getFactors();
    output.push("因数个数:" + factors.length);
    output.push("因数:" + JSON.stringify(factors));
    if (this.isSumOfSquares()) {
      output.push("平方和判断:是");
      let numbers = this.findSquaresSumNumbers();
      output.push("两个整数:" + numbers[0] + " " + numbers[1]);
    } else {
      output.push("平方和判断:否");
    }
    let sumOfSeqResult = this.isSumOfSequence();
    if (sumOfSeqResult[0]) {
      output.push("格式判定:是,n=" + sumOfSeqResult[1]);
    } else {
      output.push("格式判定:否");
    }
    return output;
  }
}

export function apply(ctx: Context) {

  ctx.command('NumTheoryAnalyzer <nums:text>', ' 数字分析 ')
    .action(({ session }, nums) => {
      let arr = nums.trim().split(/[,，\s]+/);
      let finalOutput: string[] = [];
      arr.forEach(num => {
        let output = test(parseInt(num));
        finalOutput = finalOutput.concat(output);
      });
      session.send(finalOutput.join("\n"));
    })

  function test(input: number): string[] {
    let nta = new NumberTheoryAnalysis(input);
    return nta.showAnalysis();
  }
}