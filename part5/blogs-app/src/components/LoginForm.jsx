import PropTypes from "prop-types"

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
    <div>
        <h2>login</h2>

        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                data-testid="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={setUsername}
                />
            </div>
            <div>
                password
                <input
                data-testid="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={setPassword}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
)

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm