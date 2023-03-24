import React from 'react'
import 'react-day-picker/dist/style.css';
import Icon from 'components/tools/icons/Icon';
import styled from 'styled-components';
import { useClickOutside } from 'functions/hooks/useClickOutside';

const inputProps = (props) => {
    return ({
        className: props.inputClassName,
        type: props.type,
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
        onInput: props.onInput,
        onClick: props.onClick,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onKeyUp: props.onKeyUp,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        readOnly: props.readOnly,
        disabled: props.disabled,
        min: props.min,
        max: props.max
    })
}

export const ClassicInput = (props) => {
    const { useRef, value, defaultValue, className, cross, onClean } = props
    return (
        <InputClassic className={`${className ? 'classic-input ' + className : 'classic-input'}`}>
            <input
                ref={useRef}
                {...inputProps(props)}
            />
            {cross &&
                ((value || defaultValue) &&
                    (value?.length > 0 || defaultValue?.length > 0)) && (
                    <div onClick={onClean} className="svg_container">
                        <Icon name="Cross" className="cross" />
                    </div>
                )}
        </InputClassic>
    )
}

const InputClassic = styled.div`
    position    : relative;
    display     : flex;
    align-items : center;
    max-width   : 300px;
    z-index     : 10;

    input {
        display       : block;
        height        : 44px;
        padding       : 8px 12px;
        color         : var(--input-text);
        background    : var(--input);
        border-radius : var(--rounded-sm);
        border        : 1px solid var(--light-border);
        outline       : none;
        z-index       : 10;

        &::placeholder {
            color : var(--placeholder);
        }

        &:focus {
            border     : 1px solid var(--primary);
            box-shadow : none;
        }
    }

    .svg_container {
        position      : absolute;
        bottom        : 10px;
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
            color    : var(--text-tertiary);
        }

        &:hover {
            background : var(--content-light);
        }
    }

    &.full {
        flex-grow : 1;
        max-width : unset;
        input {
            flex-grow : 1;
        }
    }

    &.small {
        height : 36px;
        input {
            height : 36px;
        }
    }

    &.succes {
        input {
            background : rgba(var(--green-rgb), 0.07);
        }
    }
    &.err {
        input {
            background : rgba(var(--red-rgb), 0.1);
        }
    }
`

/**
 * 
 */

export const DropdownInput = (props) => {
    const { value, className, onClean, cross, position } = props
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef()
    useClickOutside(ref, () => setOpen(false))

    return (
        <InputDropdown ref={ref} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`} position={position}>
            <input
                {...inputProps(props)}
                onClick={() => setOpen(!open)}
            />
            {cross &&
                value &&
                value.length > 0 ? (
                <Icon name="Cross" className="cross" onClick={onClean} />
            ) : (
                <Icon name="CaretDown" />
            )}
            {open &&
                <div className="dropdown-input-choices custom-scrollbar" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            }
        </InputDropdown>
    )
}

const InputDropdown = styled.div`
    position      : relative;
    height        : 44px;
    background    : var(--input);
    border        : 1px solid var(--light-border);
    border-radius : var(--rounded-sm);
    cursor        : pointer;

    input {
        padding            : 10px;
        color              : var(--input-text);
        background         : var(--input);
        border-radius      : var(--rounded-sm);
        outline            : none;
        border             : none;
        cursor             : pointer;
        width              : 85%;
        height             : 100%;
        text-overflow      : ellipsis;
        overflow           : hidden;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
        caret-color        : transparent;

        &::placeholder {
            color : var(--placeholder);
        }
    }

    svg {
        position : absolute;
        height   : 16px;
        width    : 16px;
        bottom   : 12px;
        right    : 10px;
        color    : var(--text-secondary);
    }

    .dropdown-input-choices {
        position      : absolute;
        left          : 0;
        bottom        : ${props => props.position === 'top' && '100%'};
        width         : 100%;
        max-height    : 300px;
        overflow-y    : auto;
        background    : var(--content);
        border-radius : var(--rounded-sm);
        box-shadow    : ${props => props.position === 'top' ? 'var(--shadow-top)' : 'var(--shadow-smooth)'};
        z-index       : 100;
        border        : 1px solid var(--light-border);

        div {
            padding    : 8px 12px;
            color      : var(--text);
            background : var(--content);
            cursor     : pointer;

            &:hover {
                background-color : var(--content-light);
            }
        }
    }

    &.full {
        flex-grow : 1;
        max-width : unset;
        input {
            flex-grow : 1;
        }
    }
`

/**
 * 
 */

export const IconInput = (props) => {
    const { useRef, value, className, icon, endIcon, cross, onClean, endIconClick } = props
    return (
        <InputIcon className={`${className ? "icon-input " + className : "icon-input"}`}>
            <input
                ref={useRef}
                {...inputProps(props)}
            />
            {icon &&
                <div className="start_icon">
                    {icon}
                </div>
            }
            {cross ? (
                (value && value.length > 0) ? (
                    <div onClick={onClean} className="svg_container">
                        <Icon name="Cross" className="cross" />
                    </div>
                ) : (
                    endIcon && (
                        <div className="end_icon" onClick={endIconClick}>
                            {endIcon}
                        </div>
                    )
                )
            ) : (
                endIcon && (
                    <div className="end_icon" onClick={endIconClick}>
                        {endIcon}
                    </div>
                )
            )}
        </InputIcon>
    )
}

const InputIcon = styled.div`
    position      : relative;
    width         : 100%;
    height        : 44px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-sm);

    input {
        display       : block;
        position      : absolute;
        width         : 100%;
        height        : 100%;
        padding       : 4px 12px 4px 20px;
        border-radius : var(--rounded-sm);
        outline       : none;
        background    : transparent;
        z-index       : 1;
        border        : 1px solid var(--light-border);
        box-shadow    : var(--shadow-relief);
        color         : var(--input-text);

        &:focus {
            border : 1px solid var(--primary);
            + label {
                transform  : scale(0.75);
                top        : 4px;
                transition : 0.2s ease;
                padding    : 0 0 0 64px;
            }
        }

        &::placeholder {
            color : var(--placeholder);
        }
    }

    label {
        position         : absolute;
        top              : 15px;
        color            : var(--placeholder);
        padding          : 0 0 0 50px;
        transform        : scale(1);
        transform-origin : 0;
        transition       : 0.2s ease;
        z-index          : 0;
    }

    &.is_start_icon {
        input {
            padding : 6px 12px 6px 40px;
        }
    }

    .start_icon {
        height           : 100%;
        position         : absolute;
        bottom           : 0;
        display          : flex;
        align-items      : center;
        padding          : 0 0 0 13px;
        transform        : scale(1);
        transform-origin : 0;

        svg {
            height : 20px;
            width  : 20px;
            color  : var(--placeholder);
        }
    }

    .end_icon {
        position  : absolute;
        right     : 15px;
        top       : 55%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            color  : var(--placeholder);
            height : 16px;
            width  : 16px;
        }
    }

    .svg_container {
        position      : absolute;
        bottom        : 8px;
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
            color    : var(--text-tertiary);
        }

        &:hover {
            background : var(--content-light);
        }
    }

    &.full {
        flex-grow : 1;
        max-width : unset;
        input {
            flex-grow : 1;
        }
    }

    &.succes {
        input {
            background : rgba(var(--green-rgb), 0.07);
        }
    }
    &.err {
        input {
            background : rgba(var(--red-rgb), 0.1);
        }
    }
`

/**
 * 
 */

export const Textarea = (props) => {
    const { className, useRef } = props
    return (
        <TextareaInput
            ref={useRef}
            className={`${className ? "textarea " + className : "textarea"}`}
            {...inputProps(props)}
        />
    )
}

const TextareaInput = styled.textarea`
    display       : block;
    min-height    : 50px;
    height        : 100px;
    max-height    : 500px;
    width         : 100%;
    overflow-y    : auto;
    padding       : 8px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-sm);
    border        : 1px solid var(--light-border);
    outline       : none;

    &:focus {
        border     : 1px solid var(--primary);
        box-shadow : none;
    }

    &:focus-visible {
        outline : none;
    }

    &::placeholder {
        color : var(--placeholder);
    }

    &::-webkit-scrollbar {
        width : 10px;
    }
    &::-webkit-scrollbar-track {
        background : transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color : var(--light-border);
        border           : 3px solid var(--content-light);
        border-radius    : 10px;
    }

    &::-webkit-scrollbar-corner {
        background : transparent;
    }

    &.succes {
        background : rgba(var(--green-rgb), 0.07);
    }
    &.err {
        background : rgba(var(--red-rgb), 0.1);
    }
`

/**
 * 
 */

export const DynamicInput = (props) => {
    const { className, text, startIcon, endIcon, endIconClick } = props
    return (
        <InputDynamic className={`${className ? 'dynamic-input ' + className : 'dynamic-input'}`}>
            <input
                {...inputProps(props)}
            />
            <label>
                {text}
            </label>
            {startIcon &&
                <div className="start_icon">
                    {startIcon}
                </div>
            }
            {endIcon &&
                <div className="end_icon" onClick={endIconClick}>
                    {endIcon}
                </div>
            }
        </InputDynamic>
    )
}

const InputDynamic = styled.div`
    position      : relative;
    display       : flex;
    align-items   : center;

    input {
        display       : block;
        height        : 44px;
        padding       : ${props => props.startIcon ? "6px 12px 6px 40px" : "8px 12px"};
        color         : var(--input-text);
        outline       : none;
        background    : transparent;
        border        : 1px solid var(--light-border);
        border-radius : var(--rounded-sm);
        z-index       : 1;

        &:placeholder-shown {
            + label {
                font-size   : 14px;
                transform   : translateY(-50%);
                transition  : .2s ease;
                z-index     : 0;
            }
        }

        &:focus {
            border : 1px solid var(--primary);
            + label {
                position   : absolute;
                top        : 50%;
                color      : var(--primary);
                transform  : translateY(-175%);
                font-size  : 11px;
                transition : .2s ease;
                z-index    : 2;
            }
        }
    }

    label {
        position    : absolute;
        left        : ${props => props.startIcon ? "35px" : "20px"};
        left        : 12px;
        top         : 50%;
        padding     : 0 5px;
        color       : var(--placeholder);
        background  : var(--content);
        transform   : translateY(-175%);
        font-size   : 11px;
        line-height : 16px;
        transition  : .2s ease;
        z-index     : 2;
    }

    .start_icon {
        height           : 100%;
        position         : absolute;
        bottom           : 0;
        display          : flex;
        align-items      : center;
        padding          : 0 0 0 13px;
        transform        : scale(1);
        transform-origin : 0;

        svg {
            height : 20px;
            width  : 20px;
            color  : var(--placeholder);
        }
    }

    .end_icon {
        position  : absolute;
        right     : 20px;
        top       : 50%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            color  : var(--placeholder);
            height : 20px;
            width  : 20px;
        }
    }

    &.full {
        width : 100%;
        input  {
            width : 100%;
        }
    }

    &.succes {
        input {
            border : 1px solid var(--success);
            + label {
                color : var(--success);
            }
        }
        .end_icon {
            display : none;
        }
    }
    &.err {
        input {
            border : 1px solid var(--danger);
            + label {
                color : var(--danger);
            }
        }
        .end_icon {
            display : none;
        }
    }
`