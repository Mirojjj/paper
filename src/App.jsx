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

  const divRef = useRef(null);

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

  const minWidth = 100;
  const minHeight = 100;
  const maxWidth = 800;
  const maxHeight = 500;

  const handleResize = (event, direction) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = imageState.width;
    const startHeight = imageState.height;
    const startTop = imageState.top;
    const startLeft = imageState.left;

    console.log(startX, startY);

    const onMouseMove = (e) => {
      // console.log(e.clientX);
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let oldwidth = startWidth;
      let oldheight = startHeight;
      let newWidth = startWidth;
      let newHeight = startHeight;
      const { rotation, top, left, width, height } = imageState;

      console.log("rott" + rotation);
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

      setImageState((prev) => ({
        ...prev,
        oldWidth: oldwidth,
        oldHeight: oldheight,
        width: newWidth,
        height: newHeight,
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleRotation = () => {
    setImageState((prev) => {
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
        // Rotate to 90 degrees
        newTop = prev.top + (prev.width - prev.height) / 2;
        newLeft = prev.left - (prev.width - prev.height) / 2;

        console.log(prev.corners.bottomLeft);
        newCorners.topLeft = prev.corners.topRight;
        console.log(newCorners.topLeft);
        newCorners.topRight = prev.corners.bottomRight;
        newCorners.bottomRight = prev.corners.bottomLeft;
        newCorners.bottomLeft = prev.corners.topLeft;

        newSides.divLeft = prev.sides.divBotttom;
        newSides.divRight = prev.sides.divTop;
        newSides.divTop = prev.sides.divLeft;
        newSides.divBotttom = prev.sides.divRight;
      } else if (newRotation === 180) {
        // Rotate to 180 degrees
        newTop = prev.top - (prev.width - prev.height) / 2;
        newLeft = prev.left + (prev.width - prev.height) / 2;

        newCorners.topLeft = prev.corners.topRight;
        newCorners.topRight = prev.corners.bottomRight;
        newCorners.bottomRight = prev.corners.bottomLeft;
        newCorners.bottomLeft = prev.corners.topLeft;

        newSides.divLeft = prev.sides.divRight;
        newSides.divRight = prev.sides.divLeft;
        newSides.divTop = prev.sides.divBotttom;
        newSides.divBotttom = prev.sides.divTop;
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
          ref={divRef}
          className=" relative border-4 border-blue-400 bg-white"
          style={{
            width: `${imageState.width}px`,
            height: `${imageState.height}px`,
            top: `${imageState.top + 50}px`,
            left: `${imageState.left}px`,
            // bottom: 100,
            // position: "absolute",
            transform: `rotate(${imageState.rotation}deg)`,
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
            className="absolute -top-2 -left-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl cursor-nw-resize"
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.topLeft}`)
            }
          >
            {imageState.corners.topLeft}
          </div>
          <div
            className="absolute -top-2 -right-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl cursor-ne-resize"
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.topRight}`)
            }
          >
            {imageState.corners.topRight}
          </div>
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl cursor-sw-resize"
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.bottomLeft}`)
            }
          >
            {imageState.corners.bottomLeft}
          </div>
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl cursor-se-resize"
            onMouseDown={(e) =>
              handleResize(e, `${imageState.corners.bottomRight}`)
            }
          >
            {imageState.corners.bottomRight}
          </div>

          {/* Borders */}
          <div
            className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-transparent cursor-n-resize bg-white border-4 border-blue-500 rounded-3xl"
            onMouseDown={(e) => handleResize(e, `${imageState.sides.divTop}`)}
          ></div>
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-transparent cursor-s-resize bg-white border-4 border-blue-500 rounded-3xl"
            onMouseDown={(e) =>
              handleResize(e, `${imageState.sides.divBotttom}`)
            }
          ></div>
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2  w-4 h-4  bg-transparent cursor-w-resize bg-white border-4 border-blue-500 rounded-3xl"
            onMouseDown={(e) => handleResize(e, `${imageState.sides.divLeft}`)}
          ></div>
          <div
            className="absolute top-1/2 -right-5 -translate-x-1/2 -translate-y-1/2  w-4 h-4 bg-transparent cursor-e-resize bg-white border-4 border-blue-500 rounded-3xl"
            onMouseDown={(e) => handleResize(e, `${imageState.sides.divRight}`)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
