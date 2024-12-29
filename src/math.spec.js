import { isEven } from "./math";

describe("Is Even" , ()=>{
    it("should return true if given even number" , ()=>{
        //function under test 
        const result = isEven(2);
        expect(result).toEqual(true)
    });
    it("should return false if given odd number" , ()=>{
        //function under test 
        const result = isEven(1);
        expect(result).toEqual(false)
    });
})