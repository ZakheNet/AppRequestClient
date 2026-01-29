import { Modal, View, Text } from "react-native";
import CSS from "@/app/CSS";
import { useState } from "react";
import { ActivityType } from "@/app/index";

export enum TypeResult {
  "logged",
  "signed",
  "none",
  "requested",
}

export default function GoodResult({
  state,
  setActivity,
}: {
  state: TypeResult;
  setActivity: (x: any) => void;
}) {
  const [seeResult, setSeeResult] = useState(true);

  setTimeout(() => {
    setSeeResult(false);
    setActivity(ActivityType.Home);
  }, 2000);

  const Message =
    state === TypeResult.logged
      ? "Successfully logged-In"
      : state === TypeResult.signed
      ? "Account created successfully"
      : state === TypeResult.requested
      ? "Request submitted"
      : "";

  return (
    <Modal visible={seeResult} transparent>
      <View style={[CSS.ModalResultContainer]}>
        <View style={[CSS.ResultModalBox]}>
          <Text style={[CSS.ResultTittle]}>{Message}</Text>
        </View>
      </View>
    </Modal>
  );
}
