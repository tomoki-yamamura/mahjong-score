import { formattedInsertDate } from "../utils/date";


function extractNumberFromValue(inputString: string, targetValue: string): number | null {
  const pattern = new RegExp(`${targetValue}\\(([-+]?\\d+(?:\\.\\d+)?)\\)`);
  const match = inputString.match(pattern);
  if (match && match[1]) {
      return parseFloat(match[1]);
  }
  return null;
}

const extractTimestamp = (extractScorePart: string): string | null => {
  const timePattern = /\|\s(\d{2}:\d{2})\s\|/;
  const match = extractScorePart.match(timePattern);

  if (match && match.length > 1) {
    const time = match[1];
    return time;
  } else {
    return null;
  }
}

const changeMaxValue = (values: (number | string)[]): (number | string)[] => {
  const numericValues = values.map(val => typeof val === 'number' ? val : 0);
  
  const sum = numericValues.reduce((acc, val) => acc + val, 0);
  if (sum !== 0) {
    const max = Math.max(...numericValues);
    const maxIndex = numericValues.indexOf(max);
    const sumExcludeMax = numericValues.reduce((acc, cur, index) => index === maxIndex ? acc : acc + cur, 0);
    const adjustedMax = -sumExcludeMax;
    numericValues[maxIndex] = adjustedMax;
  }
  
  const result = values.map((val, index) => typeof val === 'number' ? numericValues[index] : val);
  return result;
}

function dateAndTimestampIndex(headers: string[]): [number, number] {
  const dateIndex = headers.indexOf('Date');
  const timeStampIndex = headers.indexOf('Timestamp');
  return [dateIndex, timeStampIndex]
}

function convertToScoreMetrix(rawArray: string[], headers: string[]): (string | number)[][] {
  const result: (string | number)[][] = [];
  const [dateIndex, timeStampIndex] = dateAndTimestampIndex(headers)
  rawArray.forEach(element => {
    const values: (number | string)[] = Array(headers.length).fill('');
    headers.forEach((header, headerIndex) => {
      if (element.includes(header)) {
        const score = extractNumberFromValue(element, header) || 0
        values[headerIndex] = Math.round(score)
      }
    })
    const changeMaxValueResult = changeMaxValue(values)
    const addDateandTimestamp: (string | number)[] = [...changeMaxValueResult]
    addDateandTimestamp[dateIndex] = formattedInsertDate();
    addDateandTimestamp[timeStampIndex] = extractTimestamp(element) || 0;
    result.push(addDateandTimestamp)
  });
  return result;
}

export {
  convertToScoreMetrix
}