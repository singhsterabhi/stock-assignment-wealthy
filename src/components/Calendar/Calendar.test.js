const rewire = require("rewire")
const Calendar = rewire("./Calendar")
const CalenderComponent = Calendar.__get__("CalenderComponent")
const MapDispatchToProps = Calendar.__get__("MapDispatchToProps")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new CalenderComponent()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("MapDispatchToProps", () => {
    test("0", () => {
        let callFunction = () => {
            MapDispatchToProps(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            MapDispatchToProps(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            MapDispatchToProps(7588892)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            MapDispatchToProps("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            MapDispatchToProps("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            MapDispatchToProps(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
