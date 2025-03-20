import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import AppleSignin from "react-apple-signin-auth";
import MicrosoftLogin from "react-microsoft-login";

const App = () => {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    state: import.meta.env.VITE_PUBLIC_STATE,
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div>
      <h1>OAuth Tester</h1>
      <p>
        Visit{" "}
        <a href="https://github.com/hisamafahri/oauth-tester" target="_blank">
          https://github.com/hisamafahri/oauth-tester
        </a>{" "}
        for usage guides!
      </p>
      <hr />
      <h4>State: {import.meta.env.VITE_PUBLIC_STATE}</h4>
      <div>
        <p>Google</p>
        <p>Client ID: {import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID}</p>
        <button onClick={() => loginWithGoogle()}>Login with Google</button>
      </div>
      <div>
        <p>Microsoft</p>
        <p>Client ID: {import.meta.env.VITE_PUBLIC_MICROSOFT_CLIENT_ID}</p>
        <MicrosoftLogin
          clientId={import.meta.env.VITE_PUBLIC_MICROSOFT_CLIENT_ID}
          authCallback={(err, data) => {
            console.log(err, data);
          }}
        >
          <button>Login with Microsoft</button>
        </MicrosoftLogin>
      </div>
      <div>
        <p>Facebook</p>
        <p>App ID: {import.meta.env.VITE_PUBLIC_FACEBOOK_APP_ID}</p>
        <FacebookLogin
          state={import.meta.env.VITE_PUBLIC_STATE}
          appId={import.meta.env.VITE_PUBLIC_FACEBOOK_APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          callback={(res) => console.log(res)}
        />
      </div>
      <div>
        <p>Linkedin</p>
        <p>App ID: {import.meta.env.VITE_PUBLIC_LINKEDIN_CLIENT_ID}</p>
        <LinkedIn
          state={import.meta.env.VITE_PUBLIC_STATE}
          clientId={import.meta.env.VITE_PUBLIC_LINKEDIN_CLIENT_ID}
          redirectUri={`${window.location.origin}/linkedin`}
          onSuccess={(code) => {
            console.log(code);
          }}
          onError={(error) => {
            console.log(error);
          }}
        >
          {({ linkedInLogin }) => (
            <img
              onClick={linkedInLogin}
              src={linkedin}
              alt="Sign in with Linked In"
              style={{ maxWidth: "180px", cursor: "pointer" }}
            />
          )}
        </LinkedIn>
      </div>
      <div>
        <p>Apple</p>
        <p>Client ID: {import.meta.env.VITE_PUBLIC_APPLE_CLIENT_ID}</p>
        <p>Redirect URL: {import.meta.env.VITE_PUBLIC_APPLE_REDIRECT_URL}</p>
        <AppleSignin
          /** Auth options passed to AppleID.auth.init() */
          authOptions={{
            /** Client ID - eg: 'com.example.com' */
            clientId: import.meta.env.VITE_PUBLIC_APPLE_CLIENT_ID,
            /** Requested scopes, seperated by spaces - eg: 'email name' */
            scope: "email name",
            /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
            redirectURI: import.meta.env.VITE_PUBLIC_APPLE_REDIRECT_URL,
            /** State string that is returned with the apple response */
            state: import.meta.env.VITE_PUBLIC_STATE,
            /** Nonce */
            nonce: "nonce",
            /** Uses popup auth instead of redirection */
            usePopup: true,
          }} // REQUIRED
          /** General props */
          uiType="dark"
          /** className */
          className="apple-auth-btn"
          /** Removes default style tag */
          noDefaultStyle={false}
          /** Allows to change the button's children, eg: for changing the button text */
          buttonExtraChildren="Continue with Apple"
          /** Extra controlling props */
          /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
          onSuccess={(response) => console.log(response)} // default = undefined
          /** Called upon signin error */
          onError={(error) => console.error(error)} // default = undefined
          /** Skips loading the apple script if true */
          skipScript={false} // default = undefined
        />
      </div>
    </div>
  );
};

export default App;
