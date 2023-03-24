import React from 'react'
import { DayPicker, useInput } from 'react-day-picker'
import fr from 'date-fns/locale/fr';
import styled from 'styled-components'
import { useClickOutside } from 'functions/hooks/useClickOutside';

export const DatePicker = (props) => {
    const { open, setOpen, selected, onDayClick, fromDate } = props
    const ref = React.useRef()
    useClickOutside(ref, () => {
        if (typeof open === 'object') 
            setOpen(prevSate => ({ ...prevSate, state: false }))
        else setOpen(false)
    })

    const { dayPickerProps } = useInput({
        fromYear: 2010,
        toYear: 2030,
        fromDate: fromDate,
        format: 'dd/mm/yyyy',
        required: true
    })

    return (
        open && (
            <DatePickerWrapper className='datepicker-wrapper'>
                <DatePickerComponent className="datepicker" ref={ref}>
                    <DayPicker
                        {...dayPickerProps}
                        mode="single"
                        selected={selected}
                        onDayClick={onDayClick}
                        locale={fr}
                        modifiersClassNames={{
                            selected: 'selected',
                            today: 'today'
                        }}
                    />
                </DatePickerComponent>
            </DatePickerWrapper>
        )
    )
}

const DatePickerComponent = styled.div`
    position      : absolute;
    background    : var(--content);
    border-radius : var(--rounded-sm);
    z-index       : 700;
    box-shadow : var(--shadow-smooth), var(--shadow-relief);

    .rdp {
        .selected {
            background-color : var(--primary);
            color            : var(--white);
            border-radius    : 5px;
            border           : none;
            outline          : none;
        }

        .today {
            background-color : var(--content-light);
            border-radius    : var(--rounded-md);
        }

        .rdp-button {
            &:hover, &:focus {
                background-color : var(--primary);
                border           : none;
                border-radius    : var(--rounded-md);
                color            : var(--white);
            }
        }

        .rdp-caption_label {
            margin  : 0;
            padding : 5px;
        }

        .rdp-nav {
            display : flex;

            .rdp-nav_button_previous, .rdp-nav_button_next {
                display       : flex;
                align-items   : center;
                background    : var(--content-light);
                border-radius : 5px;
                margin        : 0 3px;
                transform     : scale(1);

                svg {
                    bottom : unset;
                    right  : unset;
                }

                &:hover {
                    background-color : rgba(var(--primary-rgb), 0.8);
                    svg {
                        color : var(--white);
                    }
                }

                &:active {
                    transform  : scale(0.9);
                    box-shadow : none;
                }
            }
        }

        h2 {
            &:before, &:after {
                content : none;
                display : none;
            }
        }
    }
`

const DatePickerWrapper = styled.div`
    position        : fixed;
    top             : 0;
    right           : 0;
    bottom          : 0;
    left            : 0;
    overflow-x      : hidden;
    overflow-y      : auto;
    visibility      : visible;
    z-index         : 100000000000;
    display         : flex;
    align-items     : center;

    .datepicker {
        top       : 50%;
        left      : 50%;
        transform : translate(-50%, -50%);
        z-index   : 1000000000000;
    }
`