import { useEffect, useState } from "react";
import LoadingButton from '@/components/loadingbutton';
import Modal from '@/components/modal';
import Input from '@/components/input';
import {isMobilePhone, isEmail} from 'validator'
const SignUp = (props: SignUpProps) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmitEmail, setDisableSubmitEmail] = useState(true);
    const [disableSendOTP, setDisableSendOTP] = useState(true);
    const [disableSubmitPhone, setDisableSubmitPhone] = useState(true);
    const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
    const [OTPCode, setOTPCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [recaptchaResolved, setRecaptchaResolved] = useState(false)
    const sendOTP = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(firebaseAuth, "recaptcha", {
                size: 'normal',
                callback: () => {
                    setRecaptchaResolved(true);
                    setRecaptcha(recaptcha)

                },
    
                'expired-callback': () => {
                    setRecaptchaResolved(false);
                },
            
            })
            const confirmation = await signInWithPhoneNumber(firebaseAuth, phoneNumber, recaptcha);
            setConfirmationResult(confirmation);
            console.log("confirmation:", confirmation);
        } catch (error) {
            console.error(error)
            
        } 

    }
    useEffect(() => {
        if (isMobilePhone(phoneNumber)) {
            setDisableSendOTP(false);

        } else {
            setDisableSendOTP(true);
        }

        if (OTPCode.length !== 6) {
            setDisableSubmitPhone(true)
        } else {
            setDisableSubmitPhone(false)
        }

        if (isEmail(email) && password.length >= 6) {
            setDisableSubmitEmail(false);
        } else {
            setDisableSubmitEmail(true);
        }
    }, [email, password, phoneNumber, OTPCode]);

    return (
        <Modal show={props.open} setShow={props.setOpen}>  
        <div className="max-w-md w-full bg-white py-6 rounded-lg">
            <h2 className="text-lg font-semibold text-center mb-10">Sign Up</h2>
            <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    name="email"
                    type="text"
                />
                
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    name="password"
                    type="password"
                />
                <LoadingButton
                    onClick={signUpWithEmail}
                    disabled={disableSubmitEmail}
                >
                    Sign Up with Email
                </LoadingButton>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                    </div>
                </div>
                <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    name="phoneNumber"
                    type="text"
                />
                {!recaptchaResolved ? (<div id="recaptcha"/>) : null}
                <LoadingButton
                    onClick={sendOTP}
                    disabled={disableSendOTP}
                >
                    Send OTP
                </LoadingButton>
                <Input
                    value={OTPCode}
                    onChange={(e) => setOTPCode(e.target.value)}
                    placeholder="code"
                    name="code"
                    type="text"
                />
                <LoadingButton
                    onClick={handleCreateUserAndLogin}
                    // loading={verifyPhoneNumberLoading}
                    // loadingText="Verifying..."
                    disabled={disableSubmitPhone}
                >
                    Sign Up with Phone Number
                </LoadingButton>
             
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-3">
                </div>
            </div>
        </div>
    </Modal>
    )

}

export default SignUp;