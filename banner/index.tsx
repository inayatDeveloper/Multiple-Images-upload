// import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { sectionNames } from "@saleor/intl";
import { WindowTitle } from "../components/WindowTitle";
import {
 
  webhooksListPath,
  // WebhooksListUrlQueryParams,
} from "./urls";

import WebhooksList from "./views/WebhooksList";

const WebhookList: React.StatelessComponent<RouteComponentProps<any>> = ({
  // location
}) => {
  // const qs = parseQs(location.search.substr(1));
  // const params: WebhooksListUrlQueryParams = qs;
  return <WebhooksList />;
};

const Component = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.webhooks)} />
      <Switch>
        <Route exact path={webhooksListPath} component={WebhookList}/>
      </Switch>
    </>
  );
};

export default Component;
