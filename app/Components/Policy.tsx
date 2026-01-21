import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import CSS from "@/app/CSS";
import { useRef, useState } from "react";

export default function TermsConditions({
  seePolicy,
  setSeePolicy,
  setTnC,
}: {
  setTnC: (x: boolean) => void;
  seePolicy: boolean;
  setSeePolicy: (x: boolean) => void;
}) {
  function CancelPolicy() {
    setSeePolicy(false);
    setTnC(false);
  }

  function AgreePolicy() {
    setSeePolicy(false);
    setTnC(true);
  }

  return (
    <Modal visible={seePolicy} transparent>
      <View style={[CSS.ModalContainer]}>
        <View style={[CSS.TnCModalBox]}>
          <Text style={[CSS.AuthTittle]}>Terms And Conditions</Text>
          <View style={[CSS.TnCSubBox]}>
            <ScrollView>{TnCRead()}</ScrollView>
            <View style={[CSS.TnCActionsBox]}>
              <Pressable onPress={() => CancelPolicy()} style={[CSS.TnCActBox]}>
                <Text style={[CSS.TnCActTxt, CSS.TnCDecline]}>CANCEL</Text>
              </Pressable>
              <Pressable
                onPress={AgreePolicy}
                style={[CSS.TnCActBox, CSS.TncAgree]}
              >
                <Text style={[CSS.TnCActTxt]}>AGREE</Text>
              </Pressable>
            </View>
          </View>
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
