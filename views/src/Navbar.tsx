import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { UserProps } from "types/types";
import Icon from "components/tools/icons/Icon";
import { TextButton } from "components/tools/Button";
import Logo from "components/tools/Logo";
import UserMenu from "components/UserMenu";
import { useStoreLastURL } from "functions/hooks/useStoreLastURL";
import { useClickOutside } from "functions/hooks/useClickOutside";
import { SearchContext } from "contexts";

interface Props {
    user: UserProps,
    uid: string | null
}

const Navbar: React.FC<Props> = ({ user, uid }) => {
    useStoreLastURL()
    const location = useLocation()
    const prevurl = localStorage?.getItem('prevUrl')
    useClickOutside()


    const { search, launchSearch } = React.useContext(SearchContext)

    return (
        <NavContainer>
            {!location.pathname.includes("register") && !location.pathname.includes("login") ? (
                <nav className="__navbar">
                    <div className='nav__container'>
                        <SearchInput>
                            <Link to='/search'>
                                <input
                                    className="nav__input"
                                    type="text"
                                    placeholder="Search for tasks..."
                                    value={search.query}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => launchSearch(e.target.value)}
                                />
                            </Link>
                            <div className="start_icon">
                                <Icon name="Search" />
                            </div>
                            {search.query.length > 0 &&
                                <div className="svg_container"
                                    onClick={() => launchSearch('')}
                                >
                                    <Icon name="Cross" className="cross" />
                                </div>
                            }
                        </SearchInput>
                        {uid ? (
                            <UserMenu user={user} />
                        ) : (
                            <div className="nav__item">
                                <TextButton>
                                    <Link to="/login">Connexion</Link>
                                </TextButton>
                            </div>
                        )}
                    </div>
                </nav>
            ) : (
                <nav className="__navbar">
                    <Link to={((prevurl && prevurl !== '/register' && prevurl !== '/login') && prevurl) || '/'} className="move-back">
                        <Icon name="ArrowLeft" />
                    </Link>
                    <div className="navbar__form-pages">
                        <Link to="/" className="logo__inner">
                            <Logo className="logo__main" />
                        </Link>
                        <div className="right">
                            {location.pathname.includes("login") && 'Connexion'}
                            {location.pathname.includes("register") && 'Inscription'}
                        </div>
                    </div>
                </nav>
            )}
        </NavContainer>
    )
}

export default Navbar;

const NavContainer = styled.header`
    position : relative;
    width    : 100vw;
    height   : 60px;
    z-index  : 2;

    .__navbar {
        position   : fixed;
        display    : flex;
        height     : 60px;
        width      : calc(100vw - 120px);
        background : var(--navbar);
        box-shadow : var(--shadow-x-smooth);
        z-index    : 800;
        transition : .2s;

        @media(max-width: 1200px) {
            width         : 100vw;
            box-shadow    : none;
            border-bottom : 1px solid var(--light-border);
        }

        .nav__container {
            position        : relative;
            display         : flex;
            justify-content : space-between;
            height          : 100%;
            width           : 100%;

            @media(max-width: 1200px) {
                margin-left  : auto;
                margin-right : 0;
            }
        }
    }

    .nav__item {
        position    : relative;
        display     : flex;
        align-items : center;
        padding     : 0 30px;
        cursor      : pointer;

        button {
            margin-right : 20px;
        }
    }

    .nav__pseudo {
        font-weight  : 600;
        font-size    : 18px;
        line-height  : 18px;
        margin-right : 10px;
        margin-top   : 2px;
        color        : var(--text);
    }

    .nav__avatar {
        height        : 34px;
        width         : 34px;
        border-radius : var(--rounded-full);
    }

    .navbar__form-pages {
        position        : relative;
        display         : flex;
        justify-content : center;
        align-items     : center;
        padding         : 10px 20px;
        margin          : 0 auto;

        .logo__inner {
            display       : flex;
            align-items   : center;
            width         : auto;
            height        : 100%;
            padding-right : 25px;

            .logo__main {
                height      : 36px;
                width       : auto;
                margin-left : 4px;
                color       : var(--white);
            }
        }

        .right {
            display         : flex;
            align-items     : center;
            justify-content : center;
            padding-left    : 25px;
            font-size       : 18px;
            color           : var(--white);
            border-left     : 2px solid var(--light-border);
        }
    }

    .move-back {
        position         : absolute;
        top              : 50%;
        transform        : translateY(-50%);
        left             : 30px;
        padding          : 8px;
        color            : var(--white);
        background-color : var(--x-light);
        border-radius    : var(--rounded-full);
        cursor           : pointer;

        svg {
            height : 23px;
            width  : 23px;
        }

        &:hover {
            background-color : var(--primary);
        }
    }

    @media(max-width: 576px) {
        .navbar__form-pages {
            .logo__inner {
                padding-right : 15px;
            }

            .right {
                padding-left : 15px;
                font-size    : 16px;
            }
        }

        .move-back {
            left : 10px;
        }
    }
`

const SearchInput = styled.div`
    position : relative;
    width    : 70%;
    height   : 100%;
    color    : var(--input-text);

    @media(max-width: 1200px) {
        width : 90%;
    }

    input {
        display    : block;
        position   : absolute;
        width      : 100%;
        height     : 100%;
        padding    : 6px 12px 6px 40px;
        color      : var(--text);
        font-size  : 16px;
        outline    : none;
        border     : none;
        background : transparent;
        z-index    : 1;

        &::placeholder {
            color : var(--placeholder);
        }
    }

    &.is_start_icon {
        input {
            padding : 6px 12px 6px 40px;
        }
    }

    .start_icon {
        height      : 100%;
        position    : absolute;
        bottom      : 0;
        display     : flex;
        align-items : center;
        padding     : 0 0 3px 13px;

        svg {
            height : 22px;
            width  : 22px;
            color  : var(--placeholder);
        }
    }

    .svg_container {
        position      : absolute;
        top           : 50%;
        transform     : translateY(-50%);
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height           : 26px;
            width            : 26px;
            color            : var(--text);
            background-color : rgba(0, 0, 0, 0.12);
            padding          : 3px;
            border-radius    : var(--rounded-full);

            &:hover {
                background-color : rgba(0, 0, 0, 0.17);
            }
        }
    }
`