import { View, Text, Image, Pressable, FlatList } from "react-native";
import CSS from "@/app/CSS";
import { Axios } from "axios";


console.log(123)

export default function Dashboard() {
    
  return <View>
    <Text>Requests: 16</Text>
    <Text>Enquiries: 9</Text>
    <Text>Reports: 3</Text>
    <Text>Accounts: 25</Text>  
  </View>;
}

