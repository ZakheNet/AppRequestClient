import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CSS from "@/app/CSS";
import { useEffect, useState } from "react";
import { ActivityType,HOST } from "@/app/index";
import Policy from "@/app/Components/Policy";
import AuthResult from "@/app/Components/AuthResult";

const UncheckIcon = require("@/assets/images/icons/unchecked.png");
const CheckedIcon = require("@/assets/images/icons//checked.png");





export enum TypeResult {
    "logged",
    "signed",
    "none"
  }

export default function Auth({
  setActivity,
  TnC,
  seePolicy,
  setSeePolicy,
  setTnC,
}: {
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
  const [Results,setResults]=useState(TypeResult.none)

  useEffect(() => {
    async function wakeServer() {
      try {
        const res = await fetch(HOST + "check").then((res) => {
          if (res.status !== 200) {
            console.log("Servder Sleeping");
          }
          if (res.status === 200) {
            console.log("Servder Awake");
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
    wakeServer();
    let CheckUsername = Username.length > 0;
    let CheckMail = Email.length > 6 && Email.includes("@");
    let CheckLogMail = LogEmail.length > 6 && LogEmail.includes("@");
    let CheckPassword = Password.length > 3;
    let CheckLogPassword = LogPassword.length > 3;
    let CheckConfirmPass = ConfirmPass === Password;
    console.log(LogEmail);
    if (
      TnC &&
      CheckMail &&
      CheckConfirmPass &&
      CheckPassword &&
      CheckUsername
    ) {
      setCanSubmit(true);
      /* AlertError(); */
      return;
    } else if (
      AuthType === TypeDoAuth.LogIn &&
      CheckLogPassword &&
      CheckLogMail
    ) {
      setCanSubmit(true);
      /* AlertError(); */
      return;
    } else {
      setCanSubmit(false);
    }
  }, [Password, TnC, ConfirmPass, Email, Username, AuthType]);

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

    type UserType = { Username: string; Password: string; Email: string };

    const NewUser: UserType = { Username, Password, Email };
    async function NewUserSend(Data: UserType) {
      try {
        /* const res = await axios.post(HOST + "signup/", Data); */

        const res = await fetch(`${HOST}signup/${Data.Username}/${Data.Email}/${Data.Password}`)

        if(res.status>=400){
          setWaiting(false)
          setAuthError("Failed to create account, please try again later")
          return
        }

        if(res.status===200){
          const data =await res.json()
          if(data.state==="bad"){
            setAuthError(data.reason)
            setWaiting(false)
            return
          }
          if(data.state==="good"){
            setResults(TypeResult.signed)
          }


        }
        

       /*  if()
        console.log(await rez?.json()) */

      } catch (error) {
        setAuthError("Could not connect to server, please try again later")
        setWaiting(false);
        console.log("Server Error Occured");
        console.log(error)
      }
    }

    NewUserSend(NewUser);
  }

  function LogInAuth() {
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
  }

  return (
    <View style={[CSS.AuthContainer]}>
      <Policy
        setTnC={setTnC}
        seePolicy={seePolicy}
        setSeePolicy={setSeePolicy}
      />
      {Results===TypeResult.none? undefined:<AuthResult  setActivity={setActivity} state={Results}/>}
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


      {Results!==TypeResult.none? undefined: AuthType === TypeDoAuth.SignUp ? (
        <View style={[CSS.AuthInfoBox]}>
          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Username:</Text>
            <TextInput
              defaultValue=""
              onChangeText={(e) => setUsername(e)}
              textContentType="username"
              maxLength={14}
              placeholder="Username"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Email:</Text>
            <TextInput
              defaultValue=""
              onChangeText={(e) => setEmail(e)}
              textContentType="emailAddress"
              maxLength={30}
              placeholder="eg. example@gmail.com"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Password:</Text>
            <TextInput
              defaultValue=""
              onChangeText={(e) => setPassword(e)}
              textContentType="newPassword"
              maxLength={20}
              placeholder="Enter password"
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.AuthItemBox]}>
            <Text style={[CSS.AuthLabel]}>Confirm Password:</Text>
            <TextInput
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

          <Pressable
            onPress={() => {
              setAuthError("");
              setCanSubmit(false);
              setAuthType(TypeDoAuth.LogIn);
            }}
            style={[CSS.AuthHaveAccountBox]}
          >
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
              defaultValue=""
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
              defaultValue=""
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
          <Pressable
            onPress={LogInAuth}
            style={[
              CSS.AuthSubmitBox,
              CanSubmit ? undefined : CSS.AuthNoSubmit,
            ]}
          >
            <Text style={[CSS.AuthSubmitTxt]}>LOGIN</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setAuthError("");
              setCanSubmit(false);
              setAuthType(TypeDoAuth.SignUp);
            }}
            style={[CSS.AuthHaveAccountBox]}
          >
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
