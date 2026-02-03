import {
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from "react-native";
import CSS from "@/app/CSS";
import Messager from "@/app/Components/Messager";
import { ActivityType, TypeState } from "@/app/index";
import Policy from "@/app/Components/Policy";
import { useEffect, useState } from "react";
import { TypeResult } from "./GoodResult";
import ClientDashboard from "@/app/Components/ClientDashboard";

const authIcon = require("@/assets/images/icons/feature.png");

export default function Home({
  hideDevText,
  setHideDevtext,
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
  ReqState,
  setReqState,
  isReplying,
  setIsReplying,
  Refresh,
  setRefresh,
}: {
  Refresh: number;
  setRefresh: (x: number) => void;
  isReplying: boolean;
  setIsReplying: (x: boolean) => void;
  setReqState: (x: TypeState) => void;
  ReqState: TypeState;
  setDevMessage: (x: React.JSX.Element) => void;
  setHideDevtext: (x: boolean) => void;
  hideDevText: boolean;
  User: any;
  devMessage: React.JSX.Element;
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

  const [RequestStatus, setRequestStatus] = useState({});

  async function SetUpDashboard(data: any) {
    if (data.message === "" && !devMessage.key?.includes("welcome")) {
      setDevMessage(<Text>{"No messages"}</Text>);
    }
  }

  useEffect(() => {
    CheckUserRequest();

    async function CheckUserRequest() {
      try {
        if (User.email !== "") {
          const res = await fetch(
            "https://apprequestserver.netlify.app/.netlify/functions/request",
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
            if (data.state === "good") {
              if (!data.hasRequest) {
                setReqState("none");

                return;
              } else {
                setReqState("requested");
                setRequestStatus(data);
                SetUpDashboard(data);
                if (data.message !== "") {
                  setDevMessage(ParseMessage(data.message, User));
                }
              }
            }
          } else {
            setReqState("offline");
          }
        }
      } catch (error: any) {
        setDevMessage(<Text>Connection failed</Text>);

        setReqState("offline");
      }
    }
  }, [User, setDevMessage, Refresh, isLogged]);

  return (
    <View
      style={[
        CSS.HomeContainer,
        {
          minHeight: Dimensions.get("window").height * (isReplying ? 0.4 : 0.8),
        },
      ]}
    >
      {isReplying ? undefined : (
        <View style={[CSS.HomeContainer]}>
          {ReqState === "requested" ? (
            <ClientDashboard setRefresh={setRefresh} User={User} RequestStatus={RequestStatus} />
          ) : undefined}
          {ReqState === "requested" ? undefined : (
            <View style={[CSS.HomeContainer]}>
              {" "}
              <Pressable
                style={[
                  CSS.HomeActBox,
                  CSS.HomeReq,
                  ReqState === "offline" && isLogged
                    ? { backgroundColor: "rgba(46, 45, 45, 0.5)", padding: 0 }
                    : undefined,
                ]}
                onPress={ActRequestApp}
              >
                {ReqState === "checking" && isLogged ? (
                  <ActivityIndicator color={"black"} size={"large"} />
                ) : (
                  <Image
                    style={[CSS.HomeMainIcon]}
                    source={
                      isLogged
                        ? require("@/assets/images/icons/app.png")
                        : authIcon
                    }
                  />
                )}
                <Text style={[CSS.homeActTxt, { fontSize: 34 }]}>
                  {!isLogged
                    ? "SignUp"
                    : ReqState === "checking"
                    ? "Loading"
                    : ReqState === "none"
                    ? "Request App"
                    : "OFFLINE"}
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
            </View>
          )}
        </View>
      )}

      {isLogged ? (
        <Messager
        setRefresh={setRefresh}
          clientEmail={undefined}
          User={User}
          hideDevText={hideDevText}
          setIsReplying={setIsReplying}
          devMessage={devMessage}
          isReplying={isReplying}
          ReqState={ReqState}
          setDevMessage={setDevMessage}
          setHideDevtext={setHideDevtext}
        />
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

export function ParseMessage(data: string, User: any) {
  if (data.includes("==^==") && data.includes("++^++")) {
    const rawGroup = data.split("==^==");
    const Elements = rawGroup.map((item, index) => {
      const data = item.split("++^++");
      return (
        <View
          style={[
            CSS.messageItem,
            data[0].includes("Admin") ? CSS.replyClient : CSS.replyAdmin,
          ]}
          key={index}
        >
          <Text style={[CSS.senderName]}>
            {data[0].includes("Admin") ? "Developer" : data[0]}
          </Text>
          <Text style={[CSS.Text]}>{data[1]}</Text>
          <Text style={[CSS.replyTime]}>{data[2]}</Text>
        </View>
      );
    });
    return <View>{Elements}</View>;
  } else {
    return <Text>{data.toString()}</Text>;
  }
}
