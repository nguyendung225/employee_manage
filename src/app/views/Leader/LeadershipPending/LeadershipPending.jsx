import { AppBar, Tab, Tabs, useTheme } from "@material-ui/core";
import { TabPanel, a11yProps } from "app/components/CustomTab";
import { TAB_PENDING_PROMOTION, TAB_PENDING_PROPOSAL, TAB_PENDING_REGISTER, TAB_PENDING_SALARY } from "app/constants/employeeConstants";
import { Breadcrumb } from "egret";
import React, { useState } from "react";
import TabPendingRegister from "./Tabs/TabPendingRegister";
import TabPendingSalary from "./Tabs/TabPendingSalary";
import TabPendingPromotion from "./Tabs/TabPendingPromotion";
import TabPendingProposal from "./Tabs/TabPendingProposal";

export default function LeadershipPending({t}) {
  const [tab,setTab]=useState(0)
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };


  return <div>
       <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[{ name: t("Dashboard.leader.title") }, { name: t("Dashboard.leader.pending")}]}
        />
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={t('leader.pendingRegister')} {...a11yProps(TAB_PENDING_REGISTER)} />
          <Tab label={t('leader.pendingSalary')} {...a11yProps(TAB_PENDING_SALARY)} />
          <Tab label={t('leader.pendingPromotion')} {...a11yProps(TAB_PENDING_PROMOTION)} />
          <Tab label={t('leader.pendingProposal')} {...a11yProps(TAB_PENDING_PROPOSAL)} />
        </Tabs>
      </AppBar>
    
        <TabPanel value={tab} index={TAB_PENDING_REGISTER} dir={theme.direction}>
            <TabPendingRegister t={t}/>
        </TabPanel>
        <TabPanel value={tab} index={TAB_PENDING_SALARY} dir={theme.direction}>
        <TabPendingSalary t={t}/>
        </TabPanel>
        <TabPanel value={tab} index={TAB_PENDING_PROMOTION} dir={theme.direction}>
        <TabPendingPromotion t={t}/>
        </TabPanel>
        <TabPanel value={tab} index={TAB_PENDING_PROPOSAL} dir={theme.direction}>
        <TabPendingProposal t={t}/>
        </TabPanel>
        
     
    </div>
  </div>;
}
