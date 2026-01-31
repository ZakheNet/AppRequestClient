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
} from "react-native";
import Messager from "@/app/Components/Messager";

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
};

export default function AdminDashboard({
  User,
  hideDevText,
  setIsReplying,
  devMessage,
  isReplying,
  ReqState,
  setDevMessage,
  setHideDevtext,
}: {
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

  async function RejectRequest() {
    try {
      setModalVisible(false)
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
            note:RejectNote,
            newFee:FinalFee
          }),
        }
      );
      UpdatePanel()
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
              task: "requeststage",
              email: User.email,
              password: User.password,
            }),
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          if (data.state === "good") {
            console.log("Admin Good");
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
      setModalVisible(false)
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
            upfront:Upfront,
            note:AcceptNote
          }),
        }
      );
      UpdatePanel()
    } catch (error) {}
  }
  
  const [selectedRequest, setSelectedRequest] = useState<RequestType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [ConfirmAccept,setConfirmAccept]=useState(false)
  const [FinalFee,setFinalFee]=useState(selectedRequest?.fee)
  const [Upfront,setUpfront]=useState(0)
  const [ConfirmReject,setConfirmReject]=useState(false)
  const [AcceptNote,setAcceptNote]=useState("Project approved, please pay the required upfront.")
  const [RejectNote,setRejectNote]=useState("Request rejected.")


  /* ---------------- FUNCTIONS ---------------- */

  function openModal(item: RequestType) {
    setConfirmAccept(false)
    setConfirmReject(false)
    if (selectedRequest?.message !== undefined) {
      console.log(selectedRequest.message);
      setDevMessage(ParseMessage(selectedRequest.message, User));
    }
    setSelectedRequest(item);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedRequest(undefined);
  }
  function GetFeeUpfront(fee:number | undefined){
    if(fee===undefined){return undefined}
    else{
      return (fee*0.20).toString()
    }
  }


  /* ---------------- LIST ITEM ---------------- */

  function renderItem({ item }: { item: RequestType }) {
    return (
      <Pressable style={CSS.dashlistItem} onPress={() => openModal(item)}>
        <Text style={CSS.dashappName}>{item.appName}</Text>

        <Text style={CSS.dashsmallText}>{item.category}</Text>

        <Text style={CSS.dashsmallText}>Budget: {item.budget}</Text>

        <Text style={CSS.dashsmallText}>Fee: {item.fee}</Text>

        <Text style={CSS.dashsmallText}>Deadline: {item.deadline}</Text>

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

      <Text style={CSS.AdminDashText}>Users: 25</Text>

      {/* List */}
      <FlatList
      inverted
        data={RequestList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

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
              {ConfirmAccept || ConfirmReject? undefined:<View style={CSS.dashactionRow}>
                <Pressable
                  style={CSS.dashacceptBtn}
                  onPress={()=>setConfirmAccept(true)}
                >
                  <Text style={CSS.dashbtnText}>Accept</Text>
                </Pressable>

                <Pressable style={CSS.dashrejectBtn} onPress={()=>setConfirmReject(true)}>
                  <Text style={CSS.dashbtnText}>Reject</Text>
                </Pressable>

               
              </View>}

             

               {ConfirmAccept? <View style={[CSS.ConfirmAccept]}>
                  <View >
                    <Text style={[CSS.Text]}>UPFRONT:</Text>
                    <TextInput defaultValue={GetFeeUpfront(selectedRequest?.fee)} onChangeText={(txt)=>setUpfront(parseFloat(txt))} style={[CSS.replyInput,CSS.InputConfirmAccept]} placeholder="Upfront Amount" placeholderTextColor={"silver"} />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>STAGE NOTICE:</Text>
                    <TextInput onChangeText={(txt)=>setAcceptNote(txt)} style={[CSS.replyInput,CSS.InputConfirmAccept]} defaultValue={AcceptNote} placeholder="Review Note" placeholderTextColor={"silver"} />
                  </View>
                  <View>
                    <Text style={[CSS.Text]}>FINAL FEE:</Text>
                    <TextInput defaultValue={selectedRequest?.fee.toString()} onChangeText={(txt)=>setFinalFee(parseFloat(txt))} style={[CSS.replyInput,CSS.InputConfirmAccept]}  placeholder="Final fee" placeholderTextColor={"silver"} />
                  </View>
                  <Pressable onPress={() => AcceptRequest()}><Text style={[CSS.ConfirmAcceptBtn]}>CONFIRM ACCEPT</Text></Pressable>
                </View>:undefined}

                
               {ConfirmReject? <View style={[CSS.ConfirmAccept]}>
                  <View >
                    <Text style={[CSS.Text]}>REJECT REASON:</Text>
                    <TextInput onChangeText={(txt)=>setRejectNote(txt)} defaultValue={RejectNote} style={[CSS.replyInput,CSS.InputConfirmAccept]} placeholder="Reject reason" placeholderTextColor={"silver"} />
                  </View>
                  
                  <Pressable onPress={() => RejectRequest()}><Text style={[CSS.ConfirmAcceptBtn,{backgroundColor:"rgb(172, 0, 0)"}]}>CONFIRM REJECT</Text></Pressable>
                </View>:undefined}

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

                  <Text style={CSS.dashmodalText}>Fee:</Text>
                  <Text style={CSS.dashmodalValue}>{selectedRequest.fee}</Text>

                  <Text style={CSS.dashmodalText}>Deadline:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {selectedRequest.deadline}
                  </Text>

                  <Text style={CSS.dashmodalText}>stage:</Text>
                  <Text style={CSS.dashmodalValue}>
                    {selectedRequest.stage}
                  </Text>
                </>
              )}

              <View style={CSS.dashactionRow}>
                <Pressable style={CSS.dasheditBtn}>
                  <Text style={CSS.dashbtnText}>Edit</Text>
                </Pressable>

                <Pressable
                  onPress={() => setMessageClient(!MessageClient)}
                  style={CSS.dashmsgBtn}
                >
                  <Text style={CSS.dashbtnText}>Message</Text>
                </Pressable>
              </View>
              {selectedRequest?.message !== "" || MessageClient ? (
                <Messager
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

const DummyData = [
  {
    from: "kingbuff@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.tbrdjyjyjdyj@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "3",
    budget: "59",
    fee: 90,
    features: "--Server-Database-Email System--Authontication-",
    appName: "Rondo Beach Club",
    projectType: "website",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "0943624",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 0,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.itdgkfgkdufj@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 55,
    features: "-------",
    appName: "Sassling Snails",
    projectType: "native",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Blog",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.fdtikfgkjj@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 55,
    features: "----maintanance---",
    appName: "Beasty",
    projectType: "native",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "other",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.duydxudi@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 24,
    features: "--Server--Email System---",
    appName: "Takila Bushes",
    projectType: "app",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.dyfjduu@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "60",
    budget: "R4788",
    fee: 55,
    features: "--Server--Email System---",
    appName: "JAZZ",
    projectType: "app",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.dsyjdj@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 55,
    features: "--Server--Email System---",
    appName: "JAZZ",
    projectType: "app",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.udjyjxstg@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 55,
    features: "--Server--Email System---",
    appName: "JAZZ",
    projectType: "app",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.dymndjd@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 55,
    features: "--Server--Email System---",
    appName: "JAZZ",
    projectType: "app",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "alostroboy@mail",
    timer: 1769766085946,
    message: "",
    id: "Req744.tshsthsth@mail",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-001-30/9:41:25",
    deadline: "7",
    budget: "R4788",
    fee: 55,
    features: "--Server--Email System---",
    appName: "JAZZ",
    projectType: "app",
    description: "FGSHSRTBH R J RYJ DRYJXFY YF JXFYUJXF F",
    category: "Business",
    contactEmail: "alostroboy@mail",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 11,
  },

  {
    from: "zakhe@gmail.com",
    timer: 1769734815968,
    message:
      "Client: ++^++ Tester  ++^++ 30/1/2026  10:30==^==Client: ++^++ 555 ++^++ 30/001/2026  09:24==^==Client: ++^++ HP ++^++ 30/001/2026  09:22==^==Client: ++^++ I'm ok thanks for the rain to me and I can't wait to see you all I think of you and your family and your  ++^++ 30/1/2026  9:7==^==Client: ++^++ Meat ++^++ 30/1/2026  9:6==^==Client: ++^++ Guy ++^++ 30/1/2026  9:6==^==Client: ++^++ Zee ++^++ 30/1/2026  8:58==^==Client: ++^++ XD hurry  ++^++ 30/1/2026  8:58==^==Client: ++^++ Bad Boy ++^++ 30/1/2026  7:35==^==Client: ++^++ Zakes ++^++ 30/1/2026  7:35==^==Client: ++^++ Ghjgchh\nHhhjjo\nBhjk\nGhjklo\nGuiol\nGhuio\nHjio\nHhjjj\nHhjjkkk\nHhjjk\nHhjjk\nHhjjkl\nHhj ++^++ 30/1/2026  7:17==^==Client: ++^++ Ok ++^++ 30/1/2026  7:14==^==",
    id: "Req695.dthsdthshts@gmail.com",
    stage: "review",
    reason: "Your request is under review",
    date: "2026-1-30/1:0:15",
    deadline: "14",
    budget: "509",
    fee: 59,
    features: "Auth--Server-Database--Deploy--",
    appName: "GwenTalks",
    projectType: "app",
    description: "Gjjdrghju\n",
    category: "Other",
    contactEmail: "zakhe@gmail.com",
    contactWhatsApp: "",
    contactOtherName: "",
    contactOtherLink: "",
    balance: 0,
    upfront: 53,
  },
];
