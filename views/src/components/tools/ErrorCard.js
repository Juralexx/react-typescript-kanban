import styled from 'styled-components'
import Icon from './icons/Icon'

export const ErrorCard = (props) => {
    const { text, display, useRef, className, clean } = props

    return (
        display && (
            <Error
                className={className}
                ref={useRef}
                display={(display).toString()}
            >
                <Icon name="CrossCircle" className="error-icon" />
                <div className="is_error-content">
                    {text}
                </div>
                <Icon name="Cross" className="close-icon" onClick={clean} />
            </Error>
        )
    )
}

const Error = styled.div`
    position         : relative;
    display          : flex;
    align-items      : center;
    padding          : 5px 5px;
    margin-top       : 5px;
    max-width        : 100%;
    font-size        : 13px;
    background-color : rgba(var(--danger-rgb), 0.25);
    border-radius    : var(--rounded-sm);
    border           : 1px solid rgba(var(--danger-rgb), 0.45);
    border-left      : 5px solid var(--danger);

    .is_error-content {
        padding-right : 10px;
    }

    .text {
        padding-right : 10px;
    }

    .error-icon {
        min-height   : 22px;
        min-width    : 22px;
        margin-right : 8px;
        color        : var(--danger);
    }

    .close-icon {
        position : absolute;
        top      : 5px;
        right    : 5px;
        height   : 18px;
        width    : 18px;
        cursor   : pointer;
    }
`