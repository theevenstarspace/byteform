import { loadTga } from "@site/src/utils/tgaLoader";
import { useEffect, useRef, useState } from "react";

const assetPath = "/assets/landscape.tga";

export default function ExampleTGA(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) return;

    const main = ref.current;
    if (!main) return;

    loadTga(assetPath).then((image) => {
      main.appendChild(image);
      setLoaded(true);
    });
  }, [loaded]);

  return (
    <main style={{ overflow: 'hidden' }} ref={ref} />
  );
}

// export default function ExampleTGA(): JSX.Element {
//   const [player, setPlayer] = useState<IPlayer | null>(null);

//   useEffect(() => {
//     if (player) return;

//     setPlayer(loadPlayer());
//   }, [player]);

//   return (
//     <LayoutProvider>
//       <CodeBlock language="json" showLineNumbers={true}>{JSON.stringify(player, null, 2)}</CodeBlock>
//     </LayoutProvider>
//   );
// }