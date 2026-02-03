import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import CSS from "@/app/CSS";
import { useState } from "react";
import { TypeState } from "@/app/index";
const comsIcon = require("@/assets/images/icons/communication.png");
const sendIcon = require("@/assets/images/icons/send.png");

export default function Messager({
  isReplying,
  User,
  setIsReplying,
  ReqState,
  setDevMessage,
  setHideDevtext,
  hideDevText,
  devMessage,
  clientEmail,
  setRefresh,
}: {
  setRefresh:(x:number)=>void
  clientEmail:string |undefined;
  hideDevText: boolean;
  devMessage: React.JSX.Element;
  setDevMessage: (x: React.JSX.Element) => void;
  setHideDevtext: (x: boolean) => void;
  User: any;
  isReplying: boolean;
  setIsReplying: (x: boolean) => void;
  ReqState: TypeState;
}) {
  const [replyMessage, setReplyMessage] = useState("");
  const [SendingReply, setSendingReply] = useState(false);

  async function Reply() {
    if (isReplying) {
      setSendingReply(true);
      setIsReplying(false);

      console.log(clientEmail)

      try {
        const res = await fetch(
          `https://apprequestserver.netlify.app/.netlify/functions/${User.role==="client"?"request":"admin"}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(User.role==="client"?{
              task: "replyMessage",
              email: User.email,
              message: replyMessage,
              password: User.password,
            }:{
              task: "replyClientMessage",
              email: User.email,
              message: replyMessage,
              password: User.password,
              from:clientEmail===undefined? User.email:clientEmail
            }),
          }
        );
        console.log(res)
        if (res.status === 200) {
          const data = await res.json();

          
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSendingReply(false);
        setRefresh(Date.now())
      }
    } else {
      setIsReplying(true);
    }
  }

  function BackHideAct() {
    if (isReplying) {
      setIsReplying(false);
    } else {
      setHideDevtext(!hideDevText);
    }
  }

  return (
    <View style={[CSS.devMessageBox,{alignSelf:"center"}]}>
      <View style={[CSS.RowViewCenter]}>
        <Image style={[CSS.quizPointIcon]} source={comsIcon} />
        <Text style={[CSS.devMessageTitle]}>Messages</Text>
      </View>
      <ScrollView style={[CSS.devMessage]}>
        <Text style={[CSS.devMessageTxt]}>
          {hideDevText ? <Text>...</Text> :devMessage}
        </Text>
      </ScrollView>
      {SendingReply ? (
        <ActivityIndicator size={"large"} color={"white"} />
      ) : ReqState === "requested" || (User.role!=="client" && User.role!=="guest")? (
        <View>
          {isReplying ? (
            <ScrollView
              style={[
                {
                  maxHeight: Dimensions.get("window").height * 0.4,
                  overflow: "scroll",
                  marginBottom: 5,
                },
              ]}
            >
              <TextInput
                onChangeText={(text: string) => setReplyMessage(text)}
                placeholder="Enter reply text"
                placeholderTextColor={"silver"}
                style={[CSS.replyInput]}
                multiline
              />
            </ScrollView>
          ) : undefined}
          <View style={[CSS.devMessageActions]}>
            <Pressable style={[CSS.sendBox]} onPress={Reply}>
              <Text style={[CSS.devMessageActionText]}>
                {isReplying ? "SEND" : "REPLY"}
              </Text>
              {isReplying ? (
                <Image style={[CSS.dropIcon]} source={sendIcon} />
              ) : undefined}
            </Pressable>
            <Pressable style={[CSS.sendBox]} onPress={BackHideAct}>
              <Text style={[CSS.devMessageActionText]}>
                {isReplying ? "BACK" : hideDevText ? "SHOW" : "HIDE"}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : undefined}
    </View>
  );
}
