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

export type TypeState = "checking" | "offline" | "requested" | "none";
export const DEV = false;
export const DB = "DB";

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

export type AdminType =
  | "admin"
  | "manager"
  | "assistant"
  | "developer"
  | "guest";

export const initData = {
  email: "",
  password: "",
  username: "",
  role: "client",
};

console.log("KIN");







//role




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
  const [hideDevText, setHideDevtext] = useState(false);
  const [ReqState, setReqState] = useState<TypeState>("checking");

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
            role: res.role,
          });
          console.log(res.role  );
          if (res.role === "admin") {
            setActivity(ActivityType.AdminPanel);
          }
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
  const [devMessage, setDevMessage] = useState(<Text>No messages</Text>);
  const [Activity, setActivity] = useState(ActivityType.Home);
  const [menuModal, setModalMenu] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [Rates, setRates] = useState(initialRates);
  const [Refresh,setRefresh]=useState(0)


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

  function Header({ User }: { User: any }) {

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
        {User.role === "admin" ? (
          <Text style={[CSS.AdminHeaderTag]}>{User.role.toUpperCase()}</Text>
        ) : undefined}
      </View>
    );
  }


  return (
    <Container style={CSS.Container}>
      {/* <ImageBackground
        style={[
          {
            overflow: "hidden",
            minHeight: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          },
        ]}
        tintColor={"rgba(223, 223, 223, 0.3)"}
        resizeMode="repeat"
        blurRadius={1}
        source={require("@/assets/images/BG2.jpg")}
      > */}
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
          <Header User={User} />
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
                Refresh={Refresh}
                setRefresh={setRefresh}
                  isReplying={isReplying}
                  setIsReplying={setIsReplying}
                  setReqState={setReqState}
                  ReqState={ReqState}
                  hideDevText={hideDevText}
                  setHideDevtext={setHideDevtext}
                  setDevMessage={setDevMessage}
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
                <AdminPanel
                setRefresh={setRefresh}
                  setIsReplying={setIsReplying}
                  isReplying={isReplying}
                  setHideDevtext={setHideDevtext}
                  setDevMessage={setDevMessage}
                  devMessage={devMessage}
                  hideDevText={hideDevText}
                  ReqState={ReqState}
                  User={User}
                />
              ) : Activity === ActivityType.About ? (
                <About setActivity={setActivity} />
              ) : undefined}
            </View>
          </ScrollView>
        </DrawerMenu>
      {/* </ImageBackground> */}
    </Container>
  );
}
