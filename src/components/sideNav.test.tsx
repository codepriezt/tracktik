import React from "react"
import {shallow } from "enzyme"
import SideNav from "./sideNav"

describe('<sideNav/>', () => {
    it('render side menu', () => {
        expect(shallow(<SideNav />)).toMatchSnapshot()
    })
})


