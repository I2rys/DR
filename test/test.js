//Dependencies
const DR = require("../index.js")

//Main
describe("Scan DR directory files", ()=>{
    it("should return all the files in the directory", async()=>{
        let files = await DR.files("../")

        expect(files.length).toBeGreaterThan(1)
    })
})