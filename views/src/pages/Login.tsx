import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Head from 'Head';
import SignInForm from 'components/log/SignInForm';
import { StringButton } from 'components/tools/Button';
import { SignContainer } from 'components/log/log.styles';

interface LoginProps {
    uid: string | null
}

const Login: React.FC<LoginProps> = ({ uid }) => {
    const [searchParams] = useSearchParams()

    if (uid !== null) {
        window.location.pathname = '/'
    }

    return (
        <SignContainer>
            <Head title='Connexion' />
            <div className="sign-container-inner">
                <div className="sign-card">
                    {searchParams.get('registered') &&
                        <p className="successfully-registered">
                            Votre compte a bien été créé <b>{searchParams.get('user')}</b> ! <br /> Veuillez vous connecter.
                        </p>
                    }
                    <div className='random-picture'>
                        <img src='/img/random-user.png' alt="" />
                    </div>
                    <h1>Connexion</h1>
                    <SignInForm />
                    <div className="sign-card-bottom">
                        Par encore de compte ?
                        <StringButton className="ml-2">
                            <Link to="/register">Inscription</Link>
                        </StringButton>
                    </div>
                </div>
            </div>
        </SignContainer>
    )
}

export default Login;