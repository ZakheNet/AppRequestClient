import {
  Platform,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  DrawerLayoutAndroid,
  Modal,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import Home from "@/app/Components/HomePage";
import Connector from "@/app/Components/ConnectServer";
import { SafeAreaView } from "react-native-safe-area-context";
import CSS from "@/app/CSS";
import { useEffect, useRef, useState } from "react";
import FAQ from "@/app/Components/FAQ";
import DrawerContent from "@/app/Components/Drawer";
import RatesPage, { initialRates } from "@/app/Components/RatesPage";
import Progress from "@/app/Components/progress";
import Authonticate from "@/app/Components/Authonticate";
import RequestPage from "@/app/Components/RequestPage";
import Storage from "@react-native-async-storage/async-storage";
import AdminPanel from "@/app/Components/AdminPanel";
import About from "@/app/Components/About";

export const DEV = false;
export const DB = "Test20 ";
export enum ActivityType {
  "Home",
  "FAQ",
  "Authonticate",
  "Request",
  "Update",
  "Rates",
  "About",
  "Support",
  "Status",
  "AdminPanel",
}

type AdminType = "King" | "Manager" | "Assistant" | "Dev" | "Guest";

export const initData = {
  email: "",
  password: "",
  username: "",
  hasRequest: false,
  requestID: "",
  EnqueryId: "",
};

console.log("KIN");

export const Steps = [
  "Type",
  "Category",
  "Description",
  "Features",
  "Deadline",
  "Contacts",
  "Submit",
];

/* eas build -p android --profile preview */

export const Android = Platform.OS === "android";

export const HOST = DEV
  ? "http://localhost:9000/"
  : "http://apprequestserver.netlify.app/.netlify/functions/";

export default function App() {
  const [TnC, setTnC] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState(initData);

  useEffect(() => {
    async function GetStorage() {
      try {
        const rawUser = await Storage.getItem("User" + DB);
        const res = JSON.parse(rawUser || "");
        const hasLogged = res.logState === "good" || false;
        if (hasLogged) {
          setIsLogged(hasLogged);
          setTnC(hasLogged);
          setUser({
            ...User,
            email: res.email,
            password: res.password,
            username: res.username,
          });
        }
      } catch (e) {}
    }
    GetStorage();
  }, []);

  const Container = Android ? SafeAreaView : ScrollView;
  const DrawerMenu: any = Android ? DrawerLayoutAndroid : View;
  const [onStep, setOnStep] = useState(0);
  const drawerRef: any = useRef(null);
  const [seePolicy, setSeePolicy] = useState(false);
  const [devMessage, setDevMessage] = useState("");
  const [Activity, setActivity] = useState(ActivityType.Home);
  const [menuModal, setModalMenu] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [AdminLevel, setAdminLevel] = useState<AdminType>("King");

  const [Rates, setRates] = useState(initialRates);

  useEffect(() => {
    try {
      GetLatestRates();
      async function GetLatestRates() {
        const raw = await Storage.getItem("LatestRates" + DB);
        if (raw != null && raw !== undefined) {
          const latestRates = await JSON.parse(raw);
          setRates(latestRates);
        }
        async function GetRates() {
          try {
            const newRates = await fetch(
              "http://apprequestserver.netlify.app/.netlify/functions/rates"
            ).then((res) => res.json());

            if (newRates !== null && newRates !== undefined) {
              await Storage.setItem(
                "LatestRates" + DB,
                JSON.stringify(newRates)
              );
              setRates(newRates);
            }
          } catch (error) {
            console.error(error);
          }
        }

        GetRates();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  function OpenDrawer() {
    if (drawerRef === null) {
      return;
    } else {
      if (Android) {
        drawerRef.current.openDrawer();
      } else {
        setModalMenu(true);
      }
    }
  }

  function Header({
    isAdmin,
    AdminLevel,
  }: {
    isAdmin: boolean;
    AdminLevel: AdminType;
  }) {
    return (
      <View style={[CSS.Header]}>
        <Pressable style={[CSS.RowView]} onPress={OpenDrawer}>
          <Image
            resizeMode="contain"
            style={[CSS.menuIcon]}
            source={require("@/assets/images/icons/menu.png")}
          />
          <Text style={[CSS.HeaderTittle]}>APP REQUEST</Text>
        </Pressable>
        {isAdmin ? (
          <Text style={[CSS.AdminHeaderTag]}>{AdminLevel.toUpperCase()}</Text>
        ) : undefined}
      </View>
    );
  }

  return (
    <Container style={CSS.Container}>
      <ImageBackground
        style={[
          {
            overflow: "hidden",
            minHeight: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          },
        ]}
        resizeMode="repeat"
        blurRadius={11}
        source={require("@/assets/images/BG2.jpg")}
      >
        <DrawerMenu
          ref={drawerRef}
          drawerBackgroundColor={"rgba(182,52,52,0.95)"}
          renderNavigationView={() => (
            <DrawerContent
              Activity={Activity}
              setSeePolicy={setSeePolicy}
              setIsLogged={setIsLogged}
              setUser={setUser}
              User={User}
              isLogged={isLogged}
              drawerRef={drawerRef}
              setModalMenu={setModalMenu}
              setActivity={setActivity}
            />
          )}
        >
          <Header AdminLevel={AdminLevel} isAdmin={isAdmin} />
          <ScrollView>
            <Modal transparent animationType="fade" visible={menuModal}>
              <DrawerContent
                Activity={Activity}
                setSeePolicy={setSeePolicy}
                setIsLogged={setIsLogged}
                setUser={setUser}
                User={User}
                isLogged={isLogged}
                drawerRef={drawerRef}
                setModalMenu={setModalMenu}
                setActivity={setActivity}
              />
            </Modal>

            {Activity === ActivityType.Home ? (
              <Connector />
            ) : Activity === ActivityType.Request ? (
              <Progress onStep={onStep} />
            ) : undefined}

            <View style={[CSS.SubContainer]}>
              {Activity === ActivityType.Request ? (
                <RequestPage
                  Rates={Rates}
                  User={User}
                  setActivity={setActivity}
                  onStep={onStep}
                  setOnStep={setOnStep}
                />
              ) : Activity === ActivityType.Home ? (
                <Home
                  User={User}
                  devMessage={devMessage}
                  Activity={Activity}
                  seePolicy={seePolicy}
                  setTnC={setTnC}
                  setSeePolicy={setSeePolicy}
                  isLogged={isLogged}
                  setActivity={setActivity}
                  OpenDrawer={OpenDrawer}
                />
              ) : Activity === ActivityType.FAQ ? (
                <FAQ setActivity={setActivity} />
              ) : Activity === ActivityType.Authonticate ? (
                <Authonticate
                setDevMessage={setDevMessage}
                  Activity={Activity}
                  setUser={setUser}
                  User={User}
                  setTnC={setTnC}
                  setIsLogged={setIsLogged}
                  seePolicy={seePolicy}
                  isLogged={isLogged}
                  setSeePolicy={setSeePolicy}
                  TnC={TnC}
                  setActivity={setActivity}
                />
              ) : Activity === ActivityType.Rates ? (
                <RatesPage Rates={Rates} setActivity={setActivity} />
              ) : Activity === ActivityType.AdminPanel ? (
                <AdminPanel />
              ) : Activity === ActivityType.About ? (
                <About setActivity={setActivity} />
              ) : undefined}
            </View>
          </ScrollView>
        </DrawerMenu>
      </ImageBackground>
    </Container>
  );
}
/* 
<View style={[CSS.UserAgreementContainer]}>
  <View style={[CSS.topic]}>
    <Text style={[CSS.UserAgreementTittle]}>REFUNDS</Text>
    <Text style={[CSS.subText]}>
      ...Some user agreement details about refunds here
    </Text>
  </View>

  <View style={[CSS.topic]}>
    <Text style={[CSS.UserAgreementTittle]}>Payments</Text>
    <Text style={[CSS.subText]}>
      ...Some user agreement details about refunds here
    </Text>
  </View>

  <View style={[CSS.topic]}>
    <Text style={[CSS.UserAgreementTittle]}>Privacy</Text>
    <Text style={[CSS.subText]}>
      ...Some user agreement details about refunds here
    </Text>
  </View>
</View>

following this structure and FormData, generate a user agreement or terms and conditions for my "App Request" application, the app allow users to signup with their username email and password to create an account then they can request an app by spcifying the details category and features of their App, the users depending on the type of project will have to first wait for the app developer to approve or reject their request after submmiting, if their project is approved they need to make a 20% upfront deposit which is fully refundable in the first phase of the project, when the project reaches phase2 a  30% deposit is required and in the final phase3 when the project is completed the remaining 50% is then preventAutoHideAsync, payments are made through gateways such as paypay or which ever payment method work for both the client and developer, communication between the developer is made through external platforms such as via email, whatsapp or other method spicified by the client, the client via the app will frequently recieve updates and progress reports via the App, the client is allowed to cancel the project and with a full refund only in the first phase of the PromiseRejectionEvent, should the client cancel in the 2nd phase of the project a fee of 15% is deducted from the full refund, and canceling in the last phase a 40% is deducted, the client is allowed to request a handful of changes to the project without any fees, write a well descriptive user agreement and add important things as WEBGL_lose_context, make it look clean and professional


1TB SSD
12TB HDD (4,4,4)
12GB GPU
i7 9/10th Gen
32GB DDR4
42 1080p + 42 720p + 52inc

9
10
11
12 
---1 Break
2
3
4
---5 Break
6
7
8 










 */
