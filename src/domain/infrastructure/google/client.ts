import { Row } from "../../entites/row";
import { SheetIdEnums } from "../../values/enums/sheetId";

export type IGoogleShpreadSheetClient = {
  save(insertDatas: Row[], sheetId: SheetIdEnums): Promise<void>;
  getNextId(sheetId: SheetIdEnums): Promise<number>;
}
