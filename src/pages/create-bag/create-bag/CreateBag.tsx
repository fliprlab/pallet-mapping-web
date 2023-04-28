import { Box, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import FilledBtn from "../../../components/button/FilledBtn";
import { showNotification } from "@mantine/notifications";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useCheckPalletStatusMutation } from "../../../hooks/create-bag/useCheckPalletStatus.mutation";
import ConfirmationModal, {
  IConfirmationModalRef,
} from "../../../components/modal/ConfirmationModal";
import NeesConFirmationDetails from "./components/NeesConFirmationDetails";

const CreateBag = () => {
  const navigation = useNavigate();
  const location = useParams().location;
  const [palletId, setPalletId] = useState("");
  const setHeader = useHeaderStore((h) => h.setHeader);
  const modalRef = useRef<IConfirmationModalRef>(null);

  useEffect(() => {
    if (location === "") {
      navigation("/create-bag/select-location");
    }
  }, [location, navigation]);

  const { isLoading, mutateAsync } = useCheckPalletStatusMutation();

  const checkPalletStatus = async () => {
    const res = await mutateAsync({ palletId });

    if (res.status === "success") {
      if (res.statusCode === 226) {
        modalRef.current?.toggleModal();
      } else {
        navigation(palletId);
      }
    } else {
      setPalletId("");
      showNotification({
        message: res.data.message,
        color: "red",
      });
    }
  };

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigation(-1),
      lebel: "Create Bag",
    });
  }, []);

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Pallet Id"
          onEventTrigger={setPalletId}
        />
      </Box>
      <Text weight={500} my={"md"} align="center">
        Pallet Id :- {palletId}
      </Text>
      <FilledBtn
        title="Load Items"
        onClick={checkPalletStatus}
        disabled={palletId === ""}
        loading={isLoading}
      />
      <ConfirmationModal
        ref={modalRef}
        title="NEED CONFIRMATION"
        oKBtn={{
          onClick: () => {
            modalRef.current?.toggleModal();
            navigation(palletId);
          },
        }}
        noCallback={() => {
          setPalletId("");
          modalRef.current?.toggleModal();
        }}
      >
        <NeesConFirmationDetails palletId={palletId} />
      </ConfirmationModal>
    </Box>
  );
};

export default CreateBag;
