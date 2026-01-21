import {
  Platform,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  DrawerLayoutAndroid,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
} from "react-native";
import Home from "@/app/Components/HomePage";
import Connector from "@/app/Components/ConnectServer";
import { SafeAreaView } from "react-native-safe-area-context";
import CSS from "@/app/CSS";
import { useEffect, useRef, useState } from "react";
import FAQ from "@/app/Components/FAQ";
import DrawerContent from "@/app/Components/Drawer";
import Authonticate from "@/app/Components/Authonticate";
import Storage from "@react-native-async-storage/async-storage";
export const DB = "Test1";
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
}
const initData = {
  username: "",
  hasRequest: false,
  requestID: "",
  EnqueryId: "",
};

const DEV = false;




export const HOST = DEV
  ? "http://localhost:9000/"
  : "https://apprequestserver.vercel.app/";

export default function App() {
  const [User, setUser] = useState(initData);
  const Android = Platform.OS === "android";
  const Container = Android ? SafeAreaView : ScrollView;
  const DrawerMenu: any = Android ? DrawerLayoutAndroid : View;
  const [onStep, setOnStep] = useState(0);
  const [TnC, setTnC] = useState(false);
  const drawerRef: any = useRef(null);
  const [seePolicy, setSeePolicy] = useState(false);

  const [Activity, setActivity] = useState(ActivityType.Authonticate);
  const [menuModal, setModalMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

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

  function Header() {
    return (
      <View style={[CSS.Header]}>
        <Pressable onPress={OpenDrawer}>
          <Image
            resizeMode="contain"
            style={[CSS.menuIcon]}
            source={require("@/assets/images/icons/menu.png")}
          />
        </Pressable>
        <Text style={[CSS.HeaderTittle]}>APP REQUEST</Text>
      </View>
    );
  }

  function Progress() {
    return (
      <View style={[CSS.ProgressContainer]}>
        <FlatList
          style={[CSS.ProgressBox]}
          horizontal
          data={Steps}
          renderItem={({ item, index }) => (
            <Text
              style={[
                CSS.ProgressBar,
                onStep === index ? CSS.activeProgressBar : undefined,
              ]}
            ></Text>
          )}
        />
      </View>
    );
  }

  function GoBack() {
    if (onStep > 0) {
      setOnStep((x) => x - 1);
    }
  }

  function Quiz1() {
    return (
      <View style={CSS.QuizBox}>
        <Text style={CSS.QzTittle}>{Steps[onStep]}</Text>
        <ScrollView style={CSS.ContentBox}>
          <Text style={[CSS.Text, { marginBottom: Android ? 25 : 0 }]}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est sint
            laborum dolorem inventore obcaecati dolore, repellendus eligendi
            culpa ex consectetur perspiciatis qui magni, perspiciatis error? Eum
            vero quae ullamLorem ipsum dolor sit amet consectetur, adipisicing
            elit. Est sint laborum dolorem inventore obcaecati dolore,
            repellendus eligendi culpa ex consectetur perspiciatis qui magni,
            perspiciatis error? Eum vero quae ullamLorem ipsum dolor sit amet
            consectetur, adipisicing elit. Est sint laborum dolorem inventore
            obcaecati dolore, repellendus eligendi culpa ex consectetur
            perspiciatis qui magni, perspiciatis error? Eum vero quae ullam.
          </Text>
        </ScrollView>
        <View style={CSS.QzActionBox}>
          <Pressable onPress={GoBack}>
            <Text
              style={
                onStep > 0 ? [CSS.QzAction, CSS.QzABack] : CSS.QzActionBlank
              }
            >
              {onStep > 0 ? "BACK" : ""}
            </Text>
          </Pressable>

          <Pressable>
            <Text style={[CSS.QzAction, CSS.QzANext]}>NEXT</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function Quiz2() {
    return (
      <View>
        <Text>Goodbye</Text>
      </View>
    );
  }

  const Steps = [
    "Welcome",
    "Terms & Conditions",
    "Sign Up",
    "Type",
    "Features",
    "Extra Info",
    "Deadline",
    "Info/Question",
    "Submit",
  ];

  const Quiz = [Quiz1(), Quiz2()];
  return (
    <Container style={CSS.Container}>
      <DrawerMenu
        ref={drawerRef}
        drawerBackgroundColor={"rgba(182,52,52,0.95)"}
        renderNavigationView={() => DrawerContent(drawerRef, setModalMenu)}
      >
        <Header />
        <ScrollView nestedScrollEnabled={true}>
          <Modal transparent animationType="fade" visible={menuModal}>
            {DrawerContent(drawerRef, setModalMenu)}
          </Modal>

          {Activity === ActivityType.Home ? (
            <Connector />
          ) : Activity === ActivityType.Request ? (
            <Progress />
          ) : undefined}

          <View style={[CSS.SubContainer]}>
            {Activity === ActivityType.Request ? (
              Quiz[0]
            ) : Activity === ActivityType.Home ? (
              <Home
                isLogged={isLogged}
                setActivity={setActivity}
                OpenDrawer={OpenDrawer}
              />
            ) : Activity === ActivityType.FAQ ? (
              <FAQ setActivity={setActivity} />
            ) : Activity === ActivityType.Authonticate ? (
              <Authonticate
                setTnC={setTnC}
                seePolicy={seePolicy}
                setSeePolicy={setSeePolicy}
                TnC={TnC}
                setActivity={setActivity}
              />
            ) : undefined}
          </View>
        </ScrollView>
      </DrawerMenu>
    </Container>
  );
}
