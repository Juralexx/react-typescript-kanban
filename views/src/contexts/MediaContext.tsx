import React from 'react'
import useMediaQuery from 'functions/hooks/useMediaQuery'

interface ContextProps {
    children: React.ReactNode | string | JSX.Element | JSX.Element[];
}

interface MediaContextProps {
    xs: boolean,
    sm: boolean,
    md: boolean,
    lg: boolean,
    xl: boolean
}

const defaultMediaContextProps : MediaContextProps = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
}

export const MediaContext = React.createContext<MediaContextProps>(defaultMediaContextProps)

const MediaContextProvider = ({ children }: ContextProps) => {
    const xs = useMediaQuery('(max-width: 576px)')
    const sm = useMediaQuery('(max-width: 768px)')
    const md = useMediaQuery('(max-width: 992px)')
    const lg = useMediaQuery('(max-width: 1200px)')
    const xl = useMediaQuery('(max-width: 1366px)')

    return (
        <MediaContext.Provider value={{ xs, sm, md, lg, xl }}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaContextProvider