/**
 * Project: Capture the Flag
 * Instructions: https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions
 * Flag: nervous
 */

import "./styles.css";
import Flag from "./Flag";
import { useState } from "react";

export default function App() {
  const [flag, setFlag] = useState({});
  const [isLoading, setLoading] = useState(true);
  const scrambleUrl =
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
  let flagUrl = "";
  const url: string[] = [];
  const regexStart = /^23/g;
  const regexEnd = /93$/g;
  const regexAny = /21/g;

  fetch(scrambleUrl).then((res) => {
    res
      .text()
      .then((res) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(res, "text/html");
        const items = doc.body.getElementsByTagName("code");

        for (item of items) {
          let line1 = item.getAttribute("data-class");
          if (line1.match(regexStart)) {
            for (item2 of item.children) {
              let line2 = item2.getAttribute("data-tag");
              if (line2.match(regexEnd)) {
                for (item3 of item2.children) {
                  let line3 = item3.getAttribute("data-id");
                  if (line3.match(regexAny)) {
                    for (lastItem of item3.getElementsByTagName("i")) {
                      url.push(lastItem.getAttribute("value"));
                    }
                  }
                }
              }
            }
          }
        }

        return url.join("");
      })
      .then((url) => {
        fetch(url)
          .then((res) => {
            res.text().then((res) => {
              setFlag(res);
              setLoading(false);
            });
          })
          .catch((err) => {});
      });
  });

  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <div className="App">{<Flag msg={flag} />}</div>;
}
