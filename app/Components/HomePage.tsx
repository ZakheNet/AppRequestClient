import { Text,Pressable,View,Image } from "react-native";
import CSS from "@/app/CSS";
import { ActivityType } from "@/app/index";

 export default function Home({isLogged,setActivity,OpenDrawer}:{isLogged:boolean,setActivity:(x:ActivityType)=>void,OpenDrawer:()=>void}) {
     function ActRequestApp() {
    if (isLogged) {
      setActivity(ActivityType.Request);
    } else {
      setActivity(ActivityType.Authonticate);
    }
  }
  function ActFAQ() {
    setActivity(ActivityType.FAQ);
  }
    return (
      <View style={[CSS.HomeContainer]}>
        <Pressable
          style={[CSS.HomeActBox, CSS.HomeReq]}
          onPress={ActRequestApp}
        >
          <Image
            style={[CSS.HomeMainIcon]}
            source={require("@/assets/images/icons/app.png")}
          />
          <Text style={[CSS.homeActTxt, { fontSize: 34 }]}>Request App</Text>
        </Pressable>

        <Pressable style={[CSS.HomeActBox]} onPress={ActFAQ}>
          <Image
            style={[CSS.HomeSubIcon]}
            source={require("@/assets/images/icons/faq.png")}
          />
          <Text style={[CSS.homeActTxt]}>FAQ</Text>
        </Pressable>

        <Pressable onPress={OpenDrawer} style={[CSS.HomeActBox]}>
          <Image
            style={[CSS.HomeSubIcon]}
            source={require("@/assets/images/icons/more.png")}
          />
          <Text style={[CSS.homeActTxt]}>More</Text>
        </Pressable>
      </View>
    );
  }