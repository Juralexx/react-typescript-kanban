import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { UserProps } from 'types/types'
import Icon from 'components/tools/icons/Icon'

interface Props {
    user: UserProps
}

const Sidebar = ({ user }: Props) => {
    return (
        <SidebarContainer>
            <div className="sidebar__header">
                <Link to="/" className="sidebar__header-logo">
                    Kanban
                </Link>
            </div>
            <div className="sidebar__inner">
                <div className="sidebar__item">
                    <NavLink to='/'>
                        <Icon name="LayoutTopPanelOne" />
                        <div className="sidebar__item-name">
                            Boards
                        </div>
                    </NavLink>
                </div>
                <div className="sidebar__item">
                    <NavLink to='/activity'>
                        <Icon name="ToggleRight" />
                        <div className="sidebar__item-name">
                            Activity
                        </div>
                    </NavLink>
                </div>
            </div>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    position   : fixed;
    height     : 100vh;
    width      : 120px;
    min-width  : 120px;
    background : var(--content);
    z-index    : 1;
    box-shadow : var(--shadow-left);
    /* border-left : 2px solid var(--light-border); */

    .sidebar__header {
        width      : 100%;
        background : var(--primary);

        .sidebar__header-logo {
            display        : flex;
            flex-direction : column;
            align-items    : center;
            color          : var(--white);
            padding        : 20px 10px;
            font-size      : 20px;
            line-height    : 20px;
            font-weight    : 700;
        }

        svg {
            height        : 30px;
            width         : 30px;
            margin-bottom : 4px;
            color         : var(--white);
            cursor        : pointer;
            opacity       : 1;

            &:hover {
                color : var(--primary);
            }
        }
    }

    .sidebar__inner {
        position   : relative;
        height     : 100%;
        padding    : 10px 0;
        overflow-x : hidden;
        overflow-y : auto;
    }

    .sidebar__item {
        width : 100%;

        a {
            position        : relative;
            display         : flex;
            flex-direction  : column;
            align-items     : center;
            justify-content : center;
            padding         : 20px 0;

            &.active {
                background-color : var(--content-light);
                &::before {
                    position         : absolute;
                    content          : '';
                    width            : 4px;
                    height           : 100%;
                    background-color : var(--primary);
                    left             : 0;
                    top              : 0;
                    bottom           : 0;
                }
            }

            &:hover,
            &.active {
                svg,
                .sidebar__item-name {
                    color : var(--primary);
                }
            }
        }

        svg {
            width         : 24px;
            height        : 24px;
            margin-bottom : 3px;
            border-radius : var(--rounded-md);
            color         : var(--sidebar-color);

        }

        .sidebar__item-name {
            font-size   : 15px;
            font-weight : 700;
            color       : var(--sidebar-color);
        }
    }

    @media(max-width: 1200px) {
        top        : 60px;
        width      : 100%;
        max-width  : unset;
        height     : auto;
        box-shadow : var(--shadow-two);

        .sidebar__header {
            display : none;
        }

        .sidebar__inner {
            display : flex;
            padding : 0;

            .sidebar__item {
                a {
                    background-color: var(--content);
                    padding        : 10px 0;
                    flex-direction : row;

                    &.active {
                        box-shadow : none;
                        &::before {
                            content : none;
                        }
                    }
                }
                svg {
                    margin-bottom : 0;
                    margin-right  : 5px;
                }
            }
        }
    }
`