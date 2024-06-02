import TenhoScoreList from "../../collection/tenhoScoreList";

export type ITenhoClient = {
  getTenhoRoomScoreDatas(roomNumber: string): Promise<TenhoScoreList>;
}
