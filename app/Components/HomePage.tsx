import { Text, Pressable, View, Image, ScrollView, ActivityIndicator } from "react-native";
import CSS from "@/app/CSS";
import { ActivityType } from "@/app/index";
import Policy from "@/app/Components/Policy";
import { useState } from "react";

const comsIcon = require("@/assets/images/icons/communication.png");
const authIcon = require("@/assets/images/icons/feature.png");

export default function Home({
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
      setActivity(ActivityType.Request);
    } else {
      setActivity(ActivityType.Authonticate);
    }
  }
  function ActFAQ() {
    setActivity(ActivityType.FAQ);
  }

  type TypeState = "checking" | "offline" | "requested" | "none";

  const [ReqState, setReqState] = useState<TypeState>("checking");

  return (
    <View style={[CSS.HomeContainer]}>
      <Pressable style={[CSS.HomeActBox, CSS.HomeReq]} onPress={ActRequestApp}>
        {ReqState==="checking" && isLogged? <ActivityIndicator color={"black"} size={"large"}/>:<Image
          style={[CSS.HomeMainIcon]}
          source={
            isLogged ? require("@/assets/images/icons/app.png") : authIcon
          }
        />}
        <Text style={[CSS.homeActTxt, { fontSize: 34 }]}>
          {!isLogged ? "SignUp" :ReqState==="checking"? "Loading":"Request App"}
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
