export default function ResultConsole({ result }) {
  return (
    <section className="result-panel">
      <div className="panel-header">
        <h3>Live Result Console</h3>
        <span className="chip success">JSON Output</span>
      </div>

      <pre className="result-box">
        {result ? JSON.stringify(result, null, 2) : "No result yet"}
      </pre>
    </section>
  );
}