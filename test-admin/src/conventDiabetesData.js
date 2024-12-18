const fs = require('fs');
const path = require('path');

// 读取源文件
const inputPath = path.join(__dirname, 'diabetesDataProvider.ts');
const outputPath = path.join(__dirname, 'diabetesDataProvider.new.ts');

// 读取文件内容
let content = fs.readFileSync(inputPath, 'utf8');

// 提取数据行
const dataLines = content.match(/\{"Pregnancies"[^}]+\}/g) || [];

// 转换数据
const formattedData = dataLines.map((line, index) => {
  const data = JSON.parse(line);
  return {
    id: index + 1,
    ...data
  };
});

// 生成新的文件内容
const newContent = `import fakeDataProvider from "ra-data-fakerest";

// 读取糖尿病数据集并转换为数组对象
export const diabetesDataProvider = fakeDataProvider({
  patients: ${JSON.stringify(formattedData, null, 2)}
});
`;

// 写入新文件
fs.writeFileSync(outputPath, newContent);

console.log('数据转换完成！新文件已保存为:', outputPath);