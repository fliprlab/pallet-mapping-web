import React, { useEffect, useState, useMemo } from "react";
import { Box, Text } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { api } from "../../../hooks";
import QrCodeDispatch from "./QrCodeDispatch";
import FilledBtn from "../../../components/button/FilledBtn";

export interface DispatchQrData {
  qrCodeData: string;
  qrCodeDataCancelled: string;
  palletName: string;
  virtualId: string;
  shipmentItems: any[];
}

const ScanDispatchLocation = () => {
  const navigate = useNavigate();
  const { palletId, cancelled } = useParams();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { isLoading, mutateAsync } = api.dispatch.mutation.useScanLocation();
  const [dispatchData, setDispatchData] = useState<DispatchQrData>();

  useEffect(() => {
    if (cancelled) {
      setHeader({
        icon: IMAGES.backArrowIcon,
        iconClick: () => navigate(-1),
        lebel: "Cancelled Item",
      });
    } else {
      setHeader({
        icon: IMAGES.backArrowIcon,
        iconClick: () => navigate(-1),
        lebel: "Scan Location",
      });
    }
  }, [navigate, setHeader, cancelled]);

  const handleScan = async (scan: string) => {
    if (isLoading) {
      return;
    }
    const res = await mutateAsync({ scan, pallet: palletId || "" });
    if (res.status === "success") {
      setDispatchData(res.data);
      setHeader({
        icon: IMAGES.backArrowIcon,
        iconClick: () => navigate(-1),
        lebel: "Dispatch QR-CODE",
      });
    } else {
      customAlert.show({
        message: res.message,
        title: res.title,
        variant: "error",
      });
    }
  };

  const qrData = useMemo(() => {
    const qrData = {
      items: [] as any[],
      cancelledItems: [] as any[],
      palletName: "",
      qrCodeData: "",
      virtualId: "",
      itemTitle: "",
    };
    if (!dispatchData) {
      return qrData;
    }

    qrData.cancelledItems = dispatchData.shipmentItems.filter(
      (item) => item.cancelled
    );

    qrData.palletName = dispatchData.palletName;

    if (cancelled) {
      qrData.virtualId = "";
      qrData.items = qrData.cancelledItems;
      qrData.itemTitle = `Cancelled Item Count: ${qrData.items.length}`;
    } else {
      qrData.virtualId = dispatchData.virtualId;
      qrData.items = dispatchData.shipmentItems.filter(
        (item) => !item.cancelled
      );
      qrData.itemTitle = `Item Count: ${qrData.items.length}`;
    }

    return qrData;
  }, [dispatchData, cancelled]);

  return (
    <Box p={"2em"}>
      {!dispatchData ? (
        <Box mt={"xs"}>
          <KeyEventInput
            placeholder="Scan Location"
            onEventTrigger={handleScan}
          />
        </Box>
      ) : (
        <Box>
          <QrCodeDispatch
            items={qrData.items}
            palletName={qrData.palletName}
            qrCodeData={qrData.qrCodeData}
            virtualId={qrData.virtualId}
            itemTitle={`Item Count: ${qrData.items.length}`}
          />
          {qrData.cancelledItems.length > 0 && !cancelled && (
            <Box
              mt={10}
              style={{
                width: "100%",
              }}
            >
              <Text
                size={12}
              >{`Cancelled Item Count: ${qrData.cancelledItems.length}`}</Text>
              <FilledBtn
                title="View Cancelled Item QR Code"
                onClick={() => {
                  navigate(`/dispatch-items/scan-pallet/${palletId}/cancelled`);
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ScanDispatchLocation;
