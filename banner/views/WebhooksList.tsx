
import { configurationMenuUrl } from "@saleor/configuration";

import useNavigator from "@saleor/hooks/useNavigator";

import React from "react";
import WebhooksListPage from "../components/WebhooksListPage/WebhooksListPage";

export const WebhooksList: React.FC = () => {
  const navigate = useNavigator();

  return (
    <>
      <WebhooksListPage
        onBack={() => navigate(configurationMenuUrl)}
       
      />

    </>
  );
};

export default WebhooksList;
