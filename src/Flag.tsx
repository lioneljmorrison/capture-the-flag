import React from "react";

export default function Flag({ msg }) {
  const [msgIdx, setMsgIdx] = React.useState(0);

  let timeout: string | number | NodeJS.Timeout | undefined;

  React.useEffect(() => {
    if (msgIdx < msg.length - 1) {
      timeout = setTimeout(() => setMsgIdx(msgIdx + 1), 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [msg, msgIdx]);

  const msgList = [...msg.slice(0, msgIdx + 1)].map((letter, idx) => (
    <li key={idx}>{letter}</li>
  ));

  return <ul>{msgList}</ul>;
}
