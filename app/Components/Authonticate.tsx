import GoodResult, { TypeResult } from "@/app/Components/GoodResult";
import Policy from "@/app/Components/Policy";
import CSS from "@/app/CSS";
import { ActivityType, DB, HOST, AdminType } from "@/app/index";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Storage from "@react-native-async-storage/async-storage";
import Axios from "axios";
const UncheckIcon = require("@/assets/images/icons/unchecked.png");
const CheckedIcon = require("@/assets/images/icons//checked.png");
type UserType = { Username?: string; Password: string; Email: string };

export default function Auth({
  setDevMessage,
  Activity,
  User,
  setUser,
  setIsLogged,
  isLogged,
  setActivity,
  TnC,
  seePolicy,
  setSeePolicy,
  setTnC,
}: {
  
  setDevMessage: (x: React.JSX.Element) => void;
  isLogged: boolean;
  Activity: ActivityType;
  setUser: (x: any) => void;
  User: any;
  setIsLogged: (x: boolean) => void;
  setTnC: (x: boolean) => void;
  seePolicy: boolean;
  setSeePolicy: (x: boolean) => void;
  TnC: boolean;
  setActivity: (x: ActivityType) => void;
}) {
  enum TypeDoAuth {
    "LogIn",
    "SignUp",
  }

  const [AuthType, setAuthType] = useState(TypeDoAuth.SignUp);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [LogEmail, setLogEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [LogPassword, setLogPassword] = useState("");
  const [CanSubmit, setCanSubmit] = useState(false);
  const [Waiting, setWaiting] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState("");
  const [AuthError, setAuthError] = useState("");
  const [Results, setResults] = useState(TypeResult.none);

  async function AuthorizeDevice(
    email: string,
    password: string,
    username: string,
    role: string
  ) {
    setIsLogged(true);
    setUser({ ...User, password, email, username });
  }

  function SubmitAuth() {
    setWaiting(true);
    setAuthError("");
    if (Username.length < 2) {
      setWaiting(false);
      setAuthError(
        "Username is invalid, username must have atleast 3 characters"
      );
      return;
    }
    if (Email.length < 6 && !Email.includes("@")) {
      setWaiting(false);
      setAuthError("Invalid Email");
      return;
    }
    if (Password.length < 3) {
      setWaiting(false);
      setAuthError("Invalid Password, password must have atleast 4 characters");
      return;
    }
    if (ConfirmPass !== Password) {
      setWaiting(false);
      setAuthError("Confirmed password does not match with your password");
      return;
    }
    if (!TnC) {
      setWaiting(false);
      setAuthError("Please accept Terms and Conditions");
      return;
    }

    const NewUser: UserType = { Username, Password, Email };
    async function NewUserSend(Data: UserType) {
      try {
        /* const res = await axios.post(HOST + "signup/", Data); */

        const res: any = await fetch(
          "https://apprequestserver.netlify.app/.netlify/functions/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              password: Data.Password,
              email: Data.Email,
              username: Data.Username,
            }),
          }
        );

        /* const res = await Axios.post(
          "https://apprequestserver.netlify.app/.netlify/functions/signup",
          {
            password: Data.Password,
            email: Data.Email,
            username: Data.Username,
          }
        ); */

        if (res.status >= 400) {
          setWaiting(false);
          setAuthError("Failed to create account, please try again later");
          return;
        }

        if (res.status >= 200 && res.status <= 210) {
          setWaiting(false);
          const data = await res.json();
          if (data.state === "bad") {
            setAuthError(data.reason);
            return;
          }
          if (data.state === "good") {
            try {
              await Storage.setItem(
                "User" + DB,
                JSON.stringify({
                  username: NewUser.Username,
                  email: NewUser.Email,
                  password: NewUser.Password,
                  logState: "good",
                  role:"client"
                })
              );
            } catch (error) {
              console.error(error);
            }

            await AuthorizeDevice(
              NewUser.Email,
              NewUser.Password,
              NewUser.Username || "App Request",
              "client"
            );
            setDevMessage(
              <Text>{`Hello ${NewUser.Username}, welcome to App Request! `}</Text>
            );
            setResults(TypeResult.signed);
          }
        } else {
          setAuthError("An unknown error occured, plase try again later");
          setWaiting(false);
        }
      } catch (error) {
        setAuthError("Could not connect to server, please try again later");
        setWaiting(false);
      }
    }

    NewUserSend(NewUser);
  }

  function LogInAuth() {
    setWaiting(true);
    setAuthError("");

    if (LogEmail.length < 6 && !LogEmail.includes("@")) {
      setWaiting(false);
      setAuthError("Invalid Email");
      return;
    }
    if (LogPassword.length < 3) {
      setWaiting(false);
      setAuthError("Invalid Password, password must have atleast 4 characters");
      return;
    }

    const LogUser: UserType = { Password: LogPassword, Email: LogEmail };
    async function LogUserSend(Data: UserType) {
      try {
        /* const res = await axios.post(HOST + "signup/", Data); */

        const res: any = await fetch(
          "https://apprequestserver.netlify.app/.netlify/functions/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              password: Data.Password,
              email: Data.Email,
            }),
          }
        );

        if (res.status >= 400) {
          setWaiting(false);
          setAuthError("Failed to login, please try again later");
          return;
        }

        if (res.status >= 200 && res.status <= 210) {
          setWaiting(false);
          const data = await res.json();
          if (data.state === "bad") {
            setAuthError(data.reason);
            return;
          }
          if (data.state === "good") {
            try {
              await Storage.setItem(
                "User" + DB,
                JSON.stringify({
                  username: data.username,
                  email: LogUser.Email,
                  password: LogUser.Password,
                  logState: "good",
                  role:data.data.role
                })
              );
            } catch (error) {
              console.error(error + "");
            }

            await AuthorizeDevice(
              LogUser.Email,
              LogUser.Password,
              data.username,
              data.data.role
            );
            setDevMessage(
              <Text>{`Hello ${data.username}, welcome back to App Request `}</Text>
            );
            console.log(data);
            console.log(data.data);
            console.log(data.data.role);
            setResults(TypeResult.logged);
          }
        } else {
          setAuthError("An unknown error occured, plase try again later");
          setWaiting(false);
        }
      } catch (error) {
        setAuthError("Could not connect to server, please try again later");
        setWaiting(false);
      }
    }

    LogUserSend(LogUser);
  }

  function ChangeAuthPage() {
    setEmail("");
    setLogEmail("");
    setLogPassword("");
    setAuthError("");
    setCanSubmit(false);
    setAuthType(
      AuthType === TypeDoAuth.SignUp ? TypeDoAuth.LogIn : TypeDoAuth.SignUp
    );
  }

  return (
    <View style={[CSS.AuthContainer]}>
      <Policy
        isLogged={isLogged}
        setActivity={setActivity}
        Activity={Activity}
        setTnC={setTnC}
        seePolicy={seePolicy}
        setSeePolicy={setSeePolicy}
      />
      {Results === TypeResult.none ? undefined : (
        <GoodResult setActivity={setActivity} state={Results} />
      )}
      <Pressable
        onPress={() => setActivity(ActivityType.Home)}
        style={[CSS.BackBox]}
      >
        <Image
          style={[CSS.FaqBackIcon]}
          source={require("@/assets/images/icons/back.png")}
        />
        <Text style={[CSS.FaqBackTxt]}>BACK</Text>
      </Pressable>
      <View style={[CSS.RowViewCenter]}>
        <Image
          style={[CSS.AuthTittleIcon]}
          source={require("@/assets/images/icons/user.png")}
        />
        <Text style={[CSS.AuthTittle]}>
          {AuthType === TypeDoAuth.SignUp ? "SIGN-UP" : "LOG-IN"}
        </Text>
      </View>

      {Results !== TypeResult.none ? undefined : AuthType ===
        TypeDoAuth.SignUp ? (
        <View style={[CSS.AuthInfoBox]}>
          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Username:</Text>
            <TextInput
              id="signName"
              defaultValue=""
              onChangeText={(e) => setUsername(e)}
              maxLength={10}
              placeholder="Username"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Email:</Text>
            <TextInput
              id="signEmail"
              defaultValue=""
              onChangeText={(email) => setEmail(email)}
              maxLength={30}
              placeholder="eg. example@gmail.com"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Password:</Text>
            <TextInput
              id="signPassword"
              defaultValue=""
              onChangeText={(e) => setPassword(e)}
              maxLength={20}
              placeholder="Enter password"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Confirm Password:</Text>
            <TextInput
              id="signConfirm"
              defaultValue=""
              onChangeText={(e) => setConfirmPass(e)}
              maxLength={20}
              placeholder="Confirm password"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>
          <Pressable onPress={() => setSeePolicy(true)} style={[CSS.RowView]}>
            <Image
              style={[CSS.AuthCheckIcon]}
              source={TnC ? CheckedIcon : UncheckIcon}
            />
            <Text style={[CSS.AuthTNCTxt]}>Accept Terms and Conditions</Text>
          </Pressable>
          {AuthError === "" ? undefined : (
            <View style={[CSS.AuthErrorBox]}>
              <Text style={[CSS.AuthErrorTxt]}>{AuthError}</Text>
            </View>
          )}
          {Waiting ? (
            <View>
              <ActivityIndicator size={"large"} color={"red"} />
            </View>
          ) : (
            <Pressable
              onPress={SubmitAuth}
              style={[
                CSS.AuthSubmitBox,
                CanSubmit ? undefined : CSS.AuthNoSubmit,
              ]}
            >
              <Text style={[CSS.AuthSubmitTxt]}>CREATE ACCOUNT</Text>
            </Pressable>
          )}

          <Pressable onPress={ChangeAuthPage} style={[CSS.AuthHaveAccountBox]}>
            <Text style={[CSS.AuthHaveAccountTxt]}>
              Have an account?{" "}
              <Text style={[CSS.Bold, { textDecorationLine: "underline" }]}>
                LogIn
              </Text>
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[CSS.AuthInfoBox]}>
          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Email:</Text>
            <TextInput
              id="logMail"
              onChangeText={(e) => setLogEmail(e)}
              maxLength={30}
              placeholder="eg. example@gmail.com"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Password:</Text>
            <TextInput
              id="logPassword"
              onChangeText={(e) => setLogPassword(e)}
              maxLength={20}
              placeholder="Enter password"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <Pressable onPress={() => setSeePolicy(true)} style={[CSS.RowView]}>
            <Text style={[CSS.AuthTNCTxt, { textDecorationLine: "underline" }]}>
              Forgotten Password?
            </Text>
          </Pressable>
          {AuthError === "" ? undefined : (
            <View style={[CSS.AuthErrorBox]}>
              <Text style={[CSS.AuthErrorTxt]}>{AuthError}</Text>
            </View>
          )}

          {Waiting ? (
            <View>
              <ActivityIndicator size={"large"} color={"red"} />
            </View>
          ) : (
            <Pressable
              onPress={LogInAuth}
              style={[
                CSS.AuthSubmitBox,
                CanSubmit ? undefined : CSS.AuthNoSubmit,
              ]}
            >
              <Text style={[CSS.AuthSubmitTxt]}>LOGIN</Text>
            </Pressable>
          )}

          <Pressable onPress={ChangeAuthPage} style={[CSS.AuthHaveAccountBox]}>
            <Text style={[CSS.AuthHaveAccountTxt]}>
              {"No account? "}
              <Text style={[CSS.Bold, { textDecorationLine: "underline" }]}>
                SignUp
              </Text>
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
