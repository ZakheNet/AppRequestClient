import {
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CSS from "@/app/CSS";
import { ActivityType } from "@/app/index";
import Policy from "@/app/Components/Policy";
import { useEffect, useState } from "react";
import { TypeResult } from "./GoodResult";

const comsIcon = require("@/assets/images/icons/communication.png");
const authIcon = require("@/assets/images/icons/feature.png");

export default function Home({
  setDevMessage,
  devMessage,
  User,
  Activity,
  seePolicy,
  setSeePolicy,
  setTnC,
  isLogged,
  setActivity,
  OpenDrawer,
}: {
  setDevMessage:(x:string)=>void,
  User: any;
  devMessage: string;
  Activity: ActivityType;
  seePolicy: boolean;
  setSeePolicy: (x: boolean) => void;
  setTnC: (x: boolean) => void;
  isLogged: boolean;
  setActivity: (x: ActivityType) => void;
  OpenDrawer: () => void;
}) {
  function ActRequestApp() {
    if (isLogged) {
      if (ReqState === "none") {
        setActivity(ActivityType.Request);
      }
    } else {
      setActivity(ActivityType.Authonticate);
    }
  }
  function ActFAQ() {
    setActivity(ActivityType.FAQ);
  }

  type TypeState = "checking" | "offline" | "requested" | "none";

  const [ReqState, setReqState] = useState<TypeState>("checking");

  useEffect(() => {

    CheckUserRequest();
    async function CheckUserRequest() {
      try {


        const res = await fetch(
          "http://apprequestserver.netlify.app/.netlify/functions/request",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              task: "requestStatus",
              email: User.email,
              password: User.password,
            }),
          }
        );


        if (res.status === 200) {
          const data = await res.json();
          setDevMessage(data.reason)
          if (data.state === "good") {
            if (!data.hasRequest) {
              setReqState("none");

              return;
            }
          }
        }
        else{
              setReqState("offline");
              
        }
      } catch (error:any) {
setDevMessage(error.toString())

              setReqState("offline");
      }
    }
  }, []);

  return (
    <View style={[CSS.HomeContainer]}>
      <Pressable style={[CSS.HomeActBox, CSS.HomeReq,ReqState==="offline" && isLogged?{backgroundColor:"rgba(46, 45, 45, 0.5)",padding:0}:undefined]} onPress={ActRequestApp}>
        {ReqState === "checking" && isLogged ? (
          <ActivityIndicator color={"black"} size={"large"} />
        ) : (
          <Image
            style={[CSS.HomeMainIcon]}
            source={
              isLogged ? require("@/assets/images/icons/app.png") : authIcon
            }
          />
        )}
        <Text style={[CSS.homeActTxt, { fontSize: 34 }]}>
          {!isLogged? "SignUp":(ReqState==="checking"? "Loading":ReqState==="none"? "Request App":ReqState==="requested"?"":"OFFLINE")}
        </Text>
      </Pressable>

      <Pressable style={[CSS.HomeActBox]} onPress={ActFAQ}>
        <Image
          style={[CSS.HomeSubIcon]}
          source={require("@/assets/images/icons/faq.png")}
        />
        <Text style={[CSS.homeActTxt]}>FAQ</Text>
      </Pressable>

      <Pressable onPress={OpenDrawer} style={[CSS.HomeActBox]}>
        <Image
          style={[CSS.HomeSubIcon]}
          source={require("@/assets/images/icons/more.png")}
        />
        <Text style={[CSS.homeActTxt]}>More</Text>
      </Pressable>

      {isLogged ? (
        <View style={[CSS.devMessageBox]}>
          <View style={[CSS.RowViewCenter]}>
            <Image style={[CSS.quizPointIcon]} source={comsIcon} />
            <Text style={[CSS.devMessageTitle]}>Message from developer</Text>
          </View>
          <ScrollView style={[CSS.devMessage]}>
            <Text style={[CSS.devMessageTxt]}>
              {devMessage === "" ? "No message" : devMessage}
            </Text>
          </ScrollView>
        </View>
      ) : undefined}

      <Policy
        isLogged={isLogged}
        setActivity={setActivity}
        Activity={Activity}
        seePolicy={seePolicy}
        setSeePolicy={setSeePolicy}
        setTnC={setTnC}
      />
    </View>
  );
}












const  x={
  "$__": {
    "activePaths": {
      "paths": {
        "_id": "init",
        "from": "init",
        "password": "init",
        "timer": "init",
        "message": "init",
        "id": "init",
        "stage": "init",
        "reason": "init",
        "date": "init",
        "deadline": "init",
        "budget": "init",
        "fee": "init",
        "features": "init",
        "appName": "init",
        "projectType": "init",
        "description": "init",
        "category": "init",
        "contactEmail": "init",
        "contactWhatsApp": "init",
        "contactOtherName": "init",
        "contactOtherLink": "init",
        "__v": "init"
      },
      "states": {
        "init": {
          "_id": true,
          "from": true,
          "password": true,
          "timer": true,
          "message": true,
          "id": true,
          "stage": true,
          "reason": true,
          "date": true,
          "deadline": true,
          "budget": true,
          "fee": true,
          "features": true,
          "appName": true,
          "projectType": true,
          "description": true,
          "category": true,
          "contactEmail": true,
          "contactWhatsApp": true,
          "contactOtherName": true,
          "contactOtherLink": true,
          "__v": true
        }
      }
    },
    "skipId": true
  },
  "$isNew": false,
  "_doc": {
    "_id": "697acbc53818c6435968a510",
    "from": "hhgg@",
    "password": "Yyyyy",
    "timer": 1769655237671,
    "message": "",
    "id": "Req672.3615658405448hhgg@",
    "stage": "review",
    "reason": "Your request is under review",
    "date": "2026-0-29/2:53:57",
    "deadline": "60",
    "budget": "10",
    "fee": 40,
    "features": "----Email System--Domain Name-Maintanance",
    "appName": "Cool Nost",
    "projectType": "website",
    "description": "Tgg",
    "category": "Other",
    "contactEmail": "hhgg@",
    "contactWhatsApp": "",
    "contactOtherName": "",
    "contactOtherLink": "",
    "__v": 0
  },
  "password": "******",
  "state": "good",
  "reason": "Request found",
  "hasRequest": true
}