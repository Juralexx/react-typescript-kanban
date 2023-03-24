import React from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { LoadingButton } from 'components/tools/Button'
import { DynamicInput } from 'components/tools/Inputs';
import { ErrorCard } from 'components/tools/ErrorCard';
import Icon from 'components/tools/icons/Icon';
import { addClass, onlyLettersNumbersAndDashes } from 'functions/Utils';

const SignInForm = () => {
    const [datas, setDatas] = React.useState({ pseudo: '', password: '' })
    const [passwordShown, setPasswordShown] = React.useState(false)
    const [error, setError] = React.useState({ element: "", error: "" })

    const [isLoading, setLoading] = React.useState(false)

    const [searchParams] = useSearchParams()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!onlyLettersNumbersAndDashes(datas.pseudo) || datas.pseudo.length < 3 || datas.pseudo.length > 20) {
            setError({ element: "pseudo", error: "Votre pseudo ne peut contenir que des lettres, chiffres, tirets (-) et underscores (_) et faire entre 3 et 20 caractères" })
            setLoading(false)
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}api/user/login`,
                withCredentials: true,
                data: {
                    pseudo: datas.pseudo,
                    password: datas.password
                }
            }).then(res => {
                if (res.data.errors) {
                    setLoading(false)
                    if (res.data.errors.pseudo) {
                        setError({ element: "pseudo", error: res.data.errors.pseudo })
                    } else {
                        if (res.data.errors.password) {
                            setError({ element: "password", error: res.data.errors.password })
                        }
                    }
                } else {
                    const timer = setTimeout(() => {
                        localStorage.setItem("auth", true)
                        if (searchParams.get('from')) {
                            window.location = searchParams.get('from')
                        } else {
                            window.location = localStorage.getItem('prevUrl') || '/'
                        }
                    }, 1500)
                    return () => clearTimeout(timer)
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <DynamicInput
                type="text"
                text="Pseudo"
                placeholder=" "
                className={`${addClass(error.element === "pseudo", "err")} full`}
                onChange={e => setDatas(prev => ({ ...prev, pseudo: e.target.value }))}
                defaultValue={datas.pseudo}
            />
            <ErrorCard
                display={error.element === "pseudo"}
                text={error.error}
                clean={() => setError({ element: "", error: "" })}
            />
            <DynamicInput
                type={passwordShown ? "text" : "password"}
                text="Mot de passe"
                placeholder=" "
                className={`${addClass(error.element === "password", "err")} full mt-4`}
                onChange={e => setDatas(prev => ({ ...prev, password: e.target.value }))}
                defaultValue={datas.password}
                endIcon={passwordShown ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                endIconClick={() => setPasswordShown(!passwordShown)}
            />
            <ErrorCard
                display={error.element === "password"}
                text={error.error}
                clean={() => setError({ element: "", error: "" })}
            />
            <LoadingButton className="mt-6 w-full" type="submit" loadingConditions={isLoading}>
                Connexion
            </LoadingButton>
        </form>
    );
}

export default SignInForm;

