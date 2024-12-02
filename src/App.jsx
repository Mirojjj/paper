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
    oldWidth: 300,
    oldHeight: 300,
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

    const onMouseMove = (e) => {
      // console.log(e.clientX);
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let oldwidth = startWidth;
      let oldheight = startHeight;
      let newWidth = startWidth;
      let newHeight = startHeight;

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

  // const handleRotation = () => {
  //   setImageState((prev) => {
  //     const { width, height, top, left } = initialStateRef.current;

  //     let newTop = top;
  //     let newLeft = left;

  //     // Calculate new top and left based on rotation and initial dimensions
  //     switch ((prev.rotation + 90) % 360) {
  //       case 90:
  //         newTop = top + (width - height) / 2;
  //         newLeft = left - (width - height) / 2;
  //         break;
  //       case 180:
  //         newTop = top + (width - 300) / 2;
  //         newLeft = left + (height - 300) / 2;
  //         break;
  //       case 270:
  //         newTop = top - (width - height) / 2;
  //         newLeft = left + (width - height) / 2;
  //         break;
  //       default: // Rotation is 0
  //         newTop = top;
  //         newLeft = left;
  //     }

  //     return {
  //       ...prev,
  //       top: newTop,
  //       left: newLeft,
  //       rotation: (prev.rotation + 90) % 360,
  //     };
  //   });
  // };

  const handleRotation = () => {
    // console.log(imageState.dx, imageState.dy);
    // console.log(boxState.top, boxState.left);
    // console.log(imageState.height, imageState.width);

    setImageState((prev) => {
      console.log(imageState.oldWidth, imageState.width);
      console.log("prevtop" + prev.top);
      //if rotate on y axis
      let newTop;
      let newLeft;

      if (
        imageState.width === imageState.oldWidth &&
        imageState.height === imageState.oldHeight
      ) {
        console.log("height and width not changed.");
        if (imageState.width > imageState.height) {
        }
      }

      if (
        imageState.width !== imageState.oldWidth &&
        imageState.height === imageState.oldHeight
      ) {
        console.log(
          "Width changed but height remains the same: " + imageState.height
        );
        newTop = prev.top + (imageState.width - imageState.oldWidth) / 2;
        newLeft = prev.left - (imageState.width - imageState.oldWidth) / 2;
        console.log("top" + newTop);
      }

      if (
        imageState.width === imageState.oldWidth &&
        imageState.height !== imageState.oldHeight
      ) {
        console.log("Height changed but width remains the same.");
        newTop = prev.top - (imageState.height - imageState.oldHeight) / 2;
        newLeft = prev.left + (imageState.height - imageState.oldHeight) / 2;
      }

      if (
        imageState.width !== imageState.oldWidth &&
        imageState.height !== imageState.oldHeight
      ) {
        console.log("Both width and height changed.");
        newTop = prev.top + (imageState.width - imageState.height) / 2;
        newLeft = prev.left - (imageState.width - imageState.height) / 2;
      }

      return {
        ...prev,
        oldWidth: prev.width,
        oldHeight: prev.height,
        top: newTop || prev.top,
        left: newLeft || prev.left,
        rotation: (prev.rotation + 90) % 360,
      };
    });
    setBoxState((prev) => ({
      ...prev,
      // top: prev.top + imageState.width,
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
            className="absolute -top-2 -left-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-3xl"
            onMouseDown={(e) => handleResize(e, "top-left")}
          >
            {imageState.top} {imageState.left}{" "}
          </div>
          <div
            className="absolute -top-2 -right-2 w-4 h-4  bg-white border-4 border-blue-500 rounded-3xl "
            onMouseDown={(e) => handleResize(e, "top-right")}
          >
            {imageState.top}{" "}
          </div>
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
    </div>
  );
};

export default App;
