# koishi-plugin-num-theory-analyzer

[![npm](https://img.shields.io/npm/v/koishi-plugin-num-theory-analyzer?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-num-theory-analyzer)

## 插件目标 🎯

这个插件可以让你用 koishi 机器人对输入的整数进行一些有趣的数论分析，例如判断是否为质数，输出所有的因数，判断是否可以表示为两个整数的平方和，或者是否满足格式 1+2+3+...+n 的和。🔢

## 输入 📥

单个整数，可以用逗号(中英文逗号均可)或空格分隔多个整数。

## 输出 📤

- 是否为质数(是/否) 🌟
- 因数个数 🧮
- 所有因数列表 📋
- 是否可以表示为两个整数的平方和(是/否) 🚀
- 如果可以,输出两个整数 🎲
- 是否满足格式 1+2+3+...+n 的和(是/否) 🌈
- 如果满足,输出整数 n 🎯

## 主要功能 💡

1. 判断一个数是否为质数

   - 质数定义:只能被1和其本身整除的数
   - 判定方法:从2到根号n遍历,如果存在可以整除的数,则不是质数

2. 输出因数个数和所有因数

   - 遍历从1到n的所有整数,如果可以整除n则为因数,将其添加到因数列表

3. 判断是否为两个整数的平方和

   - 两层循环遍历两个整数,分别计算平方和,判断是否等于输入的数字

4. 判断是否满足格式 1+2+3+...+n 的和

   - 计算从1加到n的和,判断是否等于输入的数字
   - 如果等于,输出n的值

## 示例 🌟

输入:

```
15
```

输出:

```
数字:15
质数判断:否
因数个数:4
因数:[1, 3, 5, 15]  
平方和判断:否
格式判定:是,n=5
```

## 🙏 致谢

* [Koishi](https://koishi.chat/) - 机器人框架

## 📄 License

MIT License © 2023