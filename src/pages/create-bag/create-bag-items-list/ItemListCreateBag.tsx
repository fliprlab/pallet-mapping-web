import React, { useEffect, useRef, useState } from "react";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Text } from "@mantine/core";
import ItemList from "./components/ItemList";
import ConfirmationModal, {
  IConfirmationModalRef,
} from "../../../components/modal/ConfirmationModal";
import { useShipmentsStore } from "../../../store/shipmentsStore";
import FilledBtn from "../../../components/button/FilledBtn";
import { useCreateBagMutation } from "../../../hooks/create-bag/useCreateBag.mutation";
import { showNotification } from "@mantine/notifications";

const ItemListCreateBag = () => {
  const { palletId, location } = useParams();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const navigation = useNavigate();
  const modalRef = useRef<IConfirmationModalRef>(null);
  const [rmItem, setRmItem] = useState("");
  const { shipments, removeShipment } = useShipmentsStore((state) => state);
  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigation(-1),
      lebel: `Pallet ID: ${palletId} (Create Bag)`,
    });
  }, []);

  const { isLoading, mutateAsync } = useCreateBagMutation();

  const createBag = async () => {
    const res = await mutateAsync({
      palletId: palletId ?? "",
      items: shipments,
      location: location ?? "",
    });

    console.log("res-", res);

    if (res.status === "success") {
      navigation(`/create-bag/qr-code/${palletId}/${res.data.virtualId}`);
    } else {
      showNotification({ title: res.data.title, message: res.data.message });
    }
  };

  return (
    <Flex
      p={25}
      direction={"column"}
      justify={"space-between"}
      sx={{ minHeight: "calc(100vh - 130px)" }}
    >
      <Box sx={{ flex: 1 }}>
        {shipments.map((item, i) => {
          return (
            <ItemList
              key={`${"_" + i}`}
              shipmentId={item}
              trashClick={() => {
                setRmItem(item);
                modalRef.current?.toggleModal();
              }}
            />
          );
        })}
      </Box>
      <Flex>
        <FilledBtn
          title="Scan Items"
          onClick={() => {
            navigation("/create-bag/scan-items");
          }}
          sx={{ marginRight: 10 }}
        />
        <FilledBtn
          title="Save Pallet"
          onClick={createBag}
          disabled={shipments.length === 0}
          sx={{ marginLeft: 10 }}
          loading={isLoading}
        />
      </Flex>

      <ConfirmationModal
        ref={modalRef}
        title="Remove Item"
        oKBtn={{
          title: "OK",
          onClick: () => {
            removeShipment(rmItem);
            modalRef.current?.toggleModal();
            setRmItem("");
          },
        }}
        noCallback={() => {
          setRmItem("");
          modalRef.current?.toggleModal();
        }}
      >
        <Text align="center" size={14}>
          Are you sure you want to remove item?
        </Text>
      </ConfirmationModal>
    </Flex>
  );
};

export default ItemListCreateBag;
