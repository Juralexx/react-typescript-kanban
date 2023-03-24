import styled from "styled-components";

export const SignContainer = styled.div`
    height     : calc(100vh - 180px);
    width      : 100%;
    background : var(--content-light);

    .sign-container-inner {
        display         : flex;
        flex-direction  : column;
        align-items     : center;
        justify-content : center;
        margin          : 0 auto;
        min-height      : 100%;
        width           : 500px;
    }

    .sign-card {
        position      : relative;
        width         : 100%;
        padding       : 30px;
        margin        : 30px auto;
        background    : var(--content);
        border-radius : var(--rounded-md);
        box-shadow    : var(--shadow-smooth);

        h1 {
            font-size     : 18px;
            margin-bottom : 20px;
            text-align    : center;
            color         : var(--text);
        }

        .random-picture {
            position : relative;
            height   : 110px;
            width    : 100%;

            img {
                position   : relative;
                height     : 110px;
                width      : 110px;
                padding    : 20px;
                margin     : 0 auto;
                background : var(--content);
                z-index    : 2;
            }

            &:before {
                content          : '';
                position         : absolute;
                top              : 50%;
                transform        : translateY(-50%);
                width            : 100%;
                height           : 1px;
                background-color : var(--light-border);
                z-index          : 1;
            }
        }

        a {
            color : var(--primary);
        }

        .validated {
            position : absolute;
            top      : 11px;
            right    : 10px;
            color    : var(--green);
            z-index  : 2;
        }
    }

    .forgot-password {
        width           : 100%;
        font-size       : 14px;
        display         : flex;
        align-items     : center;
        justify-content : flex-end;
        padding-top     : 10px;

        a {
            color : var(--placeholder);
        }

        &:hover {
            text-decoration : underline;
            a {
                color : var(--text);
            }
        }
    }

    .sign-card-bottom {
        display         : flex;
        align-items     : center;
        justify-content : center;
        width           : 100%;
        text-align      : center;
        padding-top     : 30px;
    }

    .successfully-registered {
        padding          : 6px;
        text-align       : center;
        color            : var(--green);
        margin-bottom    : 10px;
        background-color : rgba(var(--green-rgb), 0.1);
        border-radius    : var(--rounded-sm);
    }

    @media(max-width:576px) {
        .sign-container-inner {
            width : 100vw;
            .sign-card {
                box-shadow : none;
                height     : 100%;
            }
            .header-logo {
                display : none;
            }
        }
    }
`