import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import CSS from "@/app/CSS";
import Axios from "axios";
import {HOST} from "@/app/index"


export default function Connector() {
  enum ConnectType {
    "loading",
    "connected",
    "failed",
  }

  const [Connection, setConnection] = useState(ConnectType.failed);
  useEffect(() => {
    async function CheckServer() {
      try {
        if(Connection===ConnectType.connected){return}
        setConnection(ConnectType.loading)
        const res = await fetch(`${HOST}check`)
        if(res.status===200){
          setConnection(ConnectType.connected)
        }
        else{setConnection(ConnectType.failed)}
      } catch (error) {
        setConnection(ConnectType.failed);
        console.error(error);
      }
    }
    CheckServer();
    setTimeout(()=>{
      if(Connection===ConnectType.failed){
        CheckServer()
      }
    }, 5000);
    setTimeout(()=>{
      if(Connection===ConnectType.failed){
        CheckServer()
      }
    }, 10000);
    setTimeout(()=>{
      if(Connection===ConnectType.failed){
        CheckServer()
      }
    }, 30000);
    setTimeout(()=>{
      if(Connection===ConnectType.failed){
        CheckServer()
      }
    }, 50000);
  }, []);

  if(Connection===ConnectType.connected){return}

  return (
    <View style={[CSS.ConnectingBox]}>
      <Text style={[CSS.ConnectingTxt]}>
        {Connection === ConnectType.loading
          ? "CONNECTING"
          : Connection === ConnectType.failed
          ? "OFFLINE"
          : undefined}
      </Text>
      <ActivityIndicator
        animating={Connection === ConnectType.loading}
        color={"rgba(255,52,52,1)"}
      />
    </View>
  );
}
