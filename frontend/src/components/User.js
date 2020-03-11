import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";

export const User = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getCurrentUser();
    }, []);

    return (
      <div className="container">
        <h3>
          {dataStore.isAuthenticated ? (
            <div>
              <p>{dataStore.currentUser.firstName}</p>
            </div>
          ) : (
            <p>Not Signed In</p>
          )}
        </h3>
      </div>
    );
  })
);
