import { Box, Text } from "@mantine/core";
import React, { useRef, useState } from "react";
import KeyEventInput, {
  IKeyKeyEventInputRef,
} from "../../../components/input/KeyEventInput";
import FilledBtn from "../../../components/button/FilledBtn";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal, {
  IConfirmModalRef,
} from "../../../components/confirm/ConfirmModal";
import { useMappedGridMutation } from "../../../hooks/put-away/useMappedGrid.mutation";
import { showNotification } from "@mantine/notifications";

const ScanGridPutAway = () => {
  const navigation = useNavigate();
  const inputRef = useRef<IKeyKeyEventInputRef>(null);

  const modalRef = useRef<IConfirmModalRef>(null);
  const [gridId, setGridId] = useState("");
  const { location, palletId } = useParams();

  const { isLoading, mutateAsync } = useMappedGridMutation();

  const mappedGrid = async () => {
    const res = await mutateAsync({
      gridId: gridId,
      location: location ?? "",
      palletId: palletId ?? "",
    });

    if (res.status === "success") {
      showNotification({
        title: res.title,
        message: res.message,
        color: "green",
      });
      navigation(-2);
    } else {
      showNotification({
        message: res.data.message,
        color: "red",
      });
      setGridId("");
      inputRef.current?.focus();
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          ref={inputRef}
          placeholder="Enter Grid Id"
          onEventTrigger={(scan) => {
            setGridId(scan);
            modalRef.current?.toggleModal();
          }}
        />
      </Box>
      <Text weight={500} my={"md"} align="center">
        Grid Id :- {gridId}
      </Text>
      <FilledBtn
        title="Map Grid With Pallet"
        onClick={() => {}}
        disabled={true}
        loading={isLoading}
      />
      <ConfirmModal
        ref={modalRef}
        title="Map Grid"
        subtitle={`Are you sure you want to map grid ${gridId} with this pallet ${palletId}.`}
        handleYesClick={() => {
          mappedGrid();
          modalRef.current?.toggleModal();
        }}
        handlleNoClick={() => {
          setGridId("");
          inputRef.current?.focus();
        }}
      />
    </Box>
  );
};

export default ScanGridPutAway;
