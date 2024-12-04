import React, { useRef, useState, useEffect } from "react";
import { Dropdown, Space } from "antd";
import {
  UndoOutlined,
  DownOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const App = () => {
  const [boxState, setBoxState] = useState({
    top: 100,
    left: 100,
  });

  const [imageState, setImageState] = useState({
    width: 300,
    height: 300,
    top: 100,
    left: 100,
    rotation: 0,
    dx: 0,
    dy: 0,
    corners: {
      topLeft: "top-left",
      topRight: "top-right",
      bottomLeft: "bottom-left",
      bottomRight: "bottom-right",
    },
    oldWidth: 300,
    oldHeight: 300,
    sides: {
      divLeft: "left",
      divRight: "right",
      divTop: "top",
      divBotttom: "bottom",
    },
  });

  let minWidth = 100;
  let minHeight = 100;
  let maxWidth = 800;
  let maxHeight = 500;

  const handleResize = (event, direction) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    let startWidth = imageState.width;
    let startHeight = imageState.height;
    const startTop = imageState.top;
    const startLeft = imageState.left;

    console.log(startX, startY);
    console.log(direction);
    //changing the sides in  handlerotation and make the top and left constant according to it.

    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newTop = startTop;
      let newLeft = startLeft;

      const { rotation } = imageState;

      // Handle rotation-specific cases
      if (rotation === 90 || rotation === 270) {
        switch (direction) {
          case "right":
            newHeight = Math.max(
              minWidth,
              Math.min(maxWidth, startHeight + dx)
            );
            break;
          case "bottom":
            newWidth = Math.max(
              minHeight,
              Math.min(maxHeight, startWidth + dy)
            );
            break;
          case "left":
            newHeight = Math.max(
              minWidth,
              Math.min(maxWidth, startHeight - dx)
            );
            break;
          case "top":
            newWidth = Math.max(
              minHeight,
              Math.min(maxHeight, startWidth - dy)
            );
            break;
          case "bottom-right":
            newHeight = Math.max(
              minWidth,
              Math.min(maxWidth, startHeight + dx)
            );
            newWidth = Math.max(
              minHeight,
              Math.min(maxHeight, startWidth + dy)
            );
            break;
          case "bottom-left":
            newHeight = Math.max(
              minWidth,
              Math.min(maxWidth, startHeight - dx)
            );
            newWidth = Math.max(
              minHeight,
              Math.min(maxHeight, startWidth + dy)
            );
            break;
          case "top-right":
            newHeight = Math.max(
              minWidth,
              Math.min(maxWidth, startHeight + dx)
            );
            newWidth = Math.max(
              minHeight,
              Math.min(maxHeight, startWidth - dy)
            );
            break;
          case "top-left":
            newHeight = Math.max(
              minWidth,
              Math.min(maxWidth, startHeight - dx)
            );
            newWidth = Math.max(
              minHeight,
              Math.min(maxHeight, startWidth - dy)
            );
            break;
          default:
            break;
        }
      } else {
        // Handle default rotation (0° or 180°)
        switch (direction) {
          case "right":
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + dx));
            break;
          case "bottom":
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight + dy)
            );
            break;
          case "left":
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - dx));
            break;
          case "top":
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight - dy)
            );
            break;
          case "bottom-right":
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + dx));
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight + dy)
            );
            break;
          case "bottom-left":
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - dx));
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight + dy)
            );
            break;
          case "top-right":
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + dx));
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight - dy)
            );
            break;
          case "top-left":
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - dx));
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight - dy)
            );
            break;
          default:
            break;
        }
      }

      // Update state
      setImageState((prev) => ({
        ...prev,
        width: newWidth,
        height: newHeight,
        top: newTop,
        left: newLeft,
      }));
    };

    const onMouseUp = () => {
      setImageState((prev) => {
        const { width, height, top, left, rotation } = prev;

        let newTop = top;
        let newLeft = left;

        // Calculate the new rotation angle
        // const newRotation = (rotation + 90) % 360;

        // Adjust `top` and `left` based on the new rotation
        switch (rotation) {
          case 90: // Rotate to 90 degrees
            newTop = 100 - (height - width) / 2;
            newLeft = 100 + (height - width) / 2;
            break;

          case 270: // Rotate to 270 degrees
            newTop = 100 - (height - width) / 2;
            newLeft = 100 + (height - width) / 2;
            break;

          default:
            break;
        }

        // Update the image state
        return {
          ...prev,
          top: newTop,
          left: newLeft,
        };
      });

      // Remove the event listeners to clean up
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleRotation = () => {
    setImageState((prev) => {
      let tempHeight, newHeight, newWidth;
      let newTop = prev.top;
      let newLeft = prev.left;
      const newCorners = { ...prev.corners };
      const newSides = { ...prev.sides };
      // Calculate adjustments based on the new rotation

      const newRotation = (prev.rotation + 90) % 360;

      if (newRotation === 0) {
        newTop = 100;
        newLeft = 100;

        newCorners.topLeft = "top-left";
        newCorners.topRight = "top-right";
        newCorners.bottomLeft = "bottom-left";
        newCorners.bottomRight = "bottom-right";

        newSides.divLeft = "left";
        newSides.divRight = "right";
        newSides.divTop = "top";
        newSides.divBotttom = "bottom";
      } else if (newRotation === 90) {
        console.log(prev.height);
        console.log(prev.width);
        // tempHeight = imageState.height;
        // Rotate to 90 degrees
        newTop = prev.top + (prev.width - prev.height) / 2;
        newLeft = prev.left - (prev.width - prev.height) / 2;

        console.log(prev.corners.bottomLeft);
        newCorners.topLeft = prev.corners.topRight;
        console.log(newCorners.topLeft);
        newCorners.topRight = prev.corners.bottomRight;
        newCorners.bottomRight = prev.corners.bottomLeft;
        newCorners.bottomLeft = prev.corners.topLeft;

        console.log(newSides.divLeft);
        console.log(prev.sides.divLeft);
        newSides.divLeft = prev.sides.divTop;
        newSides.divRight = prev.sides.divBotttom;
        newSides.divTop = prev.sides.divRight;
        newSides.divBotttom = prev.sides.divLeft;
      } else if (newRotation === 180) {
        // Rotate to 180 degrees

        newTop = prev.top - (prev.width - prev.height) / 2;
        newLeft = prev.left + (prev.width - prev.height) / 2;

        newCorners.topLeft = prev.corners.topRight;
        newCorners.topRight = prev.corners.bottomRight;
        newCorners.bottomRight = prev.corners.bottomLeft;
        newCorners.bottomLeft = prev.corners.topLeft;

        newSides.divLeft = prev.sides.divTop;
        newSides.divRight = prev.sides.divBotttom;
        newSides.divTop = prev.sides.divRight;
        newSides.divBotttom = prev.sides.divLeft;
      } else if (newRotation === 270) {
        // Rotate to 270 degrees
        newTop = prev.top + (prev.width - prev.height) / 2;
        newLeft = prev.left - (prev.width - prev.height) / 2;

        newCorners.topLeft = prev.corners.topRight;
        newCorners.topRight = prev.corners.bottomRight;
        newCorners.bottomRight = prev.corners.bottomLeft;
        newCorners.bottomLeft = prev.corners.topLeft;

        newSides.divLeft = prev.sides.divTop;
        newSides.divRight = prev.sides.divBotttom;
        newSides.divTop = prev.sides.divRight;
        newSides.divBotttom = prev.sides.divLeft;
      }

      // Update the image state
      return {
        ...prev,

        top: newTop,
        left: newLeft,
        rotation: newRotation,
        corners: newCorners,
        sides: newSides,
      };
    });
  };

  function getDynamicCursor(rotation, baseDirection) {
    // All possible directions in order
    const directions = [
      "n-resize", // Top
      "ne-resize", // Top-right
      "e-resize", // Right
      "se-resize", // Bottom-right
      "s-resize", // Bottom
      "sw-resize", // Bottom-left
      "w-resize", // Left
      "nw-resize", // Top-left
    ];

    const baseIndex = directions.indexOf(baseDirection);

    // Normalize rotation to 0-360
    const normalizedRotation = ((rotation % 360) + 360) % 360;

    // Determine the index offset based on the rotation
    const offset = Math.round(normalizedRotation / 45) % 8;

    // Get the new direction
    return directions[(baseIndex + offset) % 8];
  }

  const items = [
    {
      label: <AlignRightOutlined />,
      key: "0",
    },
    {
      label: <AlignLeftOutlined />,
      key: "1",
    },
    {
      label: <AlignCenterOutlined />,
      key: "3",
    },
  ];

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      {/* Feature Container */}
      <div>
        <div
          className="function relative rounded-md bg-white shadow-lg px-8 py-2 flex items-center gap-7"
          style={{
            width: `300px`,
            height: "40px",
            top: `${boxState.top}px`,
            left: `${boxState.left}px`,

            position: "absolute",
          }}
        >
          <UndoOutlined className=" text-2xl" onClick={handleRotation} />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <AlignRightOutlined className=" text-2xl" />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <div className="h-full border-l-2 border-gray-400"></div>
          <DownloadOutlined
            className=" text-2xl"
            onClick={() => console.log(imageState)}
          />
          <DeleteOutlined className="text-2xl" />
        </div>
        <div
          className=" relative border-4 border-blue-400"
          style={{
            width: `${imageState.width}px`,
            height: `${imageState.height}px`,
            top: `${imageState.top + 50}px`,
            left: `${imageState.left}px`,
            // bottom: 100,
            // position: "absolute",
            transform: `rotate(${imageState.rotation}deg) translateZ(0px)`,
          }}
        >
          {/* Image */}
          <img
            src="/assets/img.webp"
            alt="Resizable"
            className="w-full h-full object-cover"
          />

          {/* Resize Handles */}
          {/* Corners */}
          <div
            className={`absolute -top-2 -left-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl $`}
            style={{
              cursor: getDynamicCursor(imageState.rotation, "nw-resize"),
            }}
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.topLeft}`)
            }
          >
            {imageState.corners.topLeft}
          </div>
          <div
            className="absolute -top-2 -right-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "ne-resize"),
            }}
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.topRight}`)
            }
          >
            {imageState.corners.topRight}
          </div>
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "sw-resize"),
            }}
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.bottomLeft}`)
            }
          >
            {imageState.corners.bottomLeft}
          </div>
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "se-resize"),
            }}
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.bottomRight}`)
            }
          >
            {imageState.corners.bottomRight}
          </div>

          {/* Borders */}
          <div
            className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-transparent bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "n-resize"),
            }}
            onMouseDown={(e) => handleResize(e, `${imageState.sides.divTop}`)}
          >
            {imageState.sides.divTop}
          </div>
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-transparent bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "s-resize"),
            }}
            onMouseDown={(e) =>
              handleResize(e, `${imageState.sides.divBotttom}`)
            }
          >
            {imageState.sides.divBotttom}
          </div>
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2  w-4 h-4  bg-transparent bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "w-resize"),
            }}
            onMouseDown={(e) => handleResize(e, `${imageState.sides.divLeft}`)}
          >
            {imageState.sides.divLeft}
          </div>
          <div
            className="absolute top-1/2 -right-5 -translate-x-1/2 -translate-y-1/2  w-4 h-4 bg-transparent bg-white border-4 border-blue-500 rounded-3xl"
            style={{
              cursor: getDynamicCursor(imageState.rotation, "e-resize"),
            }}
            onMouseDown={(e) => handleResize(e, `${imageState.sides.divRight}`)}
          >
            {imageState.sides.divRight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
