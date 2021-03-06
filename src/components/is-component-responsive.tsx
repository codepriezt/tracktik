import React from "react"
import { useMediaQuery } from 'react-responsive'


/**
 * 
      * @returns screen break point for a different devices be it desktop , mobile and tablet
 */
export default function Responsive(){

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({ query: '(max-device-width: 1224px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return{
        isDesktopOrLaptop,
        isTabletOrMobileDevice,
        isTabletOrMobile
    }
}





