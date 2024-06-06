import { SheetIdEnums } from "../values/enums/sheetId";

class TenhoScoreList {
  private list: string[];
  constructor(list: string[]) {
    this.list = list;
  }

  filterPlayersBySheetId(sheetId: SheetIdEnums): string[] {
    switch (sheetId) {
      case "3players":
        return this.list.filter((line) => line.includes("三般南喰赤－"));
      case "4players":
        return this.list.filter((line) => line.includes("四般南喰赤－"));
      default:
        throw new Error("Invalid sheet type");
    }
  }
}

export default TenhoScoreList;
