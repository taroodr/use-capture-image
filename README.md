# useCaptureImage
React Hooks, which makes it easy to take photos in your browser.

[Demo](https://taroodr.github.io/use-capture-image/)

## Installation
```bash
yarn add use-capture-image
```

or 

```bash
npm i use-capture-image
```

## Usage 
```typescript
import * as React from "react";
import { render } from "react-dom";
import { useCaptureImage } from "../../dist";

function getDataURL(file: File | Blob): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = (error) => reject(error);
  });
}

const App = () => {
  const { error, startCamera, stopCamera, captureImage, videoRef } =
    useCaptureImage({
      constraints: {
        video: {
          width: {
            max: 1200,
          },
          height: {
            max: 1200,
          },
          aspectRatio: { ideal: 1 },
          facingMode: "environment",
        },
      },
    });

  const imgRef = React.useRef(null);

  const handleCapture = async () => {
    const imgBlob = await captureImage();
    const dataURL = await getDataURL(imgBlob).catch((e) => {
      console.error(e);
    });
    imgRef.current.src = dataURL;
  };

  return (
    <>
      <div style={{ backgroundColor: "#ccc", width: "400px" }}>
        <video
          className="video"
          width="400px"
          height="400px"
          autoPlay
          ref={videoRef}
          style={{ display: "block" }}
        />
      </div>
      {error && <p>{error.message}</p>}
      <button onClick={stopCamera}>stop camera</button>
      <button onClick={startCamera}>start camera</button>
      <button onClick={handleCapture}>capture image</button>
      <div>
        <img ref={imgRef} />
      </div>
    </>
  );
};

render(<App />, document.getElementById("app"));


```

## License
MIT