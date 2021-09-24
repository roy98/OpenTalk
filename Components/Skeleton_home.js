import React from "react";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Shine,
  ShineOverlay,
  Loader,
  Progressive,
} from "rn-placeholder";

function Skeleton_home({ showMedia }) {
  return (
    <Placeholder
      style={{
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.12)",
      }}
      Animation={(props) => <Progressive {...props} color="rgba(0,0,0,0.02)" />}
      Left={(props) => <PlaceholderMedia isRound style={props.style} />}
    >
      <PlaceholderLine width={70} />
      <PlaceholderLine style={{ marginTop: 2 }} />
      <PlaceholderLine />
      <PlaceholderLine />
      {showMedia && (
        <PlaceholderMedia
          style={{ marginVertical: 10, height: 150, width: "100%" }}
        />
      )}
    </Placeholder>
  );
}

export default Skeleton_home;
