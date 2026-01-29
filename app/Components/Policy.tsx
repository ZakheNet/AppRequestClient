import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { ActivityType } from "@/app/index";
import CSS from "@/app/CSS";

export default function TermsConditions({
  isLogged,
  setActivity,
  Activity,
  seePolicy,
  setSeePolicy,
  setTnC,
}: {
  isLogged:boolean,
  setActivity: (x: ActivityType) => void;
  Activity: ActivityType;
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
          <Text style={[CSS.AuthTittle]}>User Agreement</Text>
          <View style={[CSS.TnCSubBox]}>
            <ScrollView>{TnCRead()}</ScrollView>
            {Activity === ActivityType.Authonticate ? (
              <View style={[CSS.TnCActionsBox]}>
                <Pressable
                  onPress={() => CancelPolicy()}
                  style={[CSS.TnCActBox]}
                >
                  <Text style={[CSS.TnCActTxt, CSS.TnCDecline]}>CANCEL</Text>
                </Pressable>
                <Pressable
                  onPress={AgreePolicy}
                  style={[CSS.TnCActBox, CSS.TncAgree]}
                >
                  <Text style={[CSS.TnCActTxt]}>AGREE</Text>
                </Pressable>
              </View>
            ) : (
              <View style={[CSS.TnCActionsBox]}>
                <Pressable
                  onPress={AgreePolicy}
                  style={[CSS.TnCActBox, CSS.TnCDecline]}
                >
                  <Text style={[CSS.TnCActTxt]}>BACK</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSeePolicy(false);
                    setActivity(ActivityType.Authonticate);
                  }}
                  style={[CSS.TnCActBox, CSS.TncAgree]}
                >
                  {isLogged? undefined:<Text style={[CSS.TnCActTxt]}>SignUp</Text>}
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

function TnCRead() {
  return (
    <View style={[CSS.TncReadBox]}>
      <View style={[CSS.UAContainer]}>
        {/* INTRODUCTION */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Introduction</Text>
          <Text style={[CSS.subText]}>
            Welcome to App Request. By creating an account and using this
            application, you agree to comply with and be bound by these Terms
            and Conditions. This agreement governs your access to and use of the
            services, platform, and related features.
          </Text>
        </View>

        {/* //<!-- ACCOUNT REGISTRATION --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Account Registration</Text>
          <Text style={[CSS.subText]}>
            Users must register using a username of their choice, a valid email
            address, and password. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            conducted under your account.
          </Text>
        </View>

        {/* //<!-- PROJECT REQUESTS --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Project Requests</Text>
          <Text style={[CSS.subText]}>
            Users may submit app or website development requests by specifying
            project details and desired features. All submitted requests are
            subject to review and approval by the developer. The developer
            reserves the right to approve or reject any request at their
            discretion.
          </Text>
        </View>

        {/* PROJECT TIMELINES & EXTENSIONS */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Deadlines & Extensions</Text>
          <Text style={[CSS.subText]}>
            Project deadline or timeline provided are estimates and not
            guaranteed completion dates. As an independent developer, delays may
            occur due to unforeseen circumstances. In such cases, the developer
            reserves the right to extend project deadlines where reasonably
            necessary. Clients will be notified of any delays and provided with
            updated timelines through the App or agreed communication channels.
            Reasonable extensions shall not be considered a breach of this
            Agreement, and do not entitle the client to automatic refunds or
            penalties.
          </Text>
        </View>

        {/* //<!-- PROJECT PHASES --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Project Phases</Text>
          <Text style={[CSS.subText]}>
            All approved projects are divided into three phases: Phase 1
            (Planning, Early development and Design), Phase 2 (Futher
            development and Testing), and Phase 3 (Finalization and Delivery).
            Progress reports and updates will be provided through the App and/or
            via user provided contact method/platform.
          </Text>
        </View>

        {/* //<!-- PAYMENTS --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Payments</Text>
          <Text style={[CSS.subText]}>
            Upon project approval, clients are required to pay a 20% upfront
            deposit to initiate development / Phase 1, unless otherwise agreed
            upon by both the client and the developer. When the project enters
            Phase 2, an additional 30% payment is required, unless alternative
            payment arrangements have been mutually agreed upon. The remaining
            50% must be paid upon project completion in Phase 3, or as otherwise
            specified in the project agreement. Payments may be made through
            supported gateways such as PayPal or other mutually agreed payment
            methods.
          </Text>
        </View>

        {/* ESTIMATED PRICING & FINAL COST */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>
            Estimated Pricing & Final Project Cost
          </Text>
          <Text style={[CSS.subText]}>
            Any price, rate, or cost displayed during the project request
            process represents an estimated quotation only. These estimates are
            generated based on the information provided by the client and
            selected features. The final project price may increase or decrease
            depending on actual project complexity, technical requirements,
            design scope, integrations, revisions, and development time. The
            developer reserves the right to review, adjust, and confirm the
            final project cost after evaluating the full project requirements.
            Clients will be informed of any pricing changes before development
            begins and before any payments are processed.
          </Text>
        </View>

        {/* //<!-- REFUNDS --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Refunds & Cancellations</Text>
          <Text style={[CSS.subText]}>
            Clients may cancel their project at any stage. Cancellations during
            Phase 1 qualify for a full refund. Cancellations during Phase 2 will
            incur a 15% service fee. Cancellations during Phase 3 will incur a
            40% deduction. Refunds will be processed using the original payment
            method.
          </Text>
        </View>

        {/* -- CHANGE REQUESTS --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Project Modifications</Text>
          <Text style={[CSS.subText]}>
            Clients are entitled to request a reasonable number of minor changes
            during development without additional charges. Excessive changes or
            major feature additions may require additional fees and timeline
            adjustments.
          </Text>
        </View>

        {/* //<!-- COMMUNICATION --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Communication</Text>
          <Text style={[CSS.subText]}>
            Communication between clients and developers may occur within the
            platform or through external platforms such as email, messaging, or
            other agreed channels. App Request is not responsible for disputes
            or data shared outside the platform.
          </Text>
        </View>

        {/* //<!-- PRIVACY --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Privacy & Data Protection</Text>
          <Text style={[CSS.subText]}>
            Your privacy and personal data is respected and protected.
            Information collected during registration and project management is
            used solely for service delivery and will not be sold nor shared to
            third parties. Users are responsible for safeguarding their own
            communication data.
          </Text>
        </View>

        {/* //<!-- TECHNICAL LIMITATIONS --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Technical Limitations</Text>
          <Text style={[CSS.subText]}>
            App Request is not responsible for interruptions caused by device
            limitations, network failures, WEBGL_lose_context errors, server
            downtime, or third-party service outages. We strive to maintain
            system stability but cannot guarantee uninterrupted access at all
            times.
          </Text>
        </View>

        {/* //<!-- INTELLECTUAL PROPERTY --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Intellectual Property</Text>
          <Text style={[CSS.subText]}>
            Upon full payment and project completion, ownership of the final
            application belongs to the client. App Request and developers
            reserve the right to showcase completed projects for portfolio and
            promotional purposes unless otherwise agreed.
          </Text>
        </View>

        {/* //<!-- TERMINATION --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Account Termination</Text>
          <Text style={[CSS.subText]}>
            We reserve the right to suspend or terminate accounts that violate
            these terms, engage in fraudulent activity, or misuse the platform.
            Terminated accounts may lose access to active projects and services.
          </Text>
        </View>

        {/* //<!-- LIABILITY --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Limitation of Liability</Text>
          <Text style={[CSS.subText]}>
            App Request shall not be liable for indirect damages, data loss,
            business interruption, or financial losses resulting from platform
            use, third-party services, or communication channels. Users agree to
            use the platform at their own risk.
          </Text>
        </View>

        {/* //<!-- CHANGES -- */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Changes to Terms</Text>
          <Text style={[CSS.subText]}>
            We reserve the right to update these Terms and Conditions at any
            time. Continued use of the application after changes implies
            acceptance of the revised agreement.
          </Text>
        </View>

        {/* //<!-- ACCEPTANCE --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Acceptance of Terms</Text>
          <Text style={[CSS.subText]}>
            By registering and using App Request, you confirm that you have
            read, understood, and agreed to these Terms and Conditions in full.
          </Text>
        </View>

        {/* //<!-- GOVERNING LAW --> */}
        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Governing Law</Text>
          <Text style={[CSS.subText]}>
            This Agreement is governed by South African law. Disputes will be
            resolved through arbitration in accordance with the Arbitration Act.
          </Text>
        </View>

        <View style={[CSS.topic]}>
          <Text style={[CSS.UATittle]}>Developer Information</Text>
          <Text style={[CSS.subText]}>
            App Request is operated by an independent developer.
          </Text>
          <Text style={[CSS.subText]}>
            For support and legal inquiries, contact:
          </Text>
          <Text
            dataDetectorType={"email"}
            style={[CSS.subText, { fontWeight: "500" }]}
          >
            AppRequestMail@gmail.com
          </Text>
        </View>
      </View>
    </View>
  );
}
