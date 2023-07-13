import { Box, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput, {
  IKeyKeyEventInputRef,
} from "../../../components/input/KeyEventInput";
import FilledBtn from "../../../components/button/FilledBtn";
import { showNotification } from "@mantine/notifications";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useCheckPalletStatusMutation } from "../../../hooks/create-bag/useCheckPalletStatus.mutation";
import ConfirmationModal, {
  IConfirmationModalRef,
} from "../../../components/modal/ConfirmationModal";
import NeesConFirmationDetails from "./components/NeesConFirmationDetails";
import { useShipmentsStore } from "../../../store/shipmentsStore";

const CreateBag = () => {
  const navigation = useNavigate();
  const location = useParams().location;
  const [palletId, setPalletId] = useState("");
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { clearStore } = useShipmentsStore((state) => state);
  const modalRef = useRef<IConfirmationModalRef>(null);
  const inputRef = useRef<IKeyKeyEventInputRef>(null);

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
      inputRef.current?.focus();
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
  }, [navigation, setHeader]);

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          ref={inputRef}
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
            clearStore();
            navigation(palletId);
          },
        }}
        noCallback={() => {
          setPalletId("");
          inputRef.current?.focus();
          modalRef.current?.toggleModal();
        }}
      >
        <NeesConFirmationDetails palletId={palletId} />
      </ConfirmationModal>
    </Box>
  );
};

export default CreateBag;
