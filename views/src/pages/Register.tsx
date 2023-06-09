import React from 'react';
import { Link } from 'react-router-dom';
import Head from 'Head';
import SignUpForm from 'components/log/SignUpForm';
import { StringButton } from 'components/tools/Button';
import { SignContainer } from 'components/log/log.styles';

interface RegisterProps {
    uid?: string | null
}

const Register: React.FC<RegisterProps> = ({ uid }) => {

    if (uid !== null) {
        window.location.pathname = '/'
    }

    return (
        <SignContainer>
            <Head title='Register' />
            <div className="sign-container-inner">
                <div className="sign-card">
                    <div className='random-picture'>
                        <img src='/img/random-user.png' alt="" />
                    </div>
                    <h1>Register</h1>
                    <SignUpForm />
                    <div className="sign-card-bottom">
                        Already have an account ?
                        <StringButton className="ml-2">
                            <Link to="/login">Login</Link>
                        </StringButton>
                    </div>
                </div>
            </div>
        </SignContainer>
    );
}

export default Register;

