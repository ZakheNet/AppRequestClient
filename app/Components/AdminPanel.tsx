import { View, Text, Image, Pressable, FlatList } from "react-native";
import CSS from "@/app/CSS";
import { Axios } from "axios";
import Dashboard from "./AdminDashboard";



export default function AdminPanel() {
  return (
    <View>
      <Dashboard />
    </View>
  );
}

type RequestType = {};


/* 

ROLES:
Guest:
- Read Enquireries
- See Dashboard
- Read Request

DEV:
- See Dashboard
- Accept Request
- 
-

ASSISTANT:
- Respond Enquiries
- See Dashboard
- Schedule Request
- 

MANAGER:
- Set Guest Dev Assistant
- Remove Guest Assistant Dev
- Decline Request
-

KING:
- Remove All
- Respond Enquiries
- See Dashboard
- Schedule Request

*/

/* 

USERS MODEL:

*/

type UserSchema = {
  hasRequest: { type: boolean; default: false };
  username: string;
  email: string;
  password: string;
  payInfo:{type:string,default:""}
  CliDEV: { type: string; default: "" };
  DEVjobs: { default: ""; type: string };
  role: {
    default: "client";
    type: "client" | "guest" | "dev" | "admin" | "assistant";
  };
};
/* 
type requestSchema = {
   from: String,
    timer: Number,
    message: String,
    id: String,
    stage: String,
    reason: String,
    date: String,
    deadline: String,
    budget: String,
    fee: Number,
    features: String,
    enquiry: String,
    reports: String,
    appName: String,
    projectType: String,
    description: String,
    category: String,
    contactEmail: String,
    contactWhatsApp: String,
    contactOtherName: String,
    contactOtherLink: String
};
 */