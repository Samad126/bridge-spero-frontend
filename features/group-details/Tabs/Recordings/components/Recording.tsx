import RecordingCard from "./RecordingCard"

function Recording() {
  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      <RecordingCard />
      <RecordingCard />
      <RecordingCard />
    </div>
  );
}

export default Recording;
