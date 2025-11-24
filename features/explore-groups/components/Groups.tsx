import React from "react";
import GroupList from "../../common/groups/components/GroupList/GroupList";
import { demoGroupsMultiple } from "../../common/groups/constants/demoGroups";

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
