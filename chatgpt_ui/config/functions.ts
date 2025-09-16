// Functions mapping to tool calls
// Define one function per tool call - each tool call should have a matching function
// Parameters for a tool call are passed as an object to the corresponding function

// export const get_weather = async ({
//   location,
//   unit,
// }: {
//   location: string;
//   unit: string;
// }) => {
//   const res = await fetch(
//     `/api/functions/get_weather?location=${location}&unit=${unit}`
//   ).then((res) => res.json());

//   return res;
// };

// export const get_joke = async () => {
//   const res = await fetch(`/api/functions/get_joke`).then((res) => res.json());
//   return res;
// };

export const generate_report = async ({
  currency,
  year,
}: {
  currency: string;
  year: string;
}) => {
  const reportRes = await fetch("http://127.0.0.1:5000/generate_report", {
    method: "POST",
    body: JSON.stringify({ currency, year }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!reportRes.ok) throw new Error("Failed to fetch report");

  const res = await reportRes.json();
  return res;
};

export const analyze_report = async ({ file_path }: { file_path: string }) => {
  const res = await fetch("http://127.0.0.1:5000/reports-summary/" + file_path)

  if (!res.ok) throw new Error("Failed to fetch report analysis");
  return res.json();
}

// export const read_file = async ({ file_path }: { file_path: string }) => {
//   const res = await fetch("http://127.0.0.1:5000/reports/" + file_path).then(
//     (res) => {
//       if (!res.ok) throw new Error("Failed to fetch file");
//       // Return the readen file as a base64 string
//       return res.blob().then((blob) => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             resolve(reader.result);
//           };
//           reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         });
//       });
//     }
//   );
//   return res;
// }

export const functionsMap = {
  // get_weather: get_weather,
  // get_joke: get_joke,
  generate_report: generate_report,
  analyze_report: analyze_report,
  // read_file: read_file
};
