import React, { useRef, useState } from "react";
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
  const [imageState, setImageState] = useState({
    width: 300,
    height: 300,
    top: 100,
    left: 100,
    rotation: 0,
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
    // const startTop = imageState.top;
    // const startLeft = imageState.left;

    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      // let newTop = startTop;
      // let newLeft = startLeft;

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
    setImageState((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }));
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
      <div
        className="absolute rounded-md bg-white shadow-lg px-8 py-2 flex items-center gap-7"
        style={{
          width: `300px`,
          height: "40px",
          top: `${imageState.top - 50}px`,
          left: `${imageState.left}px`,
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
        <div class="h-full border-l-2 border-gray-400"></div>
        <DownloadOutlined className=" text-2xl" />
        <DeleteOutlined className="text-2xl" />
      </div>
      <div
        className="absolute border-4 border-blue-400 bg-white"
        style={{
          width: `${imageState.width}px`,
          height: `${imageState.height}px`,
          top: `${imageState.top}px`,
          left: `${imageState.left}px`,
          position: "absolute",
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
          className="absolute -top-2 -left-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl"
          onMouseDown={(e) => handleResize(e, "top-left")}
        ></div>
        <div
          className="absolute -top-2 -right-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl "
          onMouseDown={(e) => handleResize(e, "top-right")}
        ></div>
        <div
          className="absolute -bottom-2 -left-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl "
          onMouseDown={(e) => handleResize(e, "bottom-left")}
        ></div>
        <div
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl"
          onMouseDown={(e) => handleResize(e, "bottom-right")}
        ></div>

        {/* Borders */}
        <div
          className="absolute top-0 left-0 right-0 h-2 bg-transparent cursor-ns-resize"
          onMouseDown={(e) => handleResize(e, "top")}
        ></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-transparent cursor-ns-resize"
          onMouseDown={(e) => handleResize(e, "bottom")}
        ></div>
        <div
          className="absolute top-0 bottom-0 left-0 w-2 bg-transparent cursor-ew-resize"
          onMouseDown={(e) => handleResize(e, "left")}
        ></div>
        <div
          className="absolute top-0 bottom-0 right-0 w-2 bg-transparent cursor-ew-resize"
          onMouseDown={(e) => handleResize(e, "right")}
        ></div>
      </div>
    </div>
  );
};

export default App;
