import React from 'react'
import styled from 'styled-components';
import { UserProps } from 'types/types'
import useLogout from "functions/hooks/useLogout";
import { addActive } from 'functions/Utils'
import { useClickOutside } from 'functions/hooks/useClickOutside';

interface Props {
    user: UserProps,
}

const UserMenu = ({ user }: Props) => {
    const menuRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const [menu, setMenu] = React.useState<boolean>(false)
    useClickOutside(menuRef, () => setMenu(false))

    const { logout } = useLogout(user)

    return (
        <div className="nav__item" onClick={() => setMenu(!menu)} ref={menuRef}>
            <p className="nav__pseudo">{user.pseudo}</p>
            <img className="nav__avatar" src={user.picture} alt={user.pseudo} />
            <Menu className={addActive(menu)}>
                <div className="user__menu-header">
                    Signed in as <span>{user.pseudo}</span>
                </div>
                <hr className="dropdown-divider"></hr>
                <div className="user__menu-bottom" onClick={logout}>
                    Sign out
                </div>
            </Menu>
        </div>
    )
}

export default UserMenu

const Menu = styled.div`
    position      : absolute;
    right         : 30px;
    top           : 90%;
    padding       : 5px 0;
    background    : var(--content);
    border-radius : var(--rounded-md);
    box-shadow    : var(--shadow-smooth), var(--shadow-relief);
    border        : 1px solid var(--light-border);
    visibility    : hidden;
    opacity       : 0;
    transition    : visibility .2s, opacity .5s;

    &.active {
        visibility : visible;
        opacity    : 1;
        transition : visibility .4s, opacity .4s;
    }

    &::before {
        content    : '';
        position   : absolute;
        top        : -7px;
        right      : 7px;
        width      : 15px;
        height     : 15px;
        background : var(--content);
        transform  : rotate(45deg);
    }

    .user__menu-header {
        padding     : 8px 14px 0;
        min-width   : 180px;
        span {
            margin-left : 2px;
            font-weight : 600;
        }
    }

    .dropdown-divider {
        display    : block;
        border-top : 1px solid var(--light-border);
        height     : 0;
        margin     : 8px 0;
        
    }

    > div:not(.user__menu-header),
    > a {
        display     : flex;
        align-items : center;
        min-width   : 180px;
        text-align  : left;
        padding     : 8px 14px;
        color       : var(--text);
        cursor      : pointer;

        svg {
            height       : 16px;
            width        : 16px;
            margin-right : 9px;
            color        : var(--svg-x-light);
        }

        a {
            display     : flex;
            align-items : center;
            width       : 100%;
            height      : 100%;
        }

        &:hover {
            background-color : var(--content-light);
            svg {
                color : var(--primary);
            }
        }

        &.red {
            color : var(--red);
            svg {
                color : var(--red);
            }
        }
    }
`