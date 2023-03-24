import { createGlobalStyle } from 'styled-components';
import { Normalize } from './Normalize';
import { TransitionStyles } from './TransitionStyles';
import variables from './variables';

const GlobalStyles = createGlobalStyle`
    ${variables}
    ${TransitionStyles}
    ${Normalize}

    * {
        margin          : 0;
        padding         : 0;
        box-sizing      : border-box;
        text-decoration : none;
    }

    html {
        min-height      : 100vh;
        width           : 100%;
        margin          : 0;
        padding         : 0;
        scroll-behavior : smooth;
        scrollbar-width : thin;
        scrollbar-color : var(--body);
        box-sizing      : border-box;
    }

    body {
        min-width        : 100vw;
        height           : 100%;
        margin           : 0;
        padding          : 0;
        font-family      : var(--font-fam1);
        color            : var(--text);
        font-size        : 14px;
        background-color : var(--body);
        overflow-y       : auto;
        overflow-x       : hidden;

        &.no-scroll {
            overflow-y : hidden;
        }
        &.blur {
            overflow: hidden;
            main {
                > * {
                    filter         : blur(5px) brightness(0.7);
                    transition     : var(--transition);
                    pointer-events : none;
                    user-select    : none;
                }
            }
        }
    }

    ::selection {
        background-color : rgba(var(--primary-rgb), 0.2);
        color            : var(--primary);
    }

    :focus {
        outline        : 2px dashed var(--primary);
        outline-offset : 3px;
    }

    :focus-visible {
        outline        : 2px dashed var(--primary);
        outline-offset : 3px;
    }

    :focus:not(:focus-visible) {
        outline        : none;
        outline-offset : 0px;
    }

    ::-webkit-scrollbar {
        width : 12px;
    }
    ::-webkit-scrollbar-track {
        background : var(--body);
    }
    ::-webkit-scrollbar-thumb {
        background-color : var(--light-border);
        border           : 4px solid var(--body);
        border-radius    : 10px;
    }

    a {
        background-color : transparent;
        color            : var(--text);
    }

    p {
        font-size    : 14px;
        font-weight  : 500;
        line-height  : 22px;
        font-stretch : 105%;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin      : 0 0 10px 0;
        font-weight : 600;
        color       : var(--title);
    }

    h1 {
        font-size   : 32px;
        line-height : 36px;
    }
    h2 {
        font-size   : 28px;
        line-height : 32px;
    }
    h3 {
        font-size   : 20px;
        line-height : 24px;
    }
    h4 {
        font-size   : 18px;
        line-height : 22px;
    }
    h5 {
        font-size   : 16px;
        line-height : 20px;
    }

    @media(max-width:768px) {
        h1 {
            font-size   : 28px;
            line-height : 32px;
        }
        h2 {
            font-size   : 24px;
            line-height : 28px;
        }
        h3 {
            font-size   : 20px;
            line-height : 24px;
        }
        h4 {
            font-size   : 18px;
            line-height : 22px;
        }
        h5 {
            font-size   : 16px;
            line-height : 20px;
        }
    }

    .one_line {
        text-overflow      : ellipsis;
        overflow           : hidden;
        width              : 100%;
        line-height        : 19px;
        max-height         : 22px;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
    }

    .two_lines {
        text-overflow      : ellipsis;
        overflow           : hidden;
        width              : 90%;
        line-height        : 19px;
        max-height         : 44px;
        display            : -webkit-box;
        -webkit-line-clamp : 2;
        -webkit-box-orient : vertical;
    }

    .three_lines {
        text-overflow      : ellipsis;
        overflow           : hidden;
        width              : 90%;
        line-height        : 19px;
        max-height         : 66px;
        display            : -webkit-box;
        -webkit-line-clamp : 3;
        -webkit-box-orient : vertical;
    }

    .user_in_array-container {
        display       : flex;
        flex-wrap     : wrap;
        margin-bottom : 10px;

        .user_in_array {
            display          : flex;
            align-items      : center;
            height           : 30px;
            padding          : 4px 8px;
            margin           : 4px;
            color            : var(--text);
            background-color : rgba(var(--primary-rgb), 0.2);
            border-radius    : var(--rounded-sm);
            cursor           : pointer;
        
            svg {
                width         : 20px;
                height        : 20px;
                padding       : 2px;
                border-radius : 20px;
                margin-left   : 5px;
                margin-top    : 1px;
        
                &:hover {
                    background-color : rgba(var(--primary-rgb), 0.3);
                }
            }
        }
    }

    .user_selecter {
        height : 100%;
        color  : var(--text);

        .user_displayer {
            min-height : 200px;
            max-height : 300px;
            overflow-y : auto;

            .user_display_choice {
                display         : flex;
                align-items     : center;
                justify-content : flex-start;
                padding         : 6px 8px;
                margin          : 4px 0;
                cursor          : pointer;
                border-radius   : var(--rounded-md);

                &:hover {
                    background-color: var(--content-light);
                }

                &.selected {
                    background-color: rgba(var(--primary-rgb), 0.15);

                    &:hover {
                        background-color: rgba(var(--primary-rgb), 0.3);
                    }
                }

                .user {
                    display     : flex;
                    align-items : center;

                    p {
                        &:nth-child(1) {
                            font-weight : 600;
                            line-height : 18px;
                        }
                        &:nth-child(2) {
                            color       : var(--text-secondary);
                            font-size   : 12px;
                            line-height : 16px;
                        }
                    }
                }
            }
        }
    }

    .__details {
        display         : flex;
        align-items     : center;
        justify-content : center;
        height          : 22px;
        width           : auto;
        font-size       : 12px;
        line-height     : 12px;
        font-weight     : 500;
        padding         : 1px 7px 0;
        border-radius   : var(--rounded-sm);

        &.blue {
            background : rgba(var(--xblue-rgb), 0.15);
            color      : var(--xblue);
        }
        &.red {
            background : rgba(var(--xred-rgb), 0.15);
            color      : var(--xred);
        }
        &.orange {
            background : rgba(var(--orange-rgb), 0.15);
            color      : var(--orange);
        }
        &.green {
            background : rgba(var(--green-rgb), 0.15);
            color      : var(--green);
        }

        &:nth-child(1) {
            &:before {
                background : linear-gradient(to right, #c776e7, #dc6c87);
            }
        }
        &:nth-child(2) {
            &:before {
                background : linear-gradient(to right, #96a4fd, #67b0f8);
            }
        }
        &:nth-child(3) {
            &:before {
                background : linear-gradient(to right, #78d3a6, #7bd4ec);
            }
        }
    }

    .hightlight {
        color       : var(--xlight-blue);
        font-weight : 600;
    }

    .empty-array {
        display         : flex;
        align-items     : center;
        justify-content : center;
        margin-top      : 10px;
        padding         : 20px 35px 10px;
        color           : var(--text);
        font-size       : 14px;
        font-weight     : 500;
        /* border-top      : 1px solid var(--light-border); */

        span {
            text-transform : lowercase !important;
        }

        svg {
            width        : 30px;
            height       : 30px;
            margin-right : 20px;
        }
    }

    .white {
        color : white;
    }

    .blue {
        color : var(--blue);
    }
    .light-blue {
        color : var(--light-blue);
    }
    .turquoise {
        color : var(--turquoise);
    }
    .turquoise-light {
        color : var(--xturquoise);
    }
    .green {
        color : var(--green);
    }
    .green-light {
        color : var(--xgreen);
    }
    .green-dark {
        color : var(--dark-green);
    }
    .purple {
        color : var(--purple);
    }
    .purple-light {
        color : var(--xpurple);
    }
    .red {
        color : var(--red) !important;
    }
    .red-light {
        color : var(--xred);
    }
    .yellow {
        color : var(--yellow);
    }
    .yellow-light {
        color : var(--xyellow);
    }
    .orange {
        color : var(--orange);
    }
    .orange-light {
        color : var(--xorange);
    }

    .bg-blue {
        background-color : var(--blue);
    }
    .bg-light-blue {
        background-color : var(--light-blue);
    }
    .bg-turquoise {
        background-color : var(--turquoise);
    }
    .bg-turquoise-light {
        background-color : var(--xturquoise);
    }
    .bg-green {
        background-color : var(--green);
    }
    .bg-green-light {
        background-color : var(--xgreen);
    }
    .bg-green-dark {
        background-color : var(--dark-green);
    }
    .bg-purple {
        background-color : var(--purple);
    }
    .bg-purple-light {
        background-color : var(--xpurple);
    }
    .bg-red {
        background-color : var(--red);
    }
    .bg-red-light {
        background-color : var(--xred);
    }
    .bg-yellow {
        background-color : var(--yellow);
    }
    .bg-yellow-light {
        background-color : var(--xyellow);
    }
    .bg-orange {
        background-color : var(--orange);
    }
    .bg-orange-light {
        background-color : var(--xorange);
    }.xbg-blue {
        background-color : rgba(var(--blue-rgb), 0.3);
    }
    .xbg-light-blue {
        background-color : rgba(var(--light-blue-rgb), 0.3);
    }
    .xbg-turquoise {
        background-color : rgba(var(--turquoise-rgb), 0.3);
    }
    .xbg-turquoise-light {
        background-color : rgba(var(--xturquoise-rgb), 0.3);
    }
    .xbg-green {
        background-color : rgba(var(--green-rgb), 0.3);
    }
    .xbg-green-light {
        background-color : rgba(var(--xgreen-rgb), 0.3);
    }
    .xbg-green-dark {
        background-color : rgba(var(--dark-green-rgb), 0.3);
    }
    .xbg-purple {
        background-color : rgba(var(--purple-rgb), 0.3);
    }
    .xbg-purple-light {
        background-color : rgba(var(--xpurple-rgb), 0.3);
    }
    .xbg-red {
        background-color : rgba(var(--red-rgb), 0.3) !important;
    }
    .xbg-red-light {
        background-color : rgba(var(--xred-rgb), 0.3);
    }
    .xbg-yellow {
        background-color : rgba(var(--yellow-rgb), 0.3);
    }
    .xbg-yellow-light {
        background-color : rgba(var(--xyellow-rgb), 0.3);
    }
    .xbg-orange {
        background-color : rgba(var(--orange-rgb), 0.3);
    }
    .xbg-orange-light {
        background-color : rgba(var(--xorange-rgb), 0.3);
    }
`;

export default GlobalStyles;