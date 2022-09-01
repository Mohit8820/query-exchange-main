import React from "react";

const Avatar = ({
  children,
  backgroundColor,
  width,
  height,
  color,
  borderRadius,
  fontSize,
  cursor,
}) => {
  const style = {
    backgroundColor,
    width,
    height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
    textTransform: "uppercase",
  };
  return <div style={style}>{children}</div>;
};

export default Avatar;
