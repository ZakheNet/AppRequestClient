import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Linking,
  Dimensions,
  ImageBackground,
} from "react-native";
import CSS from "@/app/CSS";
import { useState } from "react";
const icon = require("@/assets/images/icons/rates.png");
const payPalIcon = require("@/assets/images/icons/palIcon.png");
const AppIcon = require("@/assets/images/icons/app.png");
const payBanner = require("@/assets/images/icons/pal.png");
const reviewIcon = require("@/assets/images/icons/review.png");

export type StageType =
  | "review"
  | "rejected"
  | "upfrontHold"
  | "hold"
  | "phase1"
  | "payPhase2"
  | "phase2"
  | "phase3"
  | "finalPay"
  | "complete";

  function GetStageName(stage:StageType){
    switch (stage) {
      case "review": return "In Review"
      case "rejected": return "Not Approved"
      case "upfrontHold": return "Upfront Hold"
      case "phase1": return "Development started"
      case "payPhase2": return "Mid-development payment"
      case "phase2": return "Development in progress"
      case "phase3": return "Finalising development"
      case "finalPay": return "Finalise payment"
      case "complete": return "COMPLETED"
      case "hold": return "Development paused"
      default: return "This project has been abandoned"
    }
  }

  
export default function ClientDashboard({
  User,
  RequestStatus,
}: {
  User: any;
  RequestStatus: any;
}) {
  const [ShowPayments, setShowPayments] = useState(false);
  const [ShowReqActions, setShowReqAction] = useState(true);
  const [ShowFullDash, setShowFullDash] = useState(true);

  return (
    <View style={[CSS.CliDashContainer]}>
      <View>
        <View
          style={[
            CSS.RowViewCenter,
            { backgroundColor: "rgba(0, 0, 0, 0.07)" },
          ]}
        >
          <Image style={[CSS.quizPointIcon]} source={AppIcon} />
          <Text
            numberOfLines={1}
            style={[
              {
                fontSize: 23,
                padding: 4,
                fontWeight: "500",

                textAlign: "center",
              },
            ]}
          >
            {RequestStatus.appName || "Dashboard"}
          </Text>
        </View>
        <View
          style={[
            { backgroundColor: "rgba(255, 255, 255, 0.48)", marginBottom: 7 },
          ]}
        >
          <View style={[CSS.RowViewCenter, { marginTop: 10 }]}>
            <Image style={[{ height: 30, width: 25 }]} source={reviewIcon} />
            <Text style={[{ fontSize: 23, textAlign: "center" }]}>
              Status:{GetStageName(RequestStatus.stage)}
            </Text>
          </View>
          <Text style={[CSS.DashText, { textAlign: "center" }]}>
            {RequestStatus.reason}
          </Text>
        </View>
        <Text style={[CSS.DashText]}>
          Deadline: {RequestStatus.timer} days left
        </Text>
        <View>
          <Text style={[CSS.DashText]}>Total: ${RequestStatus.fee}</Text>
          {RequestStatus.budget === "" ? undefined : (
            <Text style={[CSS.DashText]}>Budget: {RequestStatus.budget}</Text>
          )}
        </View>

        {RequestStatus.stage==="review"?undefined:<Text style={[CSS.DashText]}>
          Remaining balance: ${RequestStatus.balance}
        </Text>}

        {RequestStatus.stage === "upfrontHold" ||
        RequestStatus.stage === "payPhase2" ||
        RequestStatus.stage === "finalPay" ? (
          <Pressable
            style={[CSS.MakePayBox, CSS.RowView]}
            onPress={() => {
              setShowPayments(!ShowPayments);
            }}
          >
            <Image style={[CSS.quizPointIcon]} source={payPalIcon} />
            <Text style={[CSS.MakePayText]}>Make Payment</Text>
          </Pressable>
        ) : undefined}

        <Modal transparent visible={ShowPayments} animationType="fade">
          <View style={CSS.payModal}>
            <View style={CSS.PayModalBox}>
              {/* Header */}
              <Text style={CSS.payTitle}>Hi, {User.username}!</Text>

              {/* Price */}
              <View style={CSS.payPriceBox}>
                <Text style={CSS.payLabel}>Amount to Pay :</Text>
                <Text style={CSS.payPrice}>${RequestStatus.upfront || ""}</Text>
              </View>

              {/* Instructions */}
              <View style={CSS.payInfoBox}>
                <Text style={CSS.payInfoText}>
                  You will be redirected to PayPal to make the required payment.
                </Text>
                <Text style={CSS.payInfoText}>
                  After payment, the developer will confirm and start your
                  project.
                </Text>
              </View>

              {/* Buttons */}
              <View style={[CSS.payBtnRow, { flexDirection: "column" }]}>
                {/* Pay Button */}
                <Pressable
                  style={CSS.payBtn}
                  onPress={() => {
                    // Redirect to PayPal
                    Linking.openURL("https://paypal.me/AppRequest");
                  }}
                >
                  {/* <Image resizeMode="contain" style={[{width:250,height:40}]} source={payBanner}/> */}

                  <ImageBackground
                    resizeMode="contain"
                    style={[
                      { width: 250, height: 40, justifyContent: "center" },
                    ]}
                    source={payBanner}
                  ></ImageBackground>
                </Pressable>

                {/* Cancel Button */}
                <Pressable
                  style={CSS.payCancelBtn}
                  onPress={() => setShowPayments(false)}
                >
                  <Text style={CSS.payCancelText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* <Pressable>
          <Text
            style={[CSS.DashActionText]}
            onPress={() => setShowReqAction(!ShowReqActions)}
          >
            OPTIONS
          </Text>
        </Pressable>
        {ShowReqActions ? (
          <View style={[CSS.dashActionsBox]}>
            <Pressable>
              <Text style={[CSS.DashText]}>Extand Deadline</Text>
            </Pressable>
            <Pressable>
              <Text style={[CSS.DashText]}>Project Details</Text>
            </Pressable>
            <Pressable>
              <Text style={[CSS.DashText]}>Update Contacts</Text>
            </Pressable>
            <Pressable>
              <Text style={[CSS.DashText]}>Delete Request</Text>
            </Pressable>
          </View>
        ) : undefined} */}
      </View>
    </View>
  );
}
