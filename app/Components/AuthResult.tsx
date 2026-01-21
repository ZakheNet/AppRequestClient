import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import CSS from "@/app/CSS";
import {useState } from "react";
import {TypeResult} from "@/app/Components/Authonticate"
import { ActivityType } from "@/app/index";

export default function AuthResult({
  state,setActivity
}: {
  state:TypeResult,
  setActivity:(x:any)=>void
}) {

  const [seeResult,setSeeResult]=useState(true)

  setTimeout(() => {
    setSeeResult(false)
    setActivity(ActivityType.Home)
  }, 2000);

  const Message  = state===TypeResult.logged? "Successfully logged-In" : state===TypeResult.signed? "Account created successfully" :""
  

  return (
    <Modal visible={seeResult} transparent>
      <View style={[CSS.ModalResultContainer]}>
        <View style={[CSS.ResultModalBox]}>
          <Text style={[CSS.ResultTittle]}>{Message}</Text>
        </View>
      </View>
    </Modal>
  );
}

function TnCRead() {
  return (
    <View style={[CSS.TncReadBox]}>
      <Text style={[CSS.tncReadTxt]}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat,
        accusamus doloremque harum suscipit, iste temporibus, nulla voluptatibus
        necessitatibus exercitationem numquam velit accusantium quasi dolores
        officia repellat debitis. Amet, molestiae voluptatem. Eius, fuga nulla,
        tempore cupiditate totam dicta saepe sunt autem incidunt deleniti ullam,
        ea nisi. Maiores reprehenderit aspernatur laudantium quod consequuntur
        reiciendis sunt vel. Quo voluptates eum nihil nostrum ut. Quis magni
        accusamus officiis, iure aliquid tempora adipisci cumque illum eveniet
        modi fugiat neque velit eius! Voluptatibus, excepturi, libero, numquam
        dicta eaque illum tempora veritatis dolor facilis ipsam nisi vel?
        Aperiam aut doloribus natus ducimus nulla quia consectetur non possimus
        dolorem sint reprehenderit laboriosam, quis odio iusto repellendus quos.
        Unde nisi officia quisquam dolore magni veritatis incidunt tempora error
        expedita! Libero officiis voluptatum dolorum alias accusantium
        repudiandae nostrum delectus fuga omnis ratione et perspiciatis, fugiat
        id consequuntur architecto optio, nesciunt sed magnam? Asperiores neque
        delectus mollitia deleniti quae dolorum necessitatibus?Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Quaerat, accusamus doloremque
        harum suscipit, iste temporibus, nulla voluptatibus necessitatibus
        exercitationem numquam velit accusantium quasi dolores officia repellat
        debitis. Amet, molestiae voluptatem. Eius, fuga nulla, tempore
        cupiditate totam dicta saepe sunt autem incidunt deleniti ullam, ea
        nisi. Maiores reprehenderit aspernatur laudantium quod consequuntur
        reiciendis sunt vel. Quo voluptates eum nihil nostrum ut. Quis magni
        accusamus officiis, iure aliquid tempora adipisci cumque illum eveniet
        modi fugiat neque velit eius! Voluptatibus, excepturi, libero, numquam
        dicta eaque illum tempora veritatis dolor facilis ipsam nisi vel?
        Aperiam aut doloribus natus ducimus nulla quia consectetur non possimus
        dolorem sint reprehenderit laboriosam, quis odio iusto repellendus quos.
        Unde nisi officia quisquam dolore magni veritatis incidunt tempora error
        expedita! Libero officiis voluptatum dolorum alias accusantium
        repudiandae nostrum delectus fuga omnis ratione et perspiciatis, fugiat
        id consequuntur architecto optio, nesciunt sed magnam? Asperiores neque
        delectus mollitia deleniti quae dolorum necessitatibus?
      </Text>
    </View>
  );
}
