import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsModal from "@/components/SettingsModal";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <SettingsModal
      isOpen={true}
      onClose={() => navigate(-1)}
    />
  );
};

export default Settings;
