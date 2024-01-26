export function Button() {
  return (
    <button
      onClick={() =>
        console.log("Clicked A host button mounted inside of remote")
      }
    >
      Click me
    </button>
  );
}
