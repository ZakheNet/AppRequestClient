import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Linking,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TextInput,
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

function GetStageName(stage: StageType) {
  switch (stage) {
    case "review":
      return "In Review";
    case "rejected":
      return "Not Approved";
    case "upfrontHold":
      return "Upfront Hold";
    case "phase1":
      return "Development started";
    case "payPhase2":
      return "Mid-development payment";
    case "phase2":
      return "Development in progress";
    case "phase3":
      return "Finalising development";
    case "finalPay":
      return "Finalise payment";
    case "complete":
      return "COMPLETED";
    case "hold":
      return "Development paused";
    default:
      return "Project abandoned";
  }
}

export function DeadlineCalculator(timer: string, deadline: string) {
  try {
    const now = Date.now();
    const day = 86400000;
    const from = parseInt(timer);
    const due = parseInt(deadline);

    const timeleft = (from + due * day - now) / day;
    const fixedTime = timeleft.toFixed(0);

    return timeleft === 0
      ? "Today"
      : timeleft > 0
      ? `${fixedTime} days left`
      : timeleft < 0
      ? "Overdue"
      : "None";
  } catch (e) {
    console.error(e);
    return "None";
  }
}

export default function ClientDashboard({
  User,
  RequestStatus,
  setRefresh,
}: {
  setRefresh: any;
  User: any;
  RequestStatus: any;
}) {
  const [ShowPayments, setShowPayments] = useState(false);
  const [ShowReqActions, setShowReqAction] = useState(false);
  const [ShowFullDash, setShowFullDash] = useState(true);
  const [IsClosing, setIsClosing] = useState(false);

  const [visibleOptDeadline, setVisibleOptDeadline] = useState(false);
  const [visibleOptProjectInfo, setVisibleOptProjectInfo] = useState(false);
  const [visibleOptContacts, setVisibleOptContacts] = useState(false);
  const [visibleOptDelete, setVisibleOptDelete] = useState(false);
  const [IsUpdatingContact, setIsUpdatingContact] = useState(false);

  const [updateEmail,setUpdateEmail]=useState("")
  const [updateWhatsApp,setUpdateWhatsApp]=useState("")
  const [updateOtherName,setUpdateOtherName]=useState("")
  const [updateOtherLink,setUpdateOtherLink]=useState("")

  async function ContactUpdate() {
    setIsUpdatingContact(true);
    try {
      const resc = await fetch(
        `https://apprequestserver.netlify.app/.netlify/functions/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "updateContact",
            email: User.email,

            newEmail:updateEmail===""?RequestStatus.contactEmail :updateEmail,
            newWhatsApp:updateWhatsApp===""?RequestStatus.contactWhatsApp :updateWhatsApp,
            newOtherName:updateOtherName===""?RequestStatus.contactOtherName :updateOtherName,
            newOtherLink:updateOtherLink===""?RequestStatus.contactOtherLink :updateOtherLink,
            password: User.password,
          }),
        }
      );
      console.log(await resc.json());
      setIsUpdatingContact(false);
    } catch (error) {
      setIsUpdatingContact(false);

      console.error(error);
    } finally {
      setIsUpdatingContact(false);
      setVisibleOptContacts(false)
    }
    setRefresh(Date.now());
  }

  async function OkayClose() {
    setIsClosing(true);
    try {
      const resc = await fetch(
        `https://apprequestserver.netlify.app/.netlify/functions/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "okayclose",
            from: User.email,

            password: User.password,
          }),
        }
      );
      console.log(await resc.json());
      setIsClosing(false);
    } catch (error) {
      setIsClosing(false);

      console.error(error);
    } finally {
      setIsClosing(false);
    }
    setRefresh(Date.now());
  }

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
              Status: {GetStageName(RequestStatus.stage)}
            </Text>
          </View>
          <Text style={[CSS.DashText, { textAlign: "center" }]}>
            {RequestStatus.reason}
          </Text>
        </View>
        <Text style={[CSS.DashText]}>
          Deadline:{" "}
          {DeadlineCalculator(RequestStatus.timer, RequestStatus.deadline)}
        </Text>
        <View>
          <Text style={[CSS.DashText]}>Total: ${RequestStatus.fee}</Text>
          {RequestStatus.budget === "" ? undefined : (
            <Text style={[CSS.DashText]}>Budget: {RequestStatus.budget}</Text>
          )}
        </View>

        {RequestStatus.stage === "review" ? undefined : (
          <Text style={[CSS.DashText]}>
            Remaining balance: ${RequestStatus.balance}
          </Text>
        )}

        {RequestStatus.stage === "complete" ||
        RequestStatus.stage === "rejected" ? (
          <View style={[CSS.OkayCloseBox]}>
            <Text>Press okay to remove this request</Text>
            {IsClosing ? (
              <ActivityIndicator color={"red"} size={"large"} />
            ) : (
              <Pressable onPress={OkayClose}>
                <Text style={[CSS.OkayCloseText]}>OKAY</Text>
              </Pressable>
            )}
          </View>
        ) : undefined}

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

        <View
          style={[
            {
              maxWidth: 600,
              width: Dimensions.get("window").width * 0.85,
              alignSelf: "center",
            },
          ]}
        >
          {RequestStatus.stage === "rejected" ? undefined : (
            <Pressable>
              <Text
                style={[CSS.DashActionText]}
                onPress={() => setShowReqAction(!ShowReqActions)}
              >
                OPTIONS
              </Text>
            </Pressable>
          )} 
          {ShowReqActions ? (
            <View style={[CSS.dashActionsBox]}>
              {/* <Pressable onPress={()=>setVisibleOptDeadline(true)}>
              <Text style={[CSS.DashText]}>Extand Deadline</Text>             
            </Pressable> */}
              <Pressable
                onPress={() => setVisibleOptProjectInfo(!visibleOptProjectInfo)}
              >
                <Text
                  selectable={false}
                  style={[CSS.DashText, CSS.DashOptText]}
                >
                  Project Details
                </Text>
                {visibleOptProjectInfo ? (
                  <View style={[CSS.RequestOptInfoBox]}>
                    <Text style={[CSS.subOptText]}>
                      App Name: {RequestStatus.appName}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Type: {RequestStatus.projectType}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Category: {RequestStatus.category}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Description: {RequestStatus.description}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Features:{" "}
                      {RequestStatus.features.toString().split("-").join(" ")}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Deadline:{" "}
                      {DeadlineCalculator(
                        RequestStatus.timer,
                        RequestStatus.deadline
                      )}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Status: {GetStageName(RequestStatus.stage)}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Email: {RequestStatus.contactEmail}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      WhatsApp: {RequestStatus.contactWhatsApp}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Other Contact: {RequestStatus.contactOtherName}:{" "}
                      {RequestStatus.contactOtherLink}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Total Fee: ${RequestStatus.fee}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Balance: ${RequestStatus.balance}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Your Budget: {RequestStatus.budget}
                    </Text>
                    <Text style={[CSS.subOptText]}>
                      Date: {RequestStatus.date}
                    </Text>
                  </View>
                ) : undefined}
              </Pressable>
             {/*  
              <Pressable
                onPress={() => setVisibleOptContacts(!visibleOptContacts)}
              >
                <Text style={[CSS.DashText, CSS.DashOptText]}>
                  Update Contacts
                </Text>
              </Pressable>

              {visibleOptContacts ? (
                <View style={[CSS.RequestOptInfoBox]}>
                  <View>
                    <Text style={[CSS.Text]}>Email:</Text>
                    <TextInput
                    onChangeText={(txt)=>setUpdateEmail(txt)}
                      defaultValue={RequestStatus.contactEmail}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Upfront Amount"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>WhatsApp:</Text>
                    <TextInput
                    onChangeText={(txt)=>setUpdateWhatsApp(txt)}
                      defaultValue={RequestStatus.contactWhatsApp}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="WhatsApp number"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>Platform (e.g Outlook):</Text>
                    <TextInput
                    onChangeText={(txt)=>setUpdateOtherName(txt)}
                      defaultValue={RequestStatus.contactOtherName}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="eg. Outlook/Telegram"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>
                      Platform Link (e.g Account link/number):
                    </Text>
                    <TextInput
                    onChangeText={(txt)=>setUpdateOtherLink(txt)}
                      defaultValue={RequestStatus.contactOtherLink}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Link/handle/username"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  {IsUpdatingContact? <ActivityIndicator size={"large"} color={"green"}/>:<Pressable onPress={ContactUpdate}>
                    <Text
                      style={[
                        CSS.OptBox,
                        {
                          backgroundColor: "green",
                          color: "white",
                          alignSelf: "center",
                        },
                      ]}
                    >
                      Submit Update
                    </Text>
                  </Pressable>}
                </View>
              ) : undefined}
              <Pressable onPress={() => setVisibleOptDelete(!visibleOptDelete)}>
                <Text style={[CSS.DashText, { textAlign: "center" }]}>
                  Delete Request
                </Text>
              </Pressable>
              {IsClosing ? (
                <ActivityIndicator size={"large"} color={"red"} />
              ) : visibleOptDelete ? (
                <View style={[CSS.RequestOptInfoBox]}>
                  <Text style={[CSS.FaqTittleTxt, { textAlign: "center" }]}>
                    {RequestStatus.stage === "review" ||
                    RequestStatus.stage === "rejected"
                      ? "Confirm Delete"
                      : "Please confirm with the developer to remove this request"}
                  </Text>
                  {RequestStatus.stage === "review" ? (
                    <View>
                      <Text
                        style={[
                          CSS.subText,
                          { textAlign: "center", marginBottom: 10 },
                        ]}
                      >
                        This will delete the current request, are you sure?
                      </Text>
                      <View style={[CSS.RowViewCenter]}>
                        <Pressable onPress={() => setVisibleOptDelete(false)}>
                          <Text
                            style={[
                              CSS.OptBox,
                              { backgroundColor: "rgb(167, 167, 167)" },
                            ]}
                          >
                            Cancel
                          </Text>
                        </Pressable>
                        <Pressable onPress={OkayClose}>
                          <Text style={[CSS.OptBox]}>Delete Request</Text>
                        </Pressable>
                      </View>{" "}
                    </View>
                  ) : undefined}
                </View>
              ) : undefined} */}
            </View>
          ) : undefined}
        </View>
      </View>
    </View>
  );
}

///////////////////////////////
///////////////////////////////
///////////////////////////////

///////////////////////////////
///////////////////////////////
//okay options delete request submit update
