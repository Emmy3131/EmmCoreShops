import { useNavigate } from "react-router-dom";
import api from "../../library/api";

const VendorButton = () => {
  const navigate = useNavigate();

  const openVendor = async () => {
    try {
      const res = await api.get("/vendors/status");

      const vendor = res.data.data;

      if (!vendor.enabled) {
        alert(vendor.message);

        return;
      }

      navigate("/vendor");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={openVendor}>Vendor</button>;
};

export default VendorButton;
