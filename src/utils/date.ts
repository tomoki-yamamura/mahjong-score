function getTodayDate(): string[]{
  const today = new Date();
  const year = `${today.getFullYear()}`;
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return [year, month, day];
}

function formattedFetchDate() : string {
  const [year, month, day] = getTodayDate();
  // return `${year}${month}${day}`;
  return "20240601"
}

function formattedInsertDate() : string {
  const [year, month, day] = getTodayDate();
  return `${year}-${month}-${day}`;
}

function convertTimeFormat(timeString: string): string {
  if (/^\d:\d{2}$/.test(timeString)) {
      const parts = timeString.split(':');
      const hour = parts[0].padStart(2, '0');
      const minute = parts[1];
      return hour + ':' + minute;
  } else {
      return timeString;
  }
}

export { formattedFetchDate, formattedInsertDate, convertTimeFormat}