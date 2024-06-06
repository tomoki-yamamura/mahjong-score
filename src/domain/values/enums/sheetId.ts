export const SheetId = {
  "3players": 0,
  "4players": 1,
} as const

export type SheetIdEnums = keyof typeof SheetId;
