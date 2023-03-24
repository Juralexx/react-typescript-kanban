import React from 'react'
import styled from 'styled-components'
import { TaskProps } from 'types/types'
import Icon from './tools/icons/Icon'
import { useClickOutside } from 'functions/hooks/useClickOutside'
import { addActive } from 'functions/Utils'
import { colors, modifyTaskColor } from 'functions/task'
import { SocketContext, UsersContext } from 'contexts'
import { useDispatch } from 'react-redux'

interface Props {
    task: TaskProps,
}

const Palette: React.FC<Props> = ({ task }) => {
    const paletteRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const [palette, setPalette] = React.useState<boolean>(false)
    useClickOutside(paletteRef, () => setPalette(false))

    const { allUsers } = React.useContext(UsersContext)
    const { websocket } = React.useContext(SocketContext)
    const dispatch = useDispatch()

    return (
        <PaletteContainer className={`palette ${addActive(palette)}`} ref={paletteRef}>
            <Icon
                name="Palette"
                className={`__buttons ${addActive(palette)}`}
                onClick={() => setPalette(!palette)}
            />
            {palette &&
                <div className='palette__displayer'>
                    {colors.map((color, i) => {
                        return (
                            <div key={i}
                                className={`palette__item ${addActive(task.color === color)}`}
                                style={{ backgroundColor: color }}
                                onClick={() => modifyTaskColor(task, color, allUsers, websocket, dispatch)}
                            >
                                {task.color === color && <Icon name="Check" />}
                            </div>
                        )
                    })}
                </div>
            }
        </PaletteContainer>
    )
}

export default Palette

const PaletteContainer = styled.div`
    position   : relative;
    z-index    : 100;
    width      : 0;
    opacity    : 0;
    visibility : hidden;
    transition : visibility .2s, opacity .2s, width .4s;
    
    &.active {
        visibility : visible;
        opacity    : 1;
        width      : 32px !important;
        transition : visibility .4s, opacity .4s, width .2s;
    }

    .__buttons {
        height        : 32px;
        width         : 32px;
        padding       : 6px;
        margin        : 0 2px;
        border-radius : var(--rounded-full);
        cursor        : pointer;

        &:nth-child(3) {
            transform: scale(-1, 1);
        }

        &:hover,
        &.active {
            background-color : var(--content-light);
        }
    }

    .palette__displayer {
        position      : absolute;
        top           : 100%;
        left          : -55px;
        width         : 146px;
        padding       : 5px;
        display       : flex;
        align-items   : center;
        flex-wrap     : wrap;
        background    : var(--body);
        border-radius : var(--rounded-lg);
        box-shadow    : var(--shadow-tiny);
    }

    .palette__item {
        position      : relative;
        height        : 30px;
        width         : 30px;
        border-radius : var(--rounded-full);
        margin        : 2px;

        &:first-child {
            border : 1px solid var(--light-border);
        }

        &:hover,
        &.active {
            border : 2px solid #a142f4;
        }

        svg {
            position      : absolute;
            top           : -5px;
            right         : -5px;
            padding       : 1px;
            border-radius : var(--rounded-full);
            color         : white;
            background    : #a142f4;
        }
    }
`