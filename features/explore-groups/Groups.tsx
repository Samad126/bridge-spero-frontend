import React from "react";
import GroupList from "../common/components/GroupList/GroupList";
import { demoGroupsMultiple } from "../common/constants/demoGroups";

function Groups() {
  return (
    <div>
      <div className="container">
        <GroupList
          demoGroups={demoGroupsMultiple}
          hideLastCard={false}
          col={2}
        />
      </div>
    </div>
  );
}

export default Groups;
