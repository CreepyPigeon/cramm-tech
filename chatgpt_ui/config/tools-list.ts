// List of tools available to the assistant
// No need to include the top-level wrapper object as it is added in lib/tools/tools.ts
// More information on function calling: https://platform.openai.com/docs/guides/function-calling

export const toolsList = [
  {
    name: "generate_report",
    description: "Generate a report",
    parameters: {
      currency: {
        type: "string",
        description: "Currency to generate report in",
        enum: ["AUD", "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "KRW", "MXN", "NOK", "NZD", "PLN", "RUB", "SEK", "SGD", "TRY", "TWD", "ZAR"],
      },
      year: {
        type: "integer",
        description: "Year to generate report for (e.g., 2023)",
      }
    },
  },
  // {
  //   name: "read_file",
  //   description: "Read a file from localhost:5000 reports directory (eg. https://localhost:5000/reports/filename)",
  //   parameters: {
  //     file_path: {
  //       type: "string",
  //       description: "Path to the file to read (should only be a filename, no paths or directories or urls. e.g., report.pdf)",
  //     }
  //   },
  // }
];
