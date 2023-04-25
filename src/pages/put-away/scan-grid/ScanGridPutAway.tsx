import { Box, Text } from "@mantine/core";
import React, { useRef, useState } from "react";
import SectionHeader from "../../../components/section-header/SectionHeader";
import KeyEventInput from "../../../components/input/KeyEventInput";
import FilledBtn from "../../../components/button/FilledBtn";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal, {
  IConfirmModalRef,
} from "../../../components/confirm/ConfirmModal";
import { useMappedGridMutation } from "../../../hooks/put-away/useMappedGrid.mutation";
import { showNotification } from "@mantine/notifications";

const ScanGridPutAway = () => {
  const navigation = useNavigate();
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
    }
  };

  return (
    <Box p={"2em"}>
      <SectionHeader title="Scan Grid" flowName="put-away" />
      <Box mt={"xs"}>
        <KeyEventInput placeholder="Enter Grid Id" onEventTrigger={setGridId} />
      </Box>
      <Text weight={500} my={"md"} align="center">
        Grid Id :- {gridId}
      </Text>
      <FilledBtn
        title="Map Grid With Pallet"
        onClick={() => {
          modalRef.current?.toggleModal();
        }}
        disabled={gridId === ""}
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
        handlleNoClick={() => setGridId("")}
      />
    </Box>
  );
};

export default ScanGridPutAway;
