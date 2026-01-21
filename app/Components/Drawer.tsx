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

const CancelIcon = require("@/assets/images/icons/cancel.png");
const UpdateIcon = require("@/assets/images/icons/update.png");
const EnquireIcon = require("@/assets/images/icons/support.png");
const RatesIcon = require("@/assets/images/icons/rates.png");
const AboutlIcon = require("@/assets/images/icons/about.png");
const LogInIcon = require("@/assets/images/icons/login.png");
const RequestIcon = require("@/assets/images/icons/app.png");
const Android = Platform.OS === "android";

export default function DrawerContent(
  drawerRef:any,
  setModalMenu: (x: boolean) => void
) {
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

  return (
    <View
      style={[{ minWidth: Dimensions.get("window").width * 0.83, padding: 10,backgroundColor:"rgba(182,52,52,0.95)",flex:1,},Android? undefined:{minWidth:1,width:400}]}
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
        <Pressable style={[CSS.DrawItem]}>
          <Image tintColor={"rgba(0,0,0,1)"} style={[CSS.DrawIcon]} source={RequestIcon} />
          <Text style={[CSS.DrawItemTxt]}>My Request Status</Text>
        </Pressable>
        <Pressable style={[CSS.DrawItem]}>
          <Image tintColor={"rgba(0,0,0,1)"} style={[CSS.DrawIcon]} source={UpdateIcon} />
          <Text style={[CSS.DrawItemTxt]}>Cancel/Update Request</Text>
        </Pressable>
        <Pressable style={[CSS.DrawItem]}>
          <Image tintColor={"rgba(0,0,0,1)"} style={[CSS.DrawIcon]} source={EnquireIcon} />
          <Text style={[CSS.DrawItemTxt]}>Enquire/Report</Text>
        </Pressable>
        <Pressable style={[CSS.DrawItem]}>
          <Image tintColor={"rgba(0,0,0,1)"} style={[CSS.DrawIcon]} source={RatesIcon} />
          <Text style={[CSS.DrawItemTxt]}>Rates</Text>
        </Pressable>
        <Pressable style={[CSS.DrawItem]}>
          <Image tintColor={"rgba(0,0,0,1)"} style={[CSS.DrawIcon]} source={AboutlIcon} />
          <Text style={[CSS.DrawItemTxt]}>About</Text>
        </Pressable>
        <Pressable style={[CSS.DrawItem]}>
          <Image tintColor={"rgba(0,0,0,1)"} style={[CSS.DrawIcon]} source={LogInIcon} />
          <Text style={[CSS.DrawItemTxt]}>LogIn/SignUp</Text>
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
