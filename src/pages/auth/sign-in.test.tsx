import React from "react"
import {shallow} from "enzyme"
import SignIn from "./sign-in"

describe('<signIn/> component' , () => {







it("render" , () => {
        expect(shallow(<SignIn/> )).toMatchSnapshot()
})
})