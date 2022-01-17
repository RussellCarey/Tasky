const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
console.log("Is dev run and found that the current process in in the mode:" + development);

export default function isDev(): boolean {
  return development;
}
