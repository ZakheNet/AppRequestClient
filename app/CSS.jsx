import { Dimensions, Platform, StyleSheet } from "react-native";

const CSS = StyleSheet.create({
  /* MAIN */
  Container: { flex: 1, backgroundColor: "rgb(189, 189, 189)" },

  SubContainer: {
    justifyContent: "center",
    flex: 1,
  },

  Text: { fontSize: 22, fontWeight: "500" },
  QzActionBox: {
    flexDirection: "row",
    gap: 50,
    justifyContent: "space-evenly",
    padding: 8,
  },

  /* TOP HEADER */

  Header: {
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(189, 52, 52, 1)",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    justifyContent: "space-between",
  },
  AdminHeaderTag: {
    fontSize: 20,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.47)",
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: "500",
    marginRight: 5,
  },
  HeaderSplit: { flexDirection: "row", justifyContent: "space-between" },
  HeaderTittle: { fontSize: 20, fontWeight: "700" },
  menuIcon: { height: 27, width: 40 },

  adminDashboardBox: {},

  RenderedItem: {},

  /* PROGRESS BAR */

  ProgressContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkred",
  },

  activeProgressBar: {
    backgroundColor: "rgba(189, 52, 52, 1)",
    height: 11,
    width: 45,
    borderRadius: 5,
  },
  ProgressBox: { gap: 60 },
  ProgressBar: {
    margin: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: 30,
    height: 10,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "rgba(20, 52, 52, 1)",
  },

  /* REQUEST PAGE */

  QzTittle: {
    fontSize: 27,
    fontWeight: "600",
    textAlign: "center",
  },
  feeText: { fontSize: 27, fontWeight: "500", marginHorizontal: 20 },
  requestIcon: { height: 35, width: 35 },

  QuizBox: {
    backgroundColor: "rgba(202, 202, 202, 1)",
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
    borderRadius: 10,
    margin: 15,
    marginTop: 1,
    height:
      Dimensions.get("window").height * (Platform.OS === "web" ? 0.84 : 0.77),
    maxWidth: 900,
    overflow: "scroll",
    /* Height:Dimensions.get("window").height  */
  },
  ContentBox: {
    backgroundColor: "rgba(236, 236, 236, 1)",
    padding: 15,
    margin: 10,
    flex: 1,
    borderWidth: 0,
  },

  QzAction: {
    padding: 2,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderRadius: 7,
    fontSize: 22,
    fontWeight: "600",
    width: 120,
    textAlign: "center",
  },
  QzActionBlank: {
    width: 120,
  },

  QzABack: { backgroundColor: "" },
  QzANext: { backgroundColor: "" },
  NextDisabled: {
    borderColor: "rgba(50,50,50,0.4)",
    color: "rgba(50,50,50,0.4)",
    backgroundColor: "rgba(255, 255, 255, 0.36)",
  },
  quizCheckIcon: { height: 50, width: 50 },
  quizPointIcon: { height: 20, width: 20 },
  quizPointFeatureIcon: { height: 17, width: 17 },

  DescriptionInput: {
    borderWidth: 1,
    fontSize: 22,
    maxHeight:
      Platform.OS === "android" ? 200 : Dimensions.get("window").height,
    padding: 5,
  },
  showDescription: {
    fontSize: 17,
    backgroundColor: "rgb(189, 189, 189)",
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "500",
    borderWidth: 1,
  },
  subDescriptionText: { borderWidth: 1, padding: 4, margin: 2 },

  AdditionalInput: { borderWidth: 1, fontSize: 22, padding: 5 },
  contactItem: { marginBottom: 15 },
  estimationBox: {
    backgroundColor: "rgb(109, 189, 243)",
    padding: 4,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  submitTotalTxt: { fontSize: 27, fontWeight: "500" },
  noteEstimationTxt: { fontSize: 20 },
  submitFeaturesBox: { marginHorizontal: 12 },
  clientBudgetBox: { margin: 5 },

  /* DRAWER */

  backIcon: { height: 20, width: 20 },
  DrawbackBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "flex-end",
  },

  userIcon: { height: 45, width: 45 },
  Profile: {
    backgroundColor: "rgba(255, 255, 255,0.2)",
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    margin: 10,
    overflow: "hidden",
  },
  profileName: { fontSize: 27, fontWeight: "500" },
  profileEmail: { fontSize: 17, fontWeight: 500 },

  DrawBackTxt: { fontSize: 17, fontWeight: "500" },
  DrawItemsBox: { marginTop: 30 },
  DrawItem: {
    padding: 10,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  DrawItemTxt: { fontSize: 22, fontWeight: "500" },
  DrawIcon: { height: 22, width: 22 },
  RowView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  RowViewCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  ColumnViewCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  Bold: { fontWeight: "bold" },
  BoldS: { fontWeight: "500" },

  /* HOME */

  HomeContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    /*  marginVertical: Dimensions.get("window").height * 0.25, */
  },
  ConnectingBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkred",
    gap: 6,
  },
  ConnectingTxt: {
    fontSize: 17,
    fontWeight: "900",
    color: "rgba(255,255,255,0.7)",
  },
  HomeActBox: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 5,
    gap: 10,
    width: Dimensions.get("window").width * 0.5,
    backgroundColor: "rgba(182,52,52,1)",
  },
  homeActTxt: { fontSize: 27, fontWeight: "500", textAlign: "center" },
  HomeReq: {
    height: 90,
    width: Dimensions.get("window").width * 0.7,
    maxWidth: 500,
  },
  HomeMainIcon: { height: 42, width: 42 },
  HomeSubIcon: { height: 27, width: 27 },

  devMessageBox: {
    marginTop: 10,
    backgroundColor: "rgba(182,52,52,1)",
    width: Dimensions.get("window").width * 0.9,
    maxWidth: 700,
    maxHeight: Dimensions.get("window").height * 0.4,

    borderRadius: 5,
    borderWidth: 1,
  },
  devMessageTitle: { fontSize: 20, textAlign: "center" },
  devMessage: {},
  devMessageTxt: {
    borderRadius: 6,
    backgroundColor: "rgb(204, 204, 204)",
    padding: 5,
    margin: 5,
    fontWeight: "500",
    fontSize: 18,
    borderWidth: 1,
    /* height:
      Platform.OS === "android"
        ? undefined
        : Dimensions.get("window").height * 0.1,
    maxHeight: Dimensions.get("window").height * 0.5, */
  },
  sendBox: {
    flexDirection: "row",
    padding: 4,
    backgroundColor: "rgb(209, 209, 209)",
    paddingHorizontal: 15,
    borderRadius: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  devMessageActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 2,
    marginBottom: 6,
  },
  devMessageActionText: {
    fontSize: 18,
    fontWeight: "600",
  },
  replyInput: {
    margin: 10,
    backgroundColor: "white",
    color: "black",
    fontSize: 20,
  },

  messageItem: { borderRadius: 5, margin: 5 },
  replyClient: { backgroundColor: "rgb(30, 211, 141)", padding: 4 },
  replyAdmin: {},
  senderName: {
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    padding: 4,
  },
  replyTime: {
    fontWeight: "bold",
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "right",
    marginTop: 5,
    padding: 5,
  },

  /* CLIENT DASHBOARD */

  CliDashContainer: {
    backgroundColor: "rgb(231, 231, 231)",
    display: "flex",
    borderWidth: 2,
    borderColor: "rgba(50,50,50,1)",
    borderRadius: 15,
    padding: 15,
    width: Dimensions.get("window").width * 0.95,
    marginTop: 15,
  },
  MakePayBox: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgb(45, 160, 16)",
    borderWidth: 0,
    elevation: 5,
    borderRadius: 6,
    width: Dimensions.get("window").width * 0.8,
    maxWidth: 600,
    margin: 10,
    fontSize: 30,
    alignSelf: "center",
  },
  MakePayText: { fontSize: 20, fontWeight: "500" },
  DashText: { fontSize: 17 },
  DashActionText: {
    marginTop: 10,
    backgroundColor: "rgb(0, 120, 189)",
    fontSize: 19,
    fontWeight: "500",
    padding: 6,
  },
  dashActionsBox: { backgroundColor: "rgb(0, 96, 156)" },

  payModal: {
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  PayModalBox: {
    backgroundColor: "rgb(150, 26, 26)",
    padding: 5,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.95,
    maxWidth: 600,
    elevation: 5,
  },

  payTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
  },

  payPriceBox: {
    backgroundColor: "#112442",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  payLabel: {
    color: "#cbd5e1",
    fontSize: 14,
  },

  payPrice: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#56ccff",
    marginTop: 5,
  },

  payInfoBox: {
    marginBottom: 20,
  },

  payInfoText: {
    color: "#e5e7eb",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },

  payBtnRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  payBtn: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#0070ba", // PayPal Blue
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  payCancelBtn: {
    backgroundColor: "#334155",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,

    alignItems: "center",
  },

  payCancelText: {
    color: "#fff",
    fontSize: 16,
  },

  /* FAQ */

  FAQContainer: {},
  FaqBackTxt: { fontSize: 27, fontWeight: "500" },
  FaqBackIcon: { height: 27, width: 27 },
  FaqTittleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(196, 196, 196)",
    flexDirection: "row",
  },
  Faqs: { gap: 5 },
  FAQItem: {},
  FAQAns: { fontSize: 22, marginHorizontal: 27 },
  FaqTittleIcon: { height: 40, width: 40 },
  BackBox: { gap: 5, flexDirection: "row", alignItems: "center", margin: 5 },
  FaqTittleBox: {
    backgroundColor: "rgba(255, 255, 255, 0.27)",
    padding: 5,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  FaqTittleMainTxt: { fontSize: 27, fontWeight: "500" },
  FaqTittleTxt: { fontSize: 22, fontWeight: "500" },
  dropIcon: { height: 20, width: 20 },

  /* AUTHONTICATE */
  AuthContainer: { flex: 1 },
  AuthTittle: { fontWeight: "600", fontSize: 27, textAlign: "center" },
  AuthInfoBox: {
    maxWidth: 700,
    alignSelf: "center",
    backgroundColor: "rgba(225, 225, 225, 0.95)",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    gap: 15,
    width:
      Dimensions.get("window").width > 1000
        ? 700
        : Dimensions.get("window").width * 0.9,
  },
  AuthItemBox: {},
  AuthLabel: { fontSize: 22, fontWeight: "500" },
  AuthInputTxt: {
    borderWidth: 1,
    fontSize: 22,
    padding: 5,
  },
  AuthSubmitBox: {
    backgroundColor: "rgb(76, 124, 255)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 30,
    maxWidth: 400,
    alignSelf: "center",
  },
  AuthSubmitTxt: { fontSize: 22, fontWeight: "600", textAlign: "center" },
  AuthTittleIcon: { height: 30, width: 30 },
  AuthCheckIcon: { height: 27, width: 27 },
  AuthTNCTxt: { fontSize: 22, fontWeight: "500", color: "rgb(0, 0, 0)" },
  AuthHaveAccountBox: { marginVertical: 15, marginHorizontal: 10 },
  AuthHaveAccountTxt: { fontSize: 22 },
  AuthNoSubmit: { backgroundColor: "rgba(228, 42, 51, 0.9)" },
  AuthErrorBox: {
    backgroundColor: "rgba(236, 0, 0, 0.61)",
    padding: 5,
    borderRadius: 5,
  },
  AuthErrorTxt: { textAlign: "center", color: "white", fontSize: 17 },

  /* TERMS AND CONDITIONS */

  ModalContainer: {
    backgroundColor: "rgb(0, 0, 0,0.4)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  TnCModalBox: {
    height: Dimensions.get("window").height * 0.85,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "rgb(240, 240, 240)",
    borderRadius: 5,
    elevation: 3,
  },
  TnCActBox: {},
  tncReadTxt: { fontSize: 22 },
  TnCActTxt: {
    fontSize: 23,
    fontWeight: "600",
    padding: 4,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  TncAgree: { backgroundColor: "rgb(100, 180, 8)" },
  TnCDecline: { backgroundColor: "rgb(167, 167, 167)" },
  TnCActionsBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 9,
  },
  TnCSubBox: {
    height: Dimensions.get("window").height * 0.8,
    overflow: "scroll",
  },
  TncReadBox: {
    margin: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 5,
  },
  topic: { marginBottom: 10 },
  UAContainer: {},
  UATittle: { fontSize: 22, fontWeight: "500" },
  subText: { fontSize: 17 },

  /*AUTH RESULTS MESSAGE */

  ModalResultContainer: {
    backgroundColor: "rgba(0, 0, 0,0.4)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ResultModalBox: {
    borderWidth: 5,
    borderColor: "rgb(0, 158, 66)",
    height: 150,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "rgb(238, 238, 238)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  ResultTittle: { fontWeight: "600", fontSize: 27, textAlign: "center" },

  /* RATES */

  rateAmount: { fontWeight: "600" },
  changeCurrency: {
    backgroundColor: "rgb(0, 129, 250)",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 17,
    fontWeight: "bold",
    elevation: 7,
  },
  ratesTopic: {
    fontWeight: "600",
    fontSize: 22,
    textDecorationLine: "underline",
    paddingLeft: 5,
  },
  rateItem: { borderBottomWidth: 1, padding: 10 },
  rateItemTxt: { fontSize: 17 },
  rateItemExplain: { fontSize: 15 },
  rateModalContainer: {
    width: Dimensions.get("window").width * 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(50, 50, 50, 0.25)",
    flex: 1,
  },
  rateModalBox: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "rgb(0, 92, 230)",
    padding: 10,
    borderRadius: 10,
    height: Dimensions.get("window").height * 0.7,
  },
  modalChangeTittle: { fontWeight: "600", fontSize: 27, textAlign: "center" },
  currencyChoiceBox: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 1,
    borderRadius: 5,
  },
  rateChoiceItem: {
    borderBottomWidth: 1,
    fontWeight: 500,
    fontSize: 17,
    textAlign: "center",
    padding: 15,
  },
  rateModalBackBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    flex: 1,
  },

  /* ADMIN DASHBOARD */
  AdminDashText: { fontSize: 20, fontWeight: "500" },
  DashAdminBox: {
    borderWidth: 2,
    backgroundColor: "rgb(228, 69, 69)",
    padding: 7,
    margin: 10,
    borderRadius: 7,
  },

  /* ADMIN PANEL */

  dashlistItem: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },

  dashappName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  dashsmallText: {
    color: "#bbb",
    fontSize: 13,
  },

  dashstage: {
    marginTop: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
  },

  dashapproved: { color: "green" },
  rejected: { color: "red" },
  pending: { color: "orange" },

  dashmodalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  dashmodalBox: {
    width: Dimensions.get("window").width * 0.99,
    backgroundColor: "#111",
    padding: 15,
    maxHeight: Dimensions.get("window").height * 0.9,
  },

  dashtopButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dasheditBtn: {
    backgroundColor: "#2196F3",
    padding: 6,
    borderRadius: 6,
  },

  dashmsgBtn: {
    backgroundColor: "#4CAF50",
    padding: 5,
    minWidth: 150,
    borderRadius: 6,
  },

  dashcloseBtn: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },

  dashmodalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },

  dashmodalText: {
    color: "#aaa",
    marginTop: 8,
  },

  dashmodalValue: {
    color: "#fff",
    marginLeft: 5,
  },

  dashactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  dashacceptBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },

  dashrejectBtn: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },

  dashbtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    width: 150,
    textAlign: "center",
  },

  ConfirmAccept: { backgroundColor: "silver", padding: 5, margin: 10 },
  InputConfirmAccept: { padding: 5, fontSize: 20 },
  ConfirmAcceptBtn:{fontSize:25,backgroundColor:"rgb(13, 116, 0)",color:"white",fontWeight:"bold",textAlign:"center",width:500,alignSelf:"center",padding:9,borderRadius:7},
});

export default CSS;
