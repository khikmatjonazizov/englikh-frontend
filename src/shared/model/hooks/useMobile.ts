import {useEffect, useState} from "react";

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => {
        if (window) {
            setIsMobile(window.innerWidth <= 450)
        }
    }

    useEffect(() => {
        handleMobile()

        window.addEventListener('resize', handleMobile)

        return () => window.removeEventListener('resize', handleMobile)
    }, [])

    return {
        isMobile
    }
};
