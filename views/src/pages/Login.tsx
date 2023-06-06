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
            <Head title='Login' />
            <div className="sign-container-inner">
                <div className="sign-card">
                    {searchParams.get('registered') &&
                        <p className="successfully-registered">
                            Your account has been created successfully <b>{searchParams.get('user')}</b> ! <br /> Please login.
                        </p>
                    }
                    <div className='random-picture'>
                        <img src='/img/random-user.png' alt="" />
                    </div>
                    <h1>Login</h1>
                    <SignInForm />
                    <div className="sign-card-bottom">
                        No account yet ?
                        <StringButton className="ml-2">
                            <Link to="/register">Register</Link>
                        </StringButton>
                    </div>
                </div>
            </div>
        </SignContainer>
    )
}

export default Login;