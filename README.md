# useCaptureImage
React Hooks, which makes it easy to take photos in your browser.

## USAGE 
```typescript
import * as React from "react";
import { render } from "react-dom";
import { useCaptureImage } from "../../dist";

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

  return (
    <>
      <div style={{ backgroundColor: "#ccc" }}>
        <video
          className="video"
          width={window.innerWidth}
          height={window.innerWidth}
          autoPlay
          ref={videoRef}
          style={{ display: "block" }}
        />
      </div>
      {error && <p>{error.message}</p>}
      <button onClick={stopCamera}>stop camera</button>
      <button onClick={startCamera}>start camera</button>
      <button onClick={captureImage}>capture image</button>
    </>
  );
};

render(<App />, document.getElementById("app"));

```

## License
MIT