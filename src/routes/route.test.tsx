import React from 'react'
import { shallow , mount} from 'enzyme'
import ScheduleList from "../pages/schedules/list-schedules";
import ScheduleEdit from "../pages/schedules/edit-schedule"
import SignIn from "../pages/auth/sign-in"
import { MemoryRouter , Route } from 'react-router-dom';



it('mounts signIn  without crashing', () => {
    const wrapper = shallow(<SignIn/>)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
})

it('mounts ScheduleList without crashing', () => {
    const wrapper = shallow(<ScheduleList/>)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
})

describe('single schedule ' , () => {
    it('mounts Single Schedule  without crashing', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/schedule/mockid']} initialIndex={0}>
                <Route path="/schedule/:id" component={ScheduleEdit} />
                <ScheduleEdit />
            </MemoryRouter>
        );
    
        wrapper.unmount()
 })   
})
