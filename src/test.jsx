{
  /* Feature Container */
}
<div>
  <div
    className="relative rounded-md bg-white shadow-lg px-8 py-2 flex items-center gap-7"
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
    <div className="h-full border-l-2 border-gray-400"></div>
    <DownloadOutlined
      className=" text-2xl"
      onClick={() => console.log(imageState)}
    />
    <DeleteOutlined className="text-2xl" />
  </div>
  <div
    className="relative border-4 border-blue-400 bg-white"
    style={{
      width: `${imageState.width}px`,
      height: `${imageState.height}px`,
      top: 100,
      left: 100,
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
</div>;
