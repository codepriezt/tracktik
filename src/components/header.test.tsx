import React from "react"
import {shallow} from "enzyme"
import Header from "./header"

describe('test header component ' , () => {
    it('return a string  form the document element for the toggle button ' , () => {
            expect(shallow(<Header/>)).toMatchSnapshot()
             
    })
})