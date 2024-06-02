import TenhoScoreList from "../../domain/collection/tenhoScoreList";

export function createTenhoScoreList(scores: string[]): TenhoScoreList {
 return new TenhoScoreList(scores)
}
