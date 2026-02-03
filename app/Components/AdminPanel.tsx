import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Messager from "@/app/Components/Messager";
import { DeadlineCalculator } from "@/app/Components/ClientDashboard";

import CSS from "@/app/CSS";
import { ParseMessage } from "./HomePage";

/* ---------------- TYPES ---------------- */

type RequestType = {
  from: string;
  timer: number;
  message: string;
  id: string;
  stage: string;
  reason: string;
  date: string;
  deadline: string;
  budget: string;
  fee: number;
  features: string;
  appName: string;
  projectType: string;
  description: string;
  category: string;
  contactEmail: string;
  contactWhatsApp: string;
  contactOtherName: string;
  contactOtherLink: string;
  balance: number;
  upfront: number;
  username: string;
  _id: string;
};

export default function AdminDashboard({
  User,
  hideDevText,
  setIsReplying,
  devMessage,
  isReplying,
  ReqState,
  setDevMessage,
  setRefresh,
  setHideDevtext,
}: {
  setRefresh: (x: number) => void;
  User: any;
  hideDevText: boolean;
  setIsReplying: (x: boolean) => void;
  devMessage: any;
  isReplying: boolean;
  ReqState: any;
  setDevMessage: any;
  setHideDevtext: (x: boolean) => void;
}) {
  const [RequestList, setRequestList] = useState([]);
  const [MessageClient, setMessageClient] = useState(false);

  const [Code, setCode] = useState("");
  const [Deposit, setDeposit] = useState("");
  const [Note, setNote] = useState("");
  const [IsSettingPhase, setIsSettingPhase] = useState(false);

  function GetNote(code: string) {
    switch (code) {
      case "1":
        return "Your project is now in early development.";
      case "3":
        return "Development in progress.";
      case "4":
        return "Development is in final stage.";
      case "2":
        return "Development paused, please pay required amount to resume development.";
      case "5":
        return "Your project is now ready, please pay remaining balance.";
      case "10":
        return "The developer has completed this project.";
      case "0":
        return "Development is temporarily paused.";
      case "99":
        return "Development is temporarily paused.";

      default:
        return "";
    }
  }

  async function RejectRequest() {
    try {
      setModalVisible(false);
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "rejectRequest",
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
            note: RejectNote,
          }),
        }
      );
      console.log(await res.json());
      UpdatePanel();
    } catch (error) {}
  }

  async function UpdatePanel() {
    try {
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "getRequests",
            email: User.email,
            password: User.password,
          }),
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        if (data.state === "good") {
          setRequestList(data.requestList);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    UpdatePanel();
  }, []);

  async function AcceptRequest() {
    try {
      setModalVisible(false);
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "acceptRequest",
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
            upfront: Upfront,
            note: AcceptNote,
            newFee: FinalFee === undefined ? selectedRequest?.fee : FinalFee,
          }),
        }
      );
      console.log(await res.json());
      UpdatePanel();
    } catch (error) {}
  }

  const [selectedRequest, setSelectedRequest] = useState<RequestType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [ConfirmAccept, setConfirmAccept] = useState(false);
  const [FinalFee, setFinalFee] = useState(selectedRequest?.fee);
  const [Upfront, setUpfront] = useState(0);
  const [ConfirmReject, setConfirmReject] = useState(false);
  const [AcceptNote, setAcceptNote] = useState(
    "Project approved, please pay the required upfront."
  );
  const [RejectNote, setRejectNote] = useState("Request rejected.");
  const [IsSettingStage, setIsSettingStage] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [updateFee, setUpdateFee] = useState("");
  const [updateBalance, setUpdateBalance] = useState("");
  const [updatePhaseDeposit, setUpdatePhaseDeposit] = useState("");
  const [updateDeadline, setUpdateDeadline] = useState("");

  const [IsUpdatingFee, setIsUpdatingFee] = useState(false);
  const [IsUpdatingBalance, setIsUpdatingBalance] = useState(false);
  const [IsUpdatingPhaseDeposit, setIsUpdatingPhaseDeposit] = useState(false);
  const [IsUpdatingDeadline, setIsUpdatingDeadline] = useState(false);
  const [ShowActive,setShowActive]=useState(false)
  const [ShowReview,setShowReview]=useState(false)

  async function GoUpdateFee() {
    try {
      setIsUpdatingFee(true);
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "updateFee",
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
            newFee: updateFee,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingFee(false);
    }
  }
  async function GoUpdateBalance() {
    try {
      setIsUpdatingBalance(true);
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "updateBalance",
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
            newBalance: updateBalance,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingBalance(false);
    }
  }

  async function GoSetPhase() {
    setIsSettingPhase(true);
    try {
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "setPhase",
            code: Code,
            note: Note === "" ? GetNote(Code) : Note,
            deposit: Deposit,
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
          }),
        }
      );
      console.log("$$$$$");
      console.log(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setIsSettingPhase(false);
    }
  }

  async function GoUpdatePhaseDeposit() {
    try {
      setIsUpdatingPhaseDeposit(true);
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "updatePhaseDeposit",
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
            newPhaseDeposit: updatePhaseDeposit,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingPhaseDeposit(false);
    }
  }
  async function GoUpdateDeadline() {
    try {
      setIsUpdatingDeadline(true);
      const res = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "updateDeadline",
            email: User.email,
            password: User.password,
            from: selectedRequest?.from,
            newDeadline: updateDeadline,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingDeadline(false);
    }
  }

  /* ---------------- FUNCTIONS ---------------- */

  function openModal(item: RequestType) {
    setConfirmAccept(false);
    setConfirmReject(false);

    if (item?.message !== undefined) {
      setDevMessage(ParseMessage(item.message, User));
    }
    setSelectedRequest(item);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedRequest(undefined);
  }
  function GetFeeUpfront(fee: number | undefined) {
    if (fee === undefined) {
      return undefined;
    } else {
      return (fee * 0.2).toString();
    }
  }


  function GiveActiveRequest(list:RequestType[]){
    return list.filter(x=>x.stage !== "review" && x.stage !== "completed" && x.stage !== "rejected")
  } 
   function GiveReviewRequest(list:RequestType[]){
    return list.filter(x=>x.stage === "review")
  } 

  /* ---------------- LIST ITEM ---------------- */

  function renderItem({ item }: { item: RequestType }) {
    return (
      <Pressable style={CSS.dashlistItem} onPress={() => openModal(item)}>
        <Text style={CSS.dashappName}>{item.appName}</Text>

        <Text style={CSS.dashsmallText}>{item.projectType.toUpperCase()}</Text>

        <Text style={CSS.dashsmallText}>Budget: {item.budget}</Text>

        <Text style={CSS.dashsmallText}>Fee: {item.fee}</Text>

        <Text style={CSS.dashsmallText}>
          Deadline: {DeadlineCalculator(item.timer.toString(), item.deadline)}
        </Text>

        <Text style={[CSS.dashstage]}>{item.stage}</Text>
      </Pressable>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <View style={[CSS.DashAdminBox, { flex: 1 }]}>
      {/* Header */}
      <Text style={[CSS.QzTittle]}>ADMIN DASHBOARD</Text>

      <Text style={CSS.AdminDashText}>
        Total Requests: {RequestList.length}
      </Text>

      {/* <Text style={CSS.AdminDashText}>Users: 25</Text> */}

      {/* List */}
      <View>
        <Pressable onPress={()=>{setShowActive(!ShowActive)}}>
        <Text style={[CSS.UATittle,CSS.showGroupBtn]}>ACTIVE REQUESTS</Text>
        </Pressable>
        {ShowActive? <FlatList
          inverted
          data={GiveActiveRequest(RequestList)}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />:undefined}
      </View>
      <View>
        <Pressable onPress={()=>{setShowReview(!ShowReview)}}>
        <Text style={[CSS.UATittle,CSS.showGroupBtn]}>REVIEW REQUESTS</Text>
        </Pressable>
        {ShowReview? <FlatList
          inverted
          data={GiveReviewRequest(RequestList)}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />:undefined}
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={CSS.dashmodalOverlay}>
          <Text numberOfLines={1} style={[CSS.QzTittle, { color: "white" }]}>
            {selectedRequest?.username}
          </Text>
          <View style={CSS.dashmodalBox}>
            <ScrollView>
              {/* Top Buttons */}

              {/* Action Buttons */}
              {ConfirmAccept ||
              ConfirmReject ||
              selectedRequest?.stage !== "review" ? undefined : (
                <View style={CSS.dashactionRow}>
                  <Pressable
                    style={CSS.dashacceptBtn}
                    onPress={() => setConfirmAccept(true)}
                  >
                    <Text style={CSS.dashbtnText}>Accept</Text>
                  </Pressable>

                  <Pressable
                    style={CSS.dashrejectBtn}
                    onPress={() => setConfirmReject(true)}
                  >
                    <Text style={CSS.dashbtnText}>Reject</Text>
                  </Pressable>
                </View>
              )}

              {ConfirmAccept ? (
                <View style={[CSS.ConfirmAccept]}>
                  <View>
                    <Text style={[CSS.Text]}>UPFRONT:</Text>
                    <TextInput
                      defaultValue={GetFeeUpfront(selectedRequest?.fee)}
                      onChangeText={(txt) => setUpfront(parseFloat(txt))}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Upfront Amount"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>STAGE NOTICE:</Text>
                    <TextInput
                      onChangeText={(txt) => setAcceptNote(txt)}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      defaultValue={AcceptNote}
                      placeholder="Review Note"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>FINAL FEE:</Text>
                    <TextInput
                      defaultValue={selectedRequest?.fee.toString()}
                      onChangeText={(txt) => setFinalFee(parseFloat(txt))}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Final fee"
                      placeholderTextColor={"silver"}
                    />
                  </View>
                  <Pressable onPress={() => AcceptRequest()}>
                    <Text style={[CSS.ConfirmAcceptBtn]}>CONFIRM ACCEPT</Text>
                  </Pressable>
                </View>
              ) : undefined}

              {selectedRequest?.stage !== "review" &&
              selectedRequest?.stage !== "rejected" &&
              selectedRequest?.stage !== "completed" ? (
                <View style={[{ backgroundColor: "rgb(211, 211, 211)" }]}>
                  <Text style={[CSS.AuthTittle]}>SET STAGE</Text>
                  <Text style={[CSS.Text, { textAlign: "right" }]}>
                    Now on: {selectedRequest?.stage.toUpperCase()}
                  </Text>
                  <View>
                    <View style={[CSS.ContentBox]}>
                      <Text style={[CSS.Text]}>SET PHASE CODE:</Text>
                      <Text style={[CSS.Text]}>0. HOLD</Text>
                      <Text style={[CSS.Text]}>1. Phase 1</Text>
                      <Text style={[CSS.Text]}>2. Phase 2 Payment</Text>
                      <Text style={[CSS.Text]}>3. Phase 2 Start</Text>
                      <Text style={[CSS.Text]}>4. Phase 3 Start</Text>
                      <Text style={[CSS.Text]}>5. Final Payment</Text>
                      <Text style={[CSS.Text]}>10. COMPLETE</Text>
                      <Text style={[CSS.Text]}>99. REJECT</Text>

                      <Text style={[CSS.TnCActTxt, { marginTop: 15 }]}>
                        CODE:
                      </Text>
                      <TextInput
                        onChangeText={(txt) => setCode(txt)}
                        style={[
                          CSS.replyInput,
                          CSS.InputConfirmAccept,
                          { margin: 0, width: 150, borderWidth: 1 },
                        ]}
                        placeholder="Enter Code"
                        placeholderTextColor={"silver"}
                      />
                      <Text style={[CSS.TnCActTxt]}>Note:</Text>
                      <TextInput
                        defaultValue={Note}
                        onChangeText={(txt) => setNote(txt)}
                        style={[
                          CSS.replyInput,
                          CSS.InputConfirmAccept,
                          { margin: 0 },
                        ]}
                        placeholder="Phase Note"
                        placeholderTextColor={"silver"}
                      />
                      {Code === "2" || Code === "5" ? (
                        <View>
                          <Text style={[CSS.TnCActTxt]}>Deposit Amount:</Text>
                          <TextInput
                            defaultValue={Deposit}
                            onChangeText={(txt) => setDeposit(txt)}
                            style={[
                              CSS.replyInput,
                              CSS.InputConfirmAccept,
                              { margin: 0 },
                            ]}
                            placeholder="Deposit Amount"
                            placeholderTextColor={"silver"}
                          />
                        </View>
                      ) : undefined}

                      {IsSettingPhase ? (
                        <ActivityIndicator size={"large"} color={"blue"} />
                      ) : (
                        <Pressable
                          style={[{ margin: 10 }]}
                          onPress={GoSetPhase}
                        >
                          <Text
                            style={[
                              CSS.OptBox,
                              {
                                backgroundColor: "rgb(10, 119, 0)",
                                color: "white",
                              },
                            ]}
                          >
                            UPDDATE
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              ) : undefined}

              {ConfirmReject ? (
                <View style={[CSS.ConfirmAccept]}>
                  <View>
                    <Text style={[CSS.Text]}>REJECT REASON:</Text>
                    <TextInput
                      onChangeText={(txt) => setRejectNote(txt)}
                      defaultValue={RejectNote}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Reject reason"
                      placeholderTextColor={"silver"}
                    />
                  </View>

                  <Pressable onPress={() => RejectRequest()}>
                    <Text
                      style={[
                        CSS.ConfirmAcceptBtn,
                        { backgroundColor: "rgb(172, 0, 0)" },
                      ]}
                    >
                      CONFIRM REJECT
                    </Text>
                  </Pressable>
                </View>
              ) : undefined}

              {/* Details */}
              {selectedRequest && (
                <>
                  <Text style={CSS.dashmodalTitle}>
                    {selectedRequest.appName}
                  </Text>

                  <Text style={CSS.dashmodalText}>Description:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {selectedRequest.description}
                  </Text>

                  <Text style={CSS.dashmodalText}>Category:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {selectedRequest.category}
                  </Text>

                  <Text style={CSS.dashmodalText}>Features:</Text>

                  <Text style={CSS.dashmodalText}>Budget:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {selectedRequest.budget}
                  </Text>
                  <View style={[CSS.RowView]}>
                    <Text style={CSS.dashmodalText}>Upfront:</Text>
                    <Text style={CSS.dashmodalValue}>
                      {selectedRequest.upfront}
                    </Text>
                  </View>

                  <Text style={CSS.dashmodalText}>Fee:</Text>
                  <Text style={CSS.dashmodalValue}>{selectedRequest.fee}</Text>

                  <Text style={CSS.dashmodalText}>Deadline:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {DeadlineCalculator(
                      selectedRequest.timer.toString(),
                      selectedRequest.deadline
                    )}
                  </Text>

                  <Text style={CSS.dashmodalText}>stage:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {selectedRequest.stage}
                  </Text>
                </>
              )}

              <View style={CSS.dashactionRow}>
                <Pressable
                  onPress={() => setOnEdit(true)}
                  style={CSS.dasheditBtn}
                >
                  <Text style={CSS.dashbtnText}>Edit</Text>
                </Pressable>

                <Pressable
                  onPress={() => setMessageClient(!MessageClient)}
                  style={CSS.dashmsgBtn}
                >
                  <Text style={CSS.dashbtnText}>Message</Text>
                </Pressable>
              </View>
              {onEdit ? (
                <View>
                  <Text style={[CSS.QzTittle]}>EDDITING REQUEST</Text>
                  <View>
                    <Text style={[CSS.Text]}>SET TOTAL FEE:</Text>
                    <TextInput
                      defaultValue={selectedRequest?.fee.toString()}
                      onChangeText={(txt) => setUpdateFee(txt)}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Total Fee"
                      placeholderTextColor={"silver"}
                    />
                    {IsUpdatingFee ? (
                      <ActivityIndicator color={"blue"} />
                    ) : (
                      <Pressable onPress={GoUpdateFee}>
                        <Text style={[CSS.Text]}>UPDATE FEE</Text>
                      </Pressable>
                    )}
                  </View>

                  <View>
                    <Text style={[CSS.Text]}>SET BALANCE:</Text>
                    <TextInput
                      defaultValue={selectedRequest?.balance.toString()}
                      onChangeText={(txt) => setUpdateBalance(txt)}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Remaining balance"
                      placeholderTextColor={"silver"}
                    />
                    {IsUpdatingBalance ? (
                      <ActivityIndicator color={"blue"} />
                    ) : (
                      <Pressable onPress={GoUpdateBalance}>
                        <Text style={[CSS.Text]}>UPDATE BALANCE</Text>
                      </Pressable>
                    )}
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>SET DEADLINE:</Text>
                    <Text style={[CSS.Text]}>
                      Adding: +{updateDeadline} Days
                    </Text>
                    <View>
                      <Pressable onPress={() => setUpdateDeadline("1")}>
                        <Text style={[CSS.Text]}>+1 Days</Text>
                      </Pressable>
                      <Pressable onPress={() => setUpdateDeadline("2")}>
                        <Text style={[CSS.Text]}>+2 Days</Text>
                      </Pressable>
                      <Pressable onPress={() => setUpdateDeadline("5")}>
                        <Text style={[CSS.Text]}>+5 Days</Text>
                      </Pressable>
                      <Pressable onPress={() => setUpdateDeadline("7")}>
                        <Text style={[CSS.Text]}>+7 Days</Text>
                      </Pressable>
                    </View>
                    {IsUpdatingDeadline ? (
                      <ActivityIndicator color={"blue"} />
                    ) : (
                      <Pressable onPress={GoUpdateDeadline}>
                        <Text style={[CSS.Text]}>UPDATE DEADLINE</Text>
                      </Pressable>
                    )}
                  </View>

                  <View>
                    <Text style={[CSS.Text]}>SET PHASE DEPOSIT:</Text>
                    <TextInput
                      defaultValue={selectedRequest?.upfront.toString()}
                      onChangeText={(txt) => setUpdatePhaseDeposit(txt)}
                      style={[CSS.replyInput, CSS.InputConfirmAccept]}
                      placeholder="Phase deposit"
                      placeholderTextColor={"silver"}
                    />
                    {IsUpdatingPhaseDeposit ? (
                      <ActivityIndicator color={"blue"} />
                    ) : (
                      <Pressable onPress={GoUpdatePhaseDeposit}>
                        <Text style={[CSS.Text]}>UPDATE DEPOSIT</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ) : undefined}
              {selectedRequest?.message !== "" || MessageClient ? (
                <Messager
                  setRefresh={setRefresh}
                  clientEmail={selectedRequest?.from}
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
              <View style={CSS.dashtopButtons}>
                <Pressable onPress={closeModal}>
                  <Text style={CSS.dashcloseBtn}>✕ CLOSE</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

//deposit amount deadline:
