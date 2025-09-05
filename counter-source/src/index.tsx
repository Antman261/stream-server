import { signal } from "@preact/signals";
import { render } from "preact";
import beeps from "./assets/beeps.wav";
import "./style.css";

const audio = new Audio(beeps);
const playBeep = () => setTimeout(audio.play.bind(audio), 160);

new WebSocket("ws://127.0.0.1:7500/talon/counter/blundor/ws").addEventListener(
  "message",
  (ev) => (count.value = parseInt(ev.data))
);

const count = signal(0);
const classes = signal("counter-wrapper");
count.subscribe((val) => {
  if (val === 0) return;
  playBeep();
  classes.value = "counter-wrapper updated";
  setTimeout(() => (classes.value = "counter-wrapper"), 1000);
});

export function App() {
  return (
    <div className={classes.value}>
      <strong>Blunders</strong>: {count.value}
    </div>
  );
}

render(<App />, document.getElementById("app"));
