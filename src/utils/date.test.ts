import {   formattedFetchDate,
  formattedInsertDate } from "./date"

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
  