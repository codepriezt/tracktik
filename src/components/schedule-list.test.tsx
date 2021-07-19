import React from "react"
import { shallow } from "enzyme"
import ScheduleList from "./schedule-list"

describe('<ScheduleList/>' , () => {
    
    const trigger = jest.fn()
    const data = {
        "id": "YSTiMn78waTfC",
        "clientId": "_z-4vYL5gmzEM",
        "title": "Toys Garage",
        "createdAt": "Sat May 15 2021 14:11:30 GMT+0000 (Coordinated Universal Time)",
        "updatedAt": "Thu Jun 17 2021 03:20:16 GMT+0000 (Coordinated Universal Time)",
        "contacts": {
            "main": {
                "id": "TqbNQgRA7mmFo",
                "firstName": "Brandon",
                "lastName": "Heathcote",
                "email": "Deven_Zulauf16@gmail.com",
                "phoneNumber": "027-974-9814",
                "jobTitle": "District Identity Consultant",
                "address": {
                    "zipCode": "67227",
                    "city": "West Lisette",
                    "street": "80506 Giles Loaf",
                    "country": "Republic of Korea",
                    "state": "Idaho"
                }
            }
        },
        "address": {
            "zipCode": "76075",
            "city": "New Shaun",
            "street": "2614 Kulas Locks",
            "country": "Malaysia",
            "state": "Arizona"
        },
        "images": [
            "http://lorempixel.com/640/480/city",
            "http://lorempixel.com/640/480/city"
        ],
        "tags": [
            "new",
            "state"
        ]
    }
   

    it('render the list of sites  ' , () => {
        expect(shallow(<ScheduleList data={data} onClick={trigger} />)).toMatchSnapshot()

    })   
})