import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import CSS from "@/app/CSS";


const Site = "https://apprequestserver.netlify.app/.netlify/functions/data";

export default function Connector() {
  useEffect(() => {
    async function ReviveServer() {
      try {
      } catch (error) {
        console.error(error);
      }
    }
    ReviveServer();
  });

  enum ConnectType {
    "loading",
    "connected",
    "failed",
  }


  const [Connection, setConnection] = useState(ConnectType.failed);
  useEffect(() => {
    async function CheckServer() {
      try {
        if (Connection === ConnectType.connected) {
          return;
        }
        setConnection(ConnectType.loading);
        const res = await fetch(Site);

        if (res.status === 200) {
          setConnection(ConnectType.connected);
        } else {
          setConnection(ConnectType.failed);
        }
      } catch (error) {
        setConnection(ConnectType.failed);
        console.error(error);
      }
    }
    CheckServer();
  }, []);

  if (Connection === ConnectType.connected) {
    return;
  }

  return (
    <View style={[CSS.ConnectingBox]}>
      <Text style={[CSS.ConnectingTxt]}>
        {Connection === ConnectType.loading
          ? ""
          : Connection === ConnectType.failed
          ? "CONNECTION FAILED"
          : ""}
      </Text>
      <ActivityIndicator
        animating={Connection === ConnectType.loading}
        color={"rgba(255,52,52,1)"}
      />
    </View>
  );
}
