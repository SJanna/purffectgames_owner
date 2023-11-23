import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  //Center in the screen
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%,-50%)`,
      }}
    >
      <CircularProgress />
    </div>
  )
}