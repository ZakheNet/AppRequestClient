import {
  View,
  Pressable,
  Text,
  Image,
  Dimensions,
  ToastAndroid,
  Platform,
} from "react-native";
import CSS from "@/app/CSS";
import { ActivityType, initData, DB } from "@/app/index";
import Storage from "@react-native-async-storage/async-storage";

const CancelIcon = require("@/assets/images/icons/cancel.png");
const UpdateIcon = require("@/assets/images/icons/update.png");
const EnquireIcon = require("@/assets/images/icons/support.png");
const RatesIcon = require("@/assets/images/icons/rates.png");
const AboutlIcon = require("@/assets/images/icons/about.png");
const LogInIcon = require("@/assets/images/icons/login.png");
const exitIcon = require("@/assets/images/icons/exit.png");
const policyIcon = require("@/assets/images/icons/agreement.png");
const userIcon = require("@/assets/images/icons/user.png");
const RequestIcon = require("@/assets/images/icons/app.png");
const Android = Platform.OS === "android";
export default function DrawerContent({
  Activity,
  setSeePolicy,
  setUser,
  User,
  isLogged,
  drawerRef,
  setModalMenu,
  setActivity,
  setIsLogged,
}: {
  Activity: ActivityType;
  setSeePolicy: (x: boolean) => void;
  setUser: (x: any) => void;
  setIsLogged: (x: boolean) => void;
  User: any;
  isLogged: boolean;
  drawerRef: any;
  setModalMenu: (x: boolean) => void;
  setActivity: (Activity: ActivityType) => void;
}) {
  function CloseDrawer() {
    if (drawerRef === null) {
      return;
    } else {
      if (Android) {
        drawerRef.current.closeDrawer();
      } else {
        setModalMenu(false);
      }
    }
  }

  function GoRates() {
    CloseDrawer();
    setActivity(ActivityType.Rates);
  }
   function GoFAQ() {
    CloseDrawer();
    setActivity(ActivityType.FAQ);
  }

  function GoAbout() {
    CloseDrawer();
    setActivity(ActivityType.About);
  }

  async function logger() {
    if (isLogged) {
      setUser(initData);
      await Storage.setItem("User" + DB, JSON.stringify({ logState: false }));
      setIsLogged(false);
      
      CloseDrawer();
      setActivity(ActivityType.Home);
    } else {
      CloseDrawer();
      setActivity(ActivityType.Authonticate);
    }
  }

  function userAgreement() {
    CloseDrawer();
    setSeePolicy(true);
  }

  return (
    <View
      style={[
        {
          minWidth: Dimensions.get("window").width * 0.83,
          padding: 10,
          backgroundColor: "rgba(182,52,52,0.95)",
          flex: 1,
        },
        Android ? undefined : { minWidth: 1, width: 400 },
      ]}
    >
      <Pressable onPress={() => CloseDrawer()} style={[CSS.DrawbackBox]}>
        <Image
          style={[CSS.backIcon]}
          resizeMode="contain"
          source={CancelIcon}
        />
        <Text style={[CSS.DrawBackTxt]}>CLOSE</Text>
      </Pressable>
      <View style={[CSS.DrawItemsBox]}>
        {isLogged ? (
          <View style={[CSS.ColumnViewCenter, CSS.Profile]}>
            <View style={[CSS.RowViewCenter]}>
              <Image style={[CSS.userIcon]} source={userIcon} />
              <Text style={[CSS.profileName]}>
                {User.username === undefined
                  ? "..."
                  : User.username.toUpperCase()}
              </Text>
            </View>
            {/* <Text numberOfLines={1} style={[CSS.profileEmail]}>{User.email.toLowerCase()}</Text> */}
          </View>
        ) : undefined}
        {/* <Pressable style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={RequestIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>My Request Status</Text>
        </Pressable> */}
        
        {/* <Pressable style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={EnquireIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>Enquire/Report</Text>
        </Pressable> */}
        <Pressable onPress={GoRates} style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={RatesIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>Rates</Text>
        </Pressable>
        <Pressable onPress={GoFAQ} style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={UpdateIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>FAQ</Text>
        </Pressable> 
        <Pressable onPress={GoAbout} style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={AboutlIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>About</Text>
        </Pressable>
        <Pressable onPress={logger} style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={isLogged ? exitIcon : LogInIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>
            {isLogged ? "LogOut" : "LogIn/SignUp"}
          </Text>
        </Pressable>
        <Pressable onPress={userAgreement} style={[CSS.DrawItem]}>
          <Image
            tintColor={"rgba(0,0,0,1)"}
            style={[CSS.DrawIcon]}
            source={policyIcon}
          />
          <Text style={[CSS.DrawItemTxt]}>User Agreement</Text>
        </Pressable>
        <Pressable
          style={[CSS.DrawItem]}
          onPress={() =>
            Android ? ToastAndroid.show("1.0.0", 500) : undefined
          }
        >
          <Text style={[CSS.DrawItemTxt]}>App Version: 1.0.0</Text>
        </Pressable>
      </View>
    </View>
  );
}
