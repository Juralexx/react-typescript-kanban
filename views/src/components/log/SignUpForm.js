import React from "react";
import axios from "axios";
import styled from "styled-components";
import { createSearchParams, useNavigate } from "react-router-dom";
import Icon from "components/tools/icons/Icon";
import { Button } from 'components/tools/Button'
import { DynamicInput } from 'components/tools/Inputs';
import { ErrorCard } from "components/tools/ErrorCard";
import { addClass, onlyLettersNumbersAndDashes } from "functions/Utils";
import { useClickOutside } from "functions/hooks/useClickOutside";

const SignUpForm = () => {
    const navigate = useNavigate()

    const [datas, setDatas] = React.useState({
        pseudo: "",
        password: "",
        confirmPassword: ""
    })
    const [passwordShown, setPasswordShown] = React.useState(false)
    const [error, setError] = React.useState({ element: "", error: "" })

    /**
     * 
     */

    const handleRegister = async e => {
        e.preventDefault();

        if (!onlyLettersNumbersAndDashes(datas.pseudo) || datas.pseudo.length < 3 || datas.pseudo.length > 20) {
            setError({ element: "pseudo", error: "Votre pseudo ne peut contenir que des lettres, chiffres, tirets (-) et underscores (_) et faire entre 3 et 20 caractères" })
        } else {
            if (!secured.state) {
                setError({ element: "password", error: "Votre mot de passe ne respecte pas les conditions requises" })
            } else {
                if (datas.password !== datas.confirmPassword) {
                    setError({ element: "confirmed-password", error: "Les mots de passe ne correspondent pas" })
                } else {
                    const data = {
                        pseudo: datas.pseudo,
                        password: datas.password
                    }
                    await axios
                        .post(`${process.env.REACT_APP_SERVER_URL}api/user/register`, data)
                        .then(res => {
                            if (res.data.errors) {
                                if (res.data.errors.pseudo) {
                                    setError({ element: "pseudo", error: res.data.errors.pseudo })
                                } else {
                                    if (res.data.errors.password) {
                                        setError({ element: "password", error: res.data.errors.password })
                                    }
                                }
                            } else {
                                navigate({
                                    pathname: '/login',
                                    search: `?${createSearchParams({ registered: true, user: datas.pseudo })}`
                                })
                            }
                        }).catch(err => console.log(err))
                }
            }
        }
    }

    /**
     * 
     */

    const passwordRef = React.useRef()
    const [display, setDisplay] = React.useState(false)
    useClickOutside(passwordRef, () => setDisplay(false))

    const [secured, setSecured] = React.useState({ state: false, strength: [] })
    const [valid, setValid] = React.useState([])

    React.useEffect(() => {
        let validArr = []
        if (onlyLettersNumbersAndDashes(datas.pseudo) && datas.pseudo.length >= 3 && datas.pseudo.length <= 20)
            validArr = [...validArr, "pseudo"]
        else validArr = validArr.filter(e => e !== "pseudo")

        if (secured.state)
            validArr = [...validArr, "password"]
        else validArr = validArr.filter(e => e !== "password")

        if (datas.password !== "" && datas.password === datas.confirmPassword)
            validArr = [...validArr, "confirmed-password"]
        else validArr = validArr.filter(e => e !== "confirmed-password")

        setValid(validArr)
    }, [datas, secured])

    /**
     * 
     */

    React.useEffect(() => {
        let count = []
        const chars = datas.password.toString().match(/[!@#$%^&*]/g)
        const lowercase = datas.password.match(/[a-z]/g)
        const uppercase = datas.password.match(/[A-Z]/g)
        const numeric = datas.password.match(/[0-9]/g)

        if ((chars || []).length >= 1)
            count = [...count, "chars"]
        else count = count.filter(e => e !== "chars")

        if ((lowercase || []).length >= 3)
            count = [...count, "lowercase"]
        else count = count.filter(e => e !== "lowercase")

        if ((uppercase || []).length >= 1)
            count = [...count, "uppercase"]
        else count = count.filter(e => e !== "uppercase")

        if ((numeric || []).length >= 3)
            count = [...count, "numeric"]
        else count = count.filter(e => e !== "numeric")

        if (datas.password.length >= 12)
            count = [...count, "length"]
        else count = count.filter(e => e !== "length")

        setSecured(prev => ({ ...prev, strength: count }))

        if (count.length === 5) {
            setSecured(prev => ({ ...prev, state: true }))
        } else setSecured(prev => ({ ...prev, state: false }))
    }, [datas.password])

    /**
     * 
     */

    const addPasswordStrength = () => {
        if (secured.strength.length >= 5)
            return { strength: "strong", text: "Fort" }
        else if (secured.strength.length >= 3)
            return { strength: "medium", text: "Moyen" }
        else if (secured.strength.length <= 2)
            return { strength: "weak", text: "Faible" }
    }

    /**
     * 
     */

    return (
        <form onSubmit={handleRegister}>
            <div className="relative mb-4">
                <DynamicInput
                    type="text"
                    text="Pseudo"
                    placeholder=" "
                    className={`${addClass(valid.includes('pseudo'), 'succes')} ${addClass(error.element === "pseudo", 'err')} full`}
                    onChange={e => setDatas(data => ({ ...data, pseudo: e.target.value }))}
                    value={datas.pseudo}
                    endIcon={(valid.includes("pseudo") && error.element !== "pseudo") && <Icon name="Check" className="validated" />}
                />
                <ErrorCard
                    display={error.element === "pseudo"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            </div>

            <div className="relative mb-4" ref={passwordRef}>
                <DynamicInput
                    type={passwordShown ? "text" : "password"}
                    text="Mot de passe"
                    className={` ${addClass(valid.includes('password'), 'succes')} ${addClass(error.element === "password", 'err')} full`}
                    placeholder=" "
                    onClick={() => setDisplay(!display)}
                    onChange={e => setDatas(data => ({ ...data, password: e.target.value }))}
                    value={datas.password}
                    endIcon={passwordShown ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                    endIconClick={() => setPasswordShown(!passwordShown)}
                />
                {valid.includes("password") &&
                    error.element !== "password" && (
                        <Icon name="Check" className="validated" />
                    )}
                <ErrorCard
                    display={error.element === "password"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
                {display &&
                    <PasswordChecker>
                        <div className="password-strength">
                            <div className={`strength-item ${addPasswordStrength().strength}`}></div>
                            <div className={`strength-item ${addPasswordStrength().strength}`}></div>
                            <div className={`strength-item ${addPasswordStrength().strength}`}></div>
                            <div className={`strength ${addPasswordStrength().strength}`}>
                                {addPasswordStrength().text}
                            </div>
                        </div>
                        <div className="checker-header">Votre mot de passe doit inclure : </div>
                        <div className={`checker ${addClass(secured.strength.includes('length'), 'valid')}`}>
                            {secured.strength.includes('length') ? <Icon name="CheckCircle" /> : <Icon name="CrossCircle" />}
                            <p>Au moins 8 caractères</p>
                        </div>
                        <div className={`checker ${addClass(secured.strength.includes('uppercase'), 'valid')}`}>
                            {secured.strength.includes('uppercase') ? <Icon name="CheckCircle" /> : <Icon name="CrossCircle" />}
                            <p>Au moins une lettre majuscule</p>
                        </div>
                        <div className={`checker ${addClass(secured.strength.includes('lowercase'), 'valid')}`}>
                            {secured.strength.includes('lowercase') ? <Icon name="CheckCircle" /> : <Icon name="CrossCircle" />}
                            <p>Au moins une lettre minuscule</p>
                        </div>
                        <div className={`checker ${addClass(secured.strength.includes('numeric'), 'valid')}`}>
                            {secured.strength.includes('numeric') ? <Icon name="CheckCircle" /> : <Icon name="CrossCircle" />}
                            <p>Au moins un chiffre</p>
                        </div>
                        <div className={`checker ${addClass(secured.strength.includes('chars'), 'valid')}`}>
                            {secured.strength.includes('chars') ? <Icon name="CheckCircle" /> : <Icon name="CrossCircle" />}
                            <p>Au moins un des caractère spéciaux suivant : !@#$%^&*</p>
                        </div>
                    </PasswordChecker>
                }
            </div>

            <div className="relative mb-4">
                <DynamicInput
                    type="password"
                    text="Confirmation mot de passe"
                    className={`${addClass(valid.includes('confirmed-password'), 'succes')} ${addClass(error.element === "confirmed-password", 'err')} full`}
                    placeholder=" "
                    onChange={e => setDatas(data => ({ ...data, confirmPassword: e.target.value }))}
                    value={datas.confirmPassword}
                />
                {valid.includes("confirmed-password") &&
                    error.element !== "confirmed-password" && (
                        <Icon name="Check" className="validated" />
                    )}
                <ErrorCard
                    display={error.element === "confirmed-password"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            </div>

            <Button className="w-full" type="submit">
                S'inscrire
            </Button>
        </form>
    )
}

export default SignUpForm

const PasswordChecker = styled.div`
    position      : absolute;
    top           : 108%;
    width         : 100%;
    padding       : 15px;
    background    : var(--content);
    border-radius : var(--rounded-sm);
    box-shadow    : var(--shadow-smooth);
    z-index       : 10;
    font-size     : 12px;

    .checker-header {
        color  : var(--text);
        margin : 7px 0;
    }

    .checker {
        display     : flex;
        align-items : center;
        padding     : 2px 0;
        p {
            font-size   : 12px;
        }

        svg {
            width        : 18px;
            height       : 18px;
            margin-right : 5px;
        }

        &.valid {
            color : var(--green);
            svg {
                color : var(--green);
            }
        }

        &.unvalid {
            color : var(--danger);
            svg {
                color : var(--danger);
            }
        }
    }

    .password-strength {
        display       : flex;
        align-items   : center;
        height        : 30px;
        margin-bottom : 10px;

        .strength-item {
            height           : 8px;
            width            : 24%;
            background-color : var(--content-light);

            &:nth-child(1) {
                border-radius : var(--rounded-full) 0 0 var(--rounded-full);
                &.weak {
                    background-color : var(--danger);
                }
                &.medium {
                    background-color : var(--orange);
                }
                &.strong {
                    background-color : var(--green);
                }
            }
            &:nth-child(2) {
                &.medium {
                    background-color : var(--orange);
                }
                &.strong {
                    background-color : var(--green);
                }
            }
            &:nth-child(3) {
                border-radius : 0 var(--rounded-full) var(--rounded-full) 0;
                &.strong {
                    background-color : var(--green);
                }
            }
        }

        .strength {
            width         : 25%;
            height        : 20px;
            padding       : 4px;
            text-align    : center;
            border-radius : var(--rounded-sm);
            margin-left   : auto;
            font-size     : 12px;

            &.weak {
                color            : var(--danger);
                background-color : rgba(var(--danger-rgb), 0.2);
            }
            &.medium {
                color            : var(--orange);
                background-color : rgba(var(--orange-rgb), 0.2);
            }
            &.strong {
                color            : var(--green);
                background-color : rgba(var(--green-rgb), 0.2);
            }
        }
    }
`