import {   formattedFetchDate,
  formattedInsertDate, convertTimeFormat } from "./date"

  describe("formattedInsertDate", () => {
    it("should have result correct formated", () => {
      const formattedDate = formattedInsertDate()
      const regex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(formattedDate).toMatch(regex)
    })
  })

  describe("formattedFetchDate", () => {
    it("should have result correct formated", () => {
      const formattedDate = formattedFetchDate()
      const regex = /^\d{8}$/;
      expect(formattedDate).toMatch(regex)
    })
  })

  describe("convertTimeFormat", () => {
    it("should have result correct formated", () => {
      const formattedDate = convertTimeFormat("1:40")
      const expected = "01:40"
      expect(formattedDate).toEqual(expected)
    })
    it("should have result correct formated", () => {
      const formattedDate = convertTimeFormat("0:40")
      const expected = "00:40"
      expect(formattedDate).toEqual(expected)
    })
  })
  