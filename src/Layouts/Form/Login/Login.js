import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import { useContext, useEffect, useState } from "react";
import { LoginApi } from '~/components/services/FetchApi';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { UserContext } from "~/components/Context/UserContext";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function Login() {
    const history = useNavigate();
    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassWord] = useState(true);
    const [loadingData, setLoadingData] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is reequired!')
            return;
        }
        setLoadingData(true)
        let res = await LoginApi(email, password);
        if (res && res.token) {
            loginContext(email, res.token);
            history('/');
        } else {
            if (res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingData(false)
    }
    return (
        <>
            <div className={cx("container")}>
                <h4 className={cx("heder")}>Login</h4>
                <p className={cx("desc")}>Email or Usename(eve.holt@reqres.in)</p>
                <div className={cx("input-email")}>
                    <input
                        type="text"
                        placeholder="Email or Username"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx("input-password")}>
                    <input
                        type={showPassword ? "password" : "text"}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPassword && <div
                        className={cx("icon")}
                        onClick={() => setShowPassWord(!showPassword)}
                    >
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    }
                    {!showPassword && (

                        <div
                            className={cx("icon")}
                            onClick={() => setShowPassWord(!showPassword)}
                        >
                            <i className="fa-solid fa-unlock"></i>
                        </div>

                    )}
                </div>
                <p className={cx("forgot")}>Forgot Password</p>
                <button
                    className={cx(
                        "btn-login",
                        email && password ? cx("active-color") : ""
                    )}
                    disabled={email && password ? false : true}
                    onClick={handleLogin}
                >
                    {loadingData && <span><i className="fas fa-sync fa-spin" ></i></span>}
                    <span>Login</span>
                </button>
                <div className="btn btn-primary">
                    <Link style={{ textDecoration: 'none', color: '#ccc' }} to='/'>Go Back</Link>
                </div>
            </div>
        </>
    );
}

export default Login;
